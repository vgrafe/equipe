import NextAuth from "next-auth";
import Providers from "next-auth/providers";
import Adapters from "next-auth/adapters";
import Models from "models";
import Stripe from "stripe";
const stripe = Stripe(process.env.STRIPE_SECRET);

const BETA_PHASE = true;

export const adapter = null;
//  Adapters.TypeORM.Adapter(
//   // The first argument should be a database connection string or TypeORM config object
//   {
//     type: "postgres",
//     host: process.env.DB_HOST,
//     port: process.env.DB_PORT,
//     username: process.env.DB_USERNAME,
//     password: process.env.DB_PASSWORD,
//     database: "",
//     synchronize: true,
//   },
//   // The second argument can be used to pass custom models and schemas
//   {
//     models: {
//       User: Models.User,
//     },
//   }
// );

const options = {
  // The secret should be set to a reasonably long random string.
  // It is used to sign cookies and to sign and encrypt JSON Web Tokens, unless
  // a seperate secret is defined explicitly for encrypting the JWT.
  secret: process.env.SECRET,

  session: {
    // Use JSON Web Tokens for session instead of database sessions.
    // This option can be used with or without a database for users/accounts.
    // Note: `jwt` is automatically set to `true` if no database is specified.
    jwt: true,

    maxAge: 30 * 24 * 60 * 60, // 30 days
  },

  jwt: {
    // A secret to use for key generation (you should set this explicitly)
    secret: process.env.JWT_SECRET,

    encryption: true,
  },

  providers: [
    Providers.GitHub({
      clientId: process.env.NEXT_PUBLIC_GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      scope: "read:org repo",
    }),
  ],

  callbacks: {
    signIn: async (user, account, profile) => {
      if (adapter) {
        const cnx = await adapter.getAdapter();
        const dbUser = await cnx.getUserByEmail(user.email);

        if (dbUser && !dbUser.stripeId) {
          // first time this user connects:

          // let's create a stripe user
          const newStripeUser = await stripe.customers.create({
            email: profile.email,
          });

          // and link it to the database
          await cnx.updateUser({
            ...dbUser,
            stripeId: newStripeUser.id,
          });
        }
      }

      return Promise.resolve(true);
    },
    session: async (session, user) => {
      // `user` also contains the `githubAccessToken` added to the jwt in the callback below
      return Promise.resolve({
        ...session,
        user,
        // status,
      });
    },
    jwt: async (token, user, account, profile) => {
      if (account?.accessToken) {
        // this way we can access the token for further github api calls
        token.githubAccessToken = account.accessToken;
      }

      return Promise.resolve(token);
    },
  },

  // db adapter
  adapter,
};

export default (req, res) => NextAuth(req, res, options);
