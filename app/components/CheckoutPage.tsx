"use client";

import {
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { createClient } from "@/lib/supabase/client";

import { Button, Divider } from "antd";
import { error } from "console";
import { get } from "http";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { getServerSession } from "next-auth";
import { authConfig } from "@/lib/auth";

export default function CheckoutPage({ amount }: { amount: number }) {
  const stripe = useStripe();
  const elements = useElements();

  const [errorMessage, setErrorMessage] = useState<string>();
  const [clientSecret, setClientSecret] = useState("");
  const [loading, setLoading] = useState(false);
  async function saveToDb(amount: number) {
    const supabase = await createClient();
    const session = await getServerSession(authConfig);
    // Lấy user từ session cookie
    const { error } = await supabase
      .from("user_gmails")
      .update({ balance: amount })
      .eq("gmail", session?.user?.email);
    if (error) {
        console.log('fail to create');
      throw new Error("fail to insert");
    }else{
        console.log('success to create');
        
    }
    
  }
  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    if (!stripe || !elements) {
      return;
    }
    const { error: submitError } = await elements.submit();

    if (submitError) {
      setErrorMessage(submitError.message);
      setLoading(false);
      return;
    }
    const { error } = await stripe.confirmPayment({
      elements,
      clientSecret,
      confirmParams: {
        return_url: `http://localhost:3000/`,
      },
    });
    if (error) {
      setErrorMessage(error.message);
    } else {
      //
      await saveToDb(amount)
    }
    setLoading(false);
  }
  useEffect(() => {
    fetch("/api/create-payment-intent", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ amount: amount }),
    })
      .then((res) => res.json())
      .then((data) => setClientSecret(data.clientSecret));
  }, [amount]);
  return (
    <div className="text-black">
      <div>
        <p className="text-2xl">Contact information</p>
      </div>
      <form onSubmit={handleSubmit} className="bg-white p-2 rounded-2xl">
        <p className="text-black mb-5">Payment method</p>
        {clientSecret && <PaymentElement className=" max-w-300" />}
        {errorMessage && <div>{errorMessage}</div>} 
        <button className="w-[100%] border-2 p-3  rounded-4xl mt-10 text-white bg-[#243bff] cursor-pointer">
          Pay
        </button>
      </form>
    </div>
  );
}
