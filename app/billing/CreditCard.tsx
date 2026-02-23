"use client";

import { useState } from "react";
import Link from "next/link";
import { transferMoney } from "@/lib/utils";

const amounts = [
  { value: 5 },
  { value: 10 },
  { value: 20, tag: "Most Popular" },
  { value: 50, tag: "5% free" },
  { value: 100, tag: "10% free" },
];

export default function CreditCard() {
  const [selected, setSelected] = useState<number>(20);
  const [custom, setCustom] = useState<string>("");

  return (
    <div className="w-[760px] bg-[#12221d] text-white rounded-3xl p-8 shadow-2xl border border-[#1f3a33]">
      {/* Header */}
      <div className="flex items-center gap-3 text-xl font-semibold">
        <span className="text-green-400">💳</span>
        Select Your Credit Amount
      </div>

      {/* Enterprise banner */}
      {/* <div className="mt-6 flex items-center justify-between bg-[#17312a] border border-[#1f3a33] rounded-xl p-4">
        <p className="text-sm text-white/80">Need Yadaphone for the team?</p>
        <button className="bg-green-400 text-black px-4 py-1.5 rounded-full text-sm font-semibold">
          See enterprise plans
        </button>
      </div> */}

      <p className="text-white/60 text-sm mt-4">
        Your credits are used to make international calls at competitive rates.
      </p>

      {/* Amount buttons */}
      <div className="mt-6">
        <p className="text-sm text-white/70 mb-3">Choose Amount (USD)*</p>

        <div className="grid grid-cols-5 gap-3">
          {amounts.map((a) => (
            <button
              key={a.value}
              onClick={() => {
                setSelected(a.value);
                setCustom("");
              }}
              className={`relative h-14 rounded-xl border text-lg font-semibold transition
                ${
                  selected === a.value
                    ? "bg-[#16352d] border-green-400 text-white"
                    : "bg-[#1a2a25] border-[#243c34] text-white/70 hover:bg-[#20332c]"
                }`}
            >
              ${a.value}
              {a.tag && (
                <span className="absolute -top-2 right-2 text-[10px] px-2 py-0.5 rounded-full bg-green-400 text-black font-bold">
                  {a.tag}
                </span>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Custom amount */}
      <div className="mt-6">
        <p className="text-sm text-white/70 mb-2">
          Or enter custom amount (minimum $5)
        </p>
        <input
          value={custom}
          onChange={(e) => {
            setCustom(e.target.value);
            setSelected(0);
          }}
          placeholder="$ 20"
          className="w-full h-12 rounded-xl bg-[#1a2a25] border border-[#243c34] px-4 outline-none text-white/80"
        />
      </div>

      {/* Options */}
      {/* <div className="mt-6 space-y-3">
        <label className="flex items-center gap-3 bg-[#1a2a25] border border-[#243c34] rounded-xl p-4 cursor-pointer">
          <input type="checkbox" className="accent-green-400" />
          <span className="text-sm text-white/80">
            Enable Auto Top-up
            <span className="ml-2 text-xs bg-green-900 text-green-400 px-2 py-0.5 rounded-full">
              Avoid interrupting an important call
            </span>
          </span>
        </label>

        <label className="flex items-center gap-3 bg-[#1a2a25] border border-[#243c34] rounded-xl p-4 cursor-pointer">
          <input type="checkbox" className="accent-green-400" />
          <span className="text-sm text-white/80">
            Issue tax-deductible invoice (address required)
          </span>
        </label>
      </div> */}

      {/* Promo */}
      <div className="mt-6">
        <p className="text-sm text-white/70 mb-2">Promo Code (Optional)</p>
        <input
          placeholder="Enter promo code"
          className="w-full h-12 rounded-xl bg-[#1a2a25] border border-[#243c34] px-4 outline-none text-white/80"
        />
      </div>

      {/* Info */}
      <div className="mt-6 text-white/70 text-sm flex items-center gap-2">
        📞 Up to <span className="font-bold text-white">1,000</span> minutes of
        international calling time
      </div>

      {/* Checkout */}
      <Link
        href={{
          pathname: "/checkout",
          query: {
            amount: selected,
          },
        }}
      >
        {/* <button className="mt-6 w-full h-14 bg-green-400 text-black font-bold rounded-xl text-lg hover:opacity-90 transition">
          Checkout 2
        </button> */}
      </Link>
      <button className="mt-6 w-full h-14 bg-green-400 text-black font-bold rounded-xl text-lg hover:opacity-90 transition cursor-pointer"
        onClick={async () => {
          const res = await fetch("/api/checkout", {
            method: "POST",
            body: JSON.stringify({ amount: transferMoney(selected) }),
          });

          const data = await res.json();
          window.location.href = data.url; // redirect sang Stripe
        }}
      >
        Pay with Stripe
      </button>

      {/* Guarantee */}
      <div className="mt-4 text-center text-green-400 text-sm border border-green-800 bg-[#112b23] py-2 rounded-full">
        ✅ 100% Money Back Guarantee. No Questions Asked.
      </div>
    </div>
  );
}
