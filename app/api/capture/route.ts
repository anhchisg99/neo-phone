import { getPayPalAccessToken } from "@/lib/paypal";
import { NextResponse } from "next/server";
export async function POST(req: Request) {
  const { orderID } = await req.json();
  const accessToken = await getPayPalAccessToken();

  const response = await fetch(`${process.env.PAYPAL_API_URL}/v2/checkout/orders/${orderID}/capture`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
  });

  const data = await response.json();
  
  if (data.status === "COMPLETED") {
     // CẬP NHẬT DATABASE CỦA BẠN TẠI ĐÂY
     console.log("Thanh toán thành công cho order:", orderID);
  }

  return NextResponse.json(data);
}