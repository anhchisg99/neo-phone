import { createClient } from "@/lib/supabase/server";

import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body = await request.json();
  const { userEmail } = body;
  if (!userEmail) {
    return NextResponse.json({ message: "User not found" }, { status: 404 });
  }
  const supabase = await createClient();
  const { data: user, error } = await supabase
    .from("user_gmails")
    .select()
    .eq("mail", userEmail)
    .single();
  if (error) {
    return NextResponse.json({ message: "fail to select" }, { status: 404 });
  }
  const ratePerMinute = 1000; // VND
  const minRequired = ratePerMinute * 1; // yêu cầu tối thiểu 1 phút
  if (user.balance < minRequired) {
    return NextResponse.json({ message: false }, { status: 200 });
}else{
      return NextResponse.json({ message: true }, { status: 200 });

  }

}
