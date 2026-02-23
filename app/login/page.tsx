// "use client"
import GoogleSignInButton from "@/app/components/GoogleSignInButton";
import { getServerSession } from "next-auth";
import { authConfig } from "@/lib/auth";
import { ToastContainer, toast } from "react-toastify";

import ButtonSignOut from "./ButtonSignOut";
export default async function Login() {
  const session = await getServerSession(authConfig);
  // const handleLogin = async()=>{
  //         const supabase = await createClient()
  //         const {error} = await supabase.from("user_gmails").insert({gmail:"",name:"",balance:0})
  //         if (error){
  //         toast("not handling data")

  //             throw error
  //         }
  //         toast("create success!")

  // }

  if (session) {
    return (
      <div className="text-center p-20">
        <span className="inline-block mb-5">

        {session?.user?.email}<br/>
        </span>
        <ButtonSignOut/>
      </div>
    );
  } else {
    return (
      <div className="text-center p-20">
        <GoogleSignInButton></GoogleSignInButton>
      </div>
    );
  }
}
