"use client";
import { PayPalButtons, PayPalScriptProvider } from "@paypal/react-paypal-js";
import { useRouter } from "next/navigation";

export default function PaypalTest({ amount }: { amount: string }) {
  const router = useRouter()
  return (
    <div className="w-full max-w-[1100px] m-auto flex justify-center">
      <PayPalScriptProvider
        options={{
          clientId: process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID!,
          currency: "USD",
          intent: "capture",
        }}
      >

     <div className="border-2 ">
       <PayPalButtons
          createOrder={async () => {
            const res = await fetch("/api/paypalcheckout", { method: "POST",body:JSON.stringify({amount:amount}) });
            const order = await res.json();
            return order.id;
          }}
          onApprove={async (data) => {
            const res = await fetch("/api/capture", {
              method: "POST",
              body: JSON.stringify({ orderID: data.orderID }),
            });
            const details = await res.json();
            if (details.status === "COMPLETED") {
              router.push('/')
            }
          }}
        />
     </div>
      </PayPalScriptProvider>
    </div>
  );
}
