import AppLayout from "components/AppLayout";
import { useSession } from "next-auth/client";
import { useRouter } from "next/router";
import { useQuery } from "react-query";

import { loadStripe } from "@stripe/stripe-js";
import {
  CardElement,
  Elements,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { useState } from "react";
import Button from "components/Button";
import Spinner from "components/Spinner";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_KEY);

const Checkout = () => {
  const [session, loading] = useSession();
  const router = useRouter();

  const stripe = useStripe();
  const elements = useElements();

  const { data: { product, prices } = {} } = useQuery(["products"], () =>
    fetch(`/api/products`).then((a) => a.json())
  );

  const [selectedPrice, setSelectedPrice] = useState(prices && prices[0]);

  if (loading) return <Spinner />;

  if (!session) router.replace("/");

  const handleSubmit = async (event) => {
    event.preventDefault();
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: elements.getElement(CardElement),
    });

    if (error) {
      console.log("[createPaymentMethod error]", error);
    } else {
      const paymentMethodId = paymentMethod.id;
      const priceId = selectedPrice.id;

      fetch(`/api/create-subscription`, {
        method: "post",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({ paymentMethodId, priceId }),
      })
        .then((response) => {
          return response.json();
        })
        // If the card is declined, display an error to the user.
        .then((result) => {
          if (result.error) {
            // The card had an error when trying to attach it to a customer.
            throw result;
          }
          return result;
        })
        // Normalize the result to contain the object returned by Stripe.
        // Add the additional details we need.
        .then((result) => {
          return {
            paymentMethodId: paymentMethodId,
            priceId: priceId,
            subscription: result,
          };
        })
        // Some payment methods require a customer to be on session
        // to complete the payment process. Check the status of the
        // payment intent to handle these actions.
        // .then(handlePaymentThatRequiresCustomerAction)
        // If attaching this card to a Customer object succeeds,
        // but attempts to charge the customer fail, you
        // get a requires_payment_method error.
        // .then(handleRequiresPaymentMethod)
        // No more actions required. Provision your service for the user.
        .then((result) => {
          // Payment was successful.
          if (result.subscription.status === "active") {
            // Change your UI to show a success message to your customer.
            // Call your backend to grant access to your service based on
            // `result.subscription.items.data[0].price.product` the customer subscribed to.
          }
        })
        .catch((error) => {
          // An error has happened. Display the failure to the user here.
          // We utilize the HTML element we created.
          debugger;
          // showCardError(error);
        });
    }
  };

  return (
    <div>
      <p>yay bud! what's your pick?</p>
      <div className="bg-gray-100 bg-opacity-25 m-2 rounded p-2">
        {product && (
          <div>
            <h2>{product.name}</h2>
            {prices?.map((price) => (
              <h3
                className={
                  "cursor-pointer " +
                  (selectedPrice?.id === price.id ? "text-blue-500" : "")
                }
                onClick={() => setSelectedPrice(price)}
              >
                {price.unit_amount / 100}$
              </h3>
            ))}
          </div>
        )}
      </div>
      <form onSubmit={handleSubmit}>
        <CardElement
          options={{
            classes: {
              base: "bg-white p-1 rounded",
            },
          }}
        />
        <Button type="submit" disabled={!stripe}>
          Pay
        </Button>
      </form>
    </div>
  );
};

Checkout.getLayout = (page) => (
  <AppLayout>
    <Elements stripe={stripePromise}>{page}</Elements>
  </AppLayout>
);

export default Checkout;
