import Stripe from "stripe";
const stripe = Stripe(process.env.STRIPE_SECRET);

export default async (req, res) => {
  let products = await stripe.products.list({ active: true });

  products = products.data.map((product) => ({
    id: product.id,
    name: product.name,
  }));

  const product = products[0];

  const prices = await stripe.prices.list({ product: product.id });

  res.send({
    product,
    prices: prices.data.map((p) => ({ id: p.id, unit_amount: p.unit_amount })),
  });
};
