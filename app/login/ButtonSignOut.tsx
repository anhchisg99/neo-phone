"use client"
import { Button } from "antd"
import { signOut } from "next-auth/react";

export default function ButtonSignOut(){
    return <div>
         <Button  style={{width:"200px",padding:"20px",borderRadius:"30px"}}
          onClick={() => signOut({ callbackUrl: "http://localhost:3000" })}
        >
          sign out
        </Button>
              <div className="relative flex items-center w-full my-8">
        <div className="flex-1 border-t border-white/10"></div>

        <span className="mx-6 text-white/50 text-xs tracking-[0.35em]">OR</span>

        <div className="flex-1 border-t border-white/10"></div>
      </div>
      <p className="text-center text-sm text-white/60 leading-relaxed">
        By clicking <span className="text-white font-medium">"Sign up"</span> I
        agree to the{" "}
        <a
          href="#"
          className="text-blue-400 hover:text-blue-300 underline underline-offset-2"
        >
          Terms and Conditions
        </a>
        ,{" "}
        <a
          href="#"
          className="text-blue-400 hover:text-blue-300 underline underline-offset-2"
        >
          Privacy Policy
        </a>
        ,{" "}
        <a
          href="#"
          className="text-blue-400 hover:text-blue-300 underline underline-offset-2"
        >
          Cookie Policy
        </a>
      </p>

    </div>
}