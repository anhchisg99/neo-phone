const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

import { authConfig } from "@/lib/auth";
import { getServerSession } from "next-auth";

import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { amount } = await req.json();
  try {
    const session = await getServerSession(authConfig);
    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const checkout = await stripe.checkout.sessions.create({
      mode: "payment",
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: { name: "Top up credits" },
            unit_amount: amount, // cents
          },
          quantity: 1,
        },
      ],
      success_url: `${process.env.NEXTAUTH_URL}/success_payment`,
      cancel_url: `${process.env.NEXTAUTH_URL}/cancel`,
      metadata: {
        userEmail: session.user.email,
      },
    });
    return NextResponse.json({ url: checkout.url });
  } catch (error) {
    console.log(error);
  }

  //   const session = await auth();
}
