import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { getServerSession } from "next-auth"
import { authConfig } from "@/lib/auth"

export async function GET() {
  const supabase = await createClient();
    const session = await getServerSession(authConfig)
  // Lấy user từ session cookie
    const {data: users} = await supabase.from("user_gmails").select("*")

    const user_gmails = users?.map(e=>e.mail)
    
    if(!user_gmails?.includes(session?.user?.email)){
        await supabase.from("user_gmails").insert({
            mail:session?.user?.email,
            name: session?.user?.name,

        })
    }
    
  

  return NextResponse.redirect("http://localhost:3000/");
}
