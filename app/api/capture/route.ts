import { authConfig } from "@/lib/auth";
import { getPayPalAccessToken } from "@/lib/paypal";
import { createClient } from "@/lib/supabase/server";
import { transferMoney } from "@/lib/utils";
import { getServerSession } from "next-auth";

import { NextResponse } from "next/server";
async function saveToDb(amount: number, email = "cutrongxoay1995@gmail.com") {
  const supabase = await createClient();
  // Lấy user từ sessionServer cookie
  //   const { error } = await supabase
  //     .from("user_gmails")
  //     .update({ balance:   amount })
  //     .eq("mail", "cutrongxoay1995@gmail.com");
  if (!amount || !email) {
    console.log("forget amount or email");
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

export async function POST(req: Request) {
  const { orderID } = await req.json();
  const accessToken = await getPayPalAccessToken();
  const sessionServer = await getServerSession(authConfig)
  const user = sessionServer?.user?.email
  if(!user){
    return NextResponse.json("fail to update balance")
  }

  const response = await fetch(
    `${process.env.PAYPAL_API_URL}/v2/checkout/orders/${orderID}/capture`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    },
  );

  const data = await response.json();

  if (data.status === "COMPLETED") {
    const capture = data.purchase_units[0].payments.captures[0];
    const amountValue = parseFloat(capture.amount.value); // Chuyển từ string sang number

    // 2. Lấy email của người thanh toán (tùy chọn)
      const payerEmail = data.payer.email_address;
    await saveToDb(transferMoney(amountValue), user);
    // CẬP NHẬT DATABASE CỦA BẠN TẠI ĐÂY
    console.log("Thanh toán thành công cho order:", orderID);
  }

  return NextResponse.json(data);
}
