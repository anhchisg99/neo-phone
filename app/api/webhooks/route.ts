import { NextResponse } from "next/server";
import Stripe from "stripe";
import { headers } from "next/headers";
import { getServerSession } from "next-auth";
import { authConfig } from "../../../lib/auth";
import { createClient } from "@/lib/supabase/server";
// import { createClient } from '@supabase/supabase-js';
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {});

const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET!;
async function saveToDb(amount: number, email = "cutrongxoay1995@gmail.com") {
  const supabase = await createClient();
  // Lấy user từ sessionServer cookie
  //   const { error } = await supabase
  //     .from("user_gmails")
  //     .update({ balance:   amount })
  //     .eq("mail", "cutrongxoay1995@gmail.com");
  if(!amount || !email){
    console.log('forget amount or email');
    throw new Error("without amount or email");
    
  }
  const { error } = await supabase.rpc("increment_balance", {
      increment_amount: amount,
    user_email: email,
  });
  if (error) {
    console.log("fail to create", error);
    throw new Error("fail to insert");
  } else {
    console.log("success to create");
  }
}
const getLineItems = async ( checkout: any) => {
    console.log('stripe session: ',stripe.checkout.sessions.listLineItems);
  const lineItems = await stripe.checkout.sessions.listLineItems(checkout, {
    limit: 10,
  });
  let quantity;
  console.log('lineItem: ',lineItems);
  let total = 0
  for (const item of lineItems.data) {
    const unitAmount = item.price?.unit_amount || 0 // cents
    quantity = item.quantity || 0
    let unitPerItem = unitAmount * quantity
    total = total + unitPerItem
    console.log("unit_amount:", unitAmount);
    console.log("quantity:", quantity);
  }
  return total

};
export async function POST(req: Request) {
  console.log('active webhook');
  const sessionServer = await getServerSession(authConfig);
  console.log("session_test: ", sessionServer);
  const body = await req.text(); // Đọc body dưới dạng text thô
  const sig = (await headers()).get("stripe-signature") as string;

  let event: Stripe.Event;

  try {
    // Xác thực xem request này có thực sự đến từ Stripe không
    event = stripe.webhooks.constructEvent(body, sig, endpointSecret);
  } catch (err: any) {
    return NextResponse.json(
      { error: `Webhook Error: ${err.message}` },
      { status: 400 },
    );
  }

  // Xử lý các loại sự kiện khác nhau
  switch (event.type) {
    case "checkout.session.completed":
      const session = event.data.object as Stripe.Checkout.Session;
      let checkoutId = session.id;
      const email = session.metadata?.userEmail as string;
      const per_item = await getLineItems( checkoutId) || 0;

      await saveToDb(per_item, email);

      console.log(
        "Thanh toán thành công cho:",
        session.customer_details?.email,
      );
      // Cập nhật database của bạn tại đây
      break;

    case "invoice.payment_failed":
      console.log('invoice payment');
      // Xử lý khi thanh toán thất bại (ví dụ: gửi mail nhắc nhở)
      break;
    case "charge.updated":
      console.log('invoice payment');

      break;
    case "charge.succeeded":
      console.log('invoice payment');

      break;
    default:
      console.log('invoice payment');

      console.log(`Sự kiện chưa được xử lý: ${event.type}`);
  }

  return NextResponse.json({ received: true }, { status: 200 });
}
