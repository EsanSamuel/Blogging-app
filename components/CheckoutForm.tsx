"use client";
import React from "react";
import {
  useStripe,
  CardElement,
  Elements,
  useElements,
} from "@stripe/react-stripe-js";
import { loadStripe, StripeCardElement } from "@stripe/stripe-js";
import $axios from "@/lib/api";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY as string
);

type Props = {
  customerId: string;
  priceId: string;
};

const CheckoutForm = ({ customerId, priceId }: Props) => {
  const [error, setError] = React.useState("");
  const [disabled, setDisabled] = React.useState<boolean>(false);
  const stripe = useStripe();
  const elements = useElements();

  const handleCardInputChange = (e: any) => {
    setDisabled(e?.empty);
    setError(e?.error?.message ?? "");
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const response = await $axios.post("/api/subscription", {
      customerId,
      priceId,
    });
    const subscription = await response.data.data;
    console.log(response.data.data);
    const stripePayload = await stripe.confirmCardPayment(
      `${subscription.subscriptionId}_secret_${subscription.clientSecret}`,
      {
        payment_method: {
          card: elements.getElement(CardElement) as StripeCardElement,
        },
      }
    );

    if (stripePayload.error) {
      setError("");
    }
  };
  return (
    <Elements stripe={stripePromise}>
      <form onSubmit={handleFormSubmit}>
        <CardElement onChange={handleCardInputChange} />
        <button
          disabled={!stripe && disabled}
          type="submit"
          className="text-white px-4 py-2 rounded-full bg-[#407ef1] hover:opacity-50 w-full mt-5"
        >
          Pay Now
        </button>
      </form>
    </Elements>
  );
};

export default CheckoutForm;
