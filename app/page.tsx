import Image from "next/image";
import Header from "./components/Header";
import LeftContent from "./components/LeftContent";
import DialPad from "./components/Diapad";

import { createClient } from "@/lib/supabase/server";
import { getServerSession } from "next-auth";
import { authConfig } from "@/lib/auth";

export default function Home() {
  return (
    <div>
      <div className="bg-[#1e35ff] p-10">
        <div
          className="p-10  rounded-3xl mx-auto w-[1116px] border-2 border-white/10 flex
    bg-[#ffff] 
    bg-[radial-gradient(at_top_left,_#134e4a_0%,_transparent_40%),_radial-gradient(at_bottom_right,_#3b0764_0%,_transparent_40%)]"
        >
          <LeftContent />
          <DialPad />
        </div>
      </div>
    </div>
  );
}
