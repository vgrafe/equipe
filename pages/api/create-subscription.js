import Stripe from "stripe";
const stripe = Stripe(process.env.STRIPE_SECRET);

import { adapter } from "pages/api/auth/[...nextauth]";
import { getSession } from "next-auth/client";

export default async (req, res) => {
  if (req.method === "POST") {
    const cnx = await adapter.getAdapter();
    const session = await getSession({ req });
    const currentDbUser = await cnx.getUserByEmail(session.user.email);

    const { paymentMethodId, priceId } = req.body;

    try {
      await stripe.paymentMethods.attach(paymentMethodId, {
        customer: currentDbUser.stripeId,
      });
    } catch (error) {
      res.status(402);
      res.send({ error: { message: error.message } });
    }

    // Change the default invoice settings on the customer to the new payment method
    await stripe.customers.update(currentDbUser.stripeId, {
      invoice_settings: {
        default_payment_method: paymentMethodId,
      },
    });

    // Create the subscription
    const subscription = await stripe.subscriptions.create({
      customer: currentDbUser.stripeId,
      items: [{ price: priceId }],
      // expand: ["latest_invoice.payment_intent"],
    });

    res.send(subscription);
  } else {
    res.status(404);
    res.end();
  }
};
