import Stripe from "stripe";
const stripe = Stripe(process.env.STRIPE_SECRET);

import { adapter } from "pages/api/auth/[...nextauth]";
import { getSession } from "next-auth/client";

export default async (req, res) => {
  if (req.method === "POST") {
    const cnx = await adapter.getAdapter();
    const session = await getSession({ req });
    const currentDbUser = await cnx.getUserByEmail(session.user.email);

    const stripeSession = await stripe.billingPortal.sessions.create({
      customer: currentDbUser.stripeId,
      return_url: "http://localhost:3000/account",
    });

    res.send({ portalUrl: stripeSession.url });
  } else {
    res.status(404);
    res.end();
  }
};
