import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { getServerSession } from "next-auth"
import { authConfig } from "@/lib/auth"

export async function GET() {
  const supabase = await createClient();
    const session = await getServerSession(authConfig)
  // Lấy user từ session cookie
    const {data: users} = await supabase.from("user_gmails").select("*").eq("mail",session?.user?.email)
    const user = users?.[0]
    if(user){
        return NextResponse.json(user)
    }   
    return NextResponse.json(null,{status:400})
  

}
