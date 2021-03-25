import { getSession } from "next-auth/client";
import { adapter } from "pages/api/auth/[...nextauth]";
import differenceInDays from "date-fns/differenceInDays";
import Stripe from "stripe";

const stripe = Stripe(process.env.STRIPE_SECRET);

export default async (req, res) => {
  if (!adapter) res.send({ label: "active", active: true, canModify: false });
  else {
    const session = await getSession({ req });
    if (!session) {
      res.status(401);
      res.end();
    } else {
      const cnx = await adapter.getAdapter();
      const dbUser = await cnx.getUserByEmail(session.user.email);

      let status = { label: "cancelled", active: false, canModify: false };

      if (dbUser.stripeId) {
        const userStripeSubs = await stripe.subscriptions.list({
          customer: dbUser.stripeId,
          status: "active",
        });
        if (userStripeSubs.data.length > 0)
          status = { label: "active", active: true, canModify: false };
      }
      if (status.label === "cancelled") {
        const daysLeft = 14 - differenceInDays(new Date(), dbUser.createdAt);
        if (daysLeft > 0)
          status = { label: "trial", active: true, canModify: false, daysLeft };
        else
          status = { label: "trial_expired", active: false, canModify: false };
      }

      res.send(status);
    }
  }
};
