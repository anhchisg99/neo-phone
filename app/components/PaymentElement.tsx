import { PaymentElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useState } from "react";

export default function StripeForm() {
  const stripe = useStripe();
  const elements = useElements();
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    if (!stripe || !elements) return;

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: 'http://localhost:3000/success',
      },
    });

    if (error) setErrorMessage(error.message || 'Payment failed');
  };

  return (
    <form onSubmit={handleSubmit} className=" p-10!important rounded-2xl border-2 ">
      <PaymentElement  />
      {errorMessage && (
        <div className="text-red-500 mt-2">{errorMessage}</div>
      )}
      <button className="mt-4 w-full bg-green-400 py-3 rounded-lg font-bold">
        Pay
      </button>
    </form>
  );
}
