"use client";
import { signIn } from "next-auth/react";
import { Button } from "antd";

export default function GoogleSignInButton() {
  const handleClick = async () => {
    await signIn("google", { callbackUrl: "/api/callback" });
  };
  return (
    <div className="">
      <Button
        onClick={handleClick}
        style={{
          border: "1px solid #2031f8",
          padding: "25px",
          width: "300px",
          borderRadius: "30px",
          fontWeight: 700,
          margin: "20px",
        }}
      >
        Sign in with Google
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
  );
}
