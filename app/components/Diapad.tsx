"use client";
import { createClient } from "@/lib/supabase/client";
import { getServerSession } from "next-auth";
import { authConfig } from "@/lib/auth";

import { useState, useEffect } from "react";
import { Device, Call } from "@twilio/voice-sdk";
import { Underdog } from "next/font/google";
import { PlusOutlined } from "@ant-design/icons";
import { Space } from "antd";
import Link from "next/link";
import axios from "axios";
// import { Delete, Phone, UserPlus, Globe, ChevronDown } from 'lucide-react'; // Dùng lucide-react cho icon
type User = {
  name: string;
  mail: string;
  balance: number;
};
export default function DialPad() {
  const [user, setUser] = useState<User>();
  const [isDropOpen, setIsDropOpen] = useState(false);
  const [country, setCountry] = useState({ flag: "🇺🇸", code: "+1" });

  const [call, setCall] = useState<Call | null>(null);
  // Khởi tạo Twilio Device
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [device, setDevice] = useState<Device | null>(null);
  const [activeCall, setActiveCall] = useState<Call | null>(null);
  const [status, setStatus] = useState<
    "idle" | "registering" | "ready" | "on-call"
  >("idle");
  // Khởi tạo Twilio Device

  useEffect(() => {
    const init = async () => {
      const res = await axios.get("http://localhost:3001/token");

      const newDevice = new Device(res.data.token);

      // newDevice.on("ready", () => console.log("Device Ready"));
      // newDevice.on("error", (err) => console.error(err));

      // setDevice(newDevice);

      newDevice.on("registered", () => {
        console.log("Twilio Device Registered");
        setStatus("ready");
      });

      newDevice.on("error", (error) => {
        console.error("Twilio Error:", error.code, error.message);
        setStatus("idle");
      });

      newDevice.register();
      setDevice(newDevice);
    };
    const initDevice = async () => {
      try {
        setStatus("registering");
        const res = await fetch("/api/token?identity=user_web");
        const { token } = await res.json();

        const newDevice = new Device(token, {
          logLevel: 1,
          codecPreferences: [Call.Codec.Opus, Call.Codec.PCMU],
        });

        newDevice.on("registered", () => {
          console.log("Twilio Device Registered");
          setStatus("ready");
        });

        newDevice.on("error", (error) => {
          console.error("Twilio Error:", error.code, error.message);
          setStatus("idle");
        });

        newDevice.register();
        setDevice(newDevice);
      } catch (err) {
        console.error("Failed to init device:", err);
      }
    };
    getUser();
    init();
    // initDevice();

    return () => {
      device?.destroy();
    };
  }, []);
  const handleNumberClick = (num: any) => {
    setPhoneNumber((prev) => prev + num);
  };

  const handleDelete = () => {
    setPhoneNumber((prev) => prev.slice(0, -1));
  };

  const makeCall = async () => {
    const data = await fetch('/api/balance',{
      method:"POST",
      body:JSON.stringify({userEmail:user?.mail})
    })
    const isEnoughMoney = await data.json()
    if(!isEnoughMoney?.message){
      console.log('not enough money');
      
      return

    }
    console.log("make call !!!");
    if (device && phoneNumber) {
      const realPhone = country.code + phoneNumber;
      console.log("call in ", realPhone);

      const params = { To: realPhone,userId:user?.mail ?? "" };
      const callInstance = await device.connect({ params });
      setCall(callInstance);
      setStatus("on-call");
    }
  };

  const endCall = () => {
    if (call) {
      call.disconnect();
      setCall(null);
      setStatus("ready");
    }
  };
  const countries = [
    { name: "USA", flag: "🇺🇸", code: "+1" },
    { name: "Vietnam", flag: "🇻🇳", code: "+84" },
    { name: "UK", flag: "🇬🇧", code: "+44" },
    { name: "Japan", flag: "🇯🇵", code: "+81" },
  ];

  const keys = [
    { num: "1", sub: "" },
    { num: "2", sub: "ABC" },
    { num: "3", sub: "DEF" },
    { num: "4", sub: "GHI" },
    { num: "5", sub: "JKL" },
    { num: "6", sub: "MNO" },
    { num: "7", sub: "PQRS" },
    { num: "8", sub: "TUV" },
    { num: "9", sub: "WXYZ" },
    { num: "*", sub: "" },
    { num: "0", sub: "+" },
    { num: "#", sub: "" },
  ];

  const handleKeyPress = (val: any) => {
    if (phoneNumber.length < 15) setPhoneNumber((prev) => prev + val);
  };

  const selectCountry = (c: any) => {
    setCountry(c);
    setIsDropOpen(false);
  };

  const getUser = async () => {
    const data = await fetch("/api/user", {
      method: "GET",
    });
    const user = await data.json();
    console.log("user: ", user);

    setUser(user);
  };
  return (
    <div className="bg-[#1e35ff] p-8 rounded-[40px] w-[380px] flex flex-col items-center space-y-6 shadow-2xl select-none relative">
      {/* 1. Header: Balance */}
      <div className="w-full flex justify-center items-center relative">
        <div className="flex">
          <div className="bg-[#243bff] text-white px-4 py-1 rounded-full text-xs font-semibold border border-[#4055ff]">
            <span className="mr-3">
              <span className="mr-3">{user && user?.name}</span>
              Balance: {user ? Math.round((user?.balance)/100) : "200$"}
            </span>
            <Link href={"/billing"}>
              <Space>
                <PlusOutlined />
              </Space>
            </Link>
          </div>
        </div>
        <div className="absolute right-0 w-2.5 h-2.5 bg-white rounded-full shadow-[0_0_8px_white]"></div>
      </div>

      {/* 2. Phone Input Display with Dropdown */}
      <div className="flex items-center space-x-3 border-b border-[#4055ff] pb-3 w-full text-white mt-4 relative">
        <div
          onClick={() => setIsDropOpen(!isDropOpen)}
          className="flex items-center space-x-1 cursor-pointer hover:bg-white/10 p-1 rounded transition"
        >
          <span className="text-xl">{country.flag}</span>
          <span className="text-lg font-medium">{country.code}</span>
          <span
            className={`text-[10px] text-gray-200 transition-transform ${isDropOpen ? "rotate-180" : ""}`}
          >
            ▼
          </span>
        </div>

        {isDropOpen && (
          <div className="absolute top-full left-0 mt-2 w-48 bg-[#243bff] border border-[#4055ff] rounded-xl shadow-xl z-50 overflow-hidden">
            {countries.map((c) => (
              <div
                key={c.code}
                onClick={() => selectCountry(c)}
                className="flex items-center space-x-3 px-4 py-3 hover:bg-[#3d52ff] cursor-pointer transition text-sm"
              >
                <span>{c.flag}</span>
                <span className="flex-1">{c.name}</span>
                <span className="text-gray-200">{c.code}</span>
              </div>
            ))}
          </div>
        )}

        <input
          onChange={(e) => setPhoneNumber(e.target.value)}
          value={phoneNumber}
          className="bg-transparent text-2xl font-light outline-none w-full placeholder:text-gray-200"
          placeholder="Enter number"
        />
      </div>

      {/* 3. Add Contact Button */}
      <button className="border border-[#4055ff] text-white px-5 py-1.5 rounded-full text-xs font-medium flex items-center space-x-2 hover:bg-[#243bff]">
        <span className="text-lg">+</span> <span>Add contact</span>
      </button>

      {/* 4. Number Grid */}
      <div className="grid grid-cols-3 gap-x-8 gap-y-5">
        {keys.map((key) => (
          <button
            key={key.num}
            onClick={() => handleKeyPress(key.num)}
            className="w-20 h-20 bg-[#2f46ff] rounded-full flex flex-col items-center justify-center text-white active:bg-[#3d52ff] active:scale-95 transition-all"
          >
            <span className="text-3xl font-normal">{key.num}</span>
            <span className="text-[9px] text-gray-200 font-bold mt-0.5">
              {key.sub}
            </span>
          </button>
        ))}
      </div>

      {/* 5. Footer Actions */}
      <div className="grid grid-cols-3 gap-x-8 items-center w-full">
        <button className="text-gray-200 text-sm font-semibold hover:text-white">
          123
        </button>

        <button
          className="w-20 h-20 bg-white rounded-full flex items-center justify-center text-[#1e35ff] active:scale-90 transition-transform"
          onClick={makeCall}
        >
          <svg viewBox="0 0 24 24" width="30" height="30" fill="currentColor">
            <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" />
          </svg>
        </button>

        <button
          onClick={() => setPhoneNumber(phoneNumber.slice(0, -1))}
          className="w-12 h-12 bg-[#2f46ff] rounded-full flex items-center justify-center text-white mx-auto active:bg-[#3d52ff]"
        >
          ⌫
        </button>
      </div>
    </div>
  );
}
