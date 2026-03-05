import { NextResponse } from "next/server";
import { getPayPalAccessToken } from "@/lib/paypal";

// 1. API TẠO ORDER
export async function POST(req: Request) {
  try {
    // const { cart } = await req.json(); // Lấy thông tin giỏ hàng từ client
    const {amount }=await req.json()
    const accessToken = await getPayPalAccessToken();
    console.log('accessToken: ',accessToken);

    const response = await fetch(`${process.env.PAYPAL_API_URL}/v2/checkout/orders`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({
        intent: "CAPTURE",
        purchase_units: [
          {
            amount: {
              currency_code: "USD",
              value: amount, // Tính toán giá trị thực tế dựa trên giỏ hàng ở đây
            },
          },
        ],
      }),
    });

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: `fail to create order ${error}` }, { status: 500 });
  }
}

// 2. API XÁC NHẬN (CAPTURE) ORDER
// Bạn có thể tạo file riêng hoặc dùng query params để phân biệt