"use client";

import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutPage from "../components/CheckoutPage";
import { useSearchParams } from "next/navigation";
import Summary from "../components/Summary";
import { Sumana } from "next/font/google";
import { transferMoney } from "@/lib/utils";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY as string,
);
export default function Checkout() {
  const searchParams = useSearchParams();
  const amountFromBilling = Number(searchParams.get("amount"));

  const amount = transferMoney(amountFromBilling);

  return (
    <div className="m-auto  min-h-screen border-2 flex justify-center ">
      <div className="w-1/2 border-2 flex justify-center pt-20">
          <Summary amount={amount} tax={23}  />
      </div>
      <div className="w-1/2 border-2 flex justify-center bg-white pt-20" >
        <Elements
          stripe={stripePromise}
          options={{
            mode: "payment",
            amount: amount,
            currency: "usd",
            
          }}
        >
          <CheckoutPage amount={amount} />
        </Elements>
      </div>
    </div>
  );
}
