"use client";
import AuthProvider from "@/components/AuthProvider";
import React from "react";
import { useSession } from "next-auth/react";
import { redirect, useRouter } from "next/navigation";

const page = () => {
  const { data: session } = useSession();
  const router = useRouter();
  if (session?.user) redirect("/home");
  return (
    <div className="md:px-[30%] md:py-20 p-5 py-[30%] bg-slate-50 h-[95vh] text-center ">
      <div className="shadow-lg p-5 rounded-[10px] bg-white">
        <h1 className="text-center font-bold text-[25px]">Sign In</h1>
        <button className="bg-black rounded-full p-1.5 text-[12px] px-1.5 text-white w-auto pr-3 mt-5">
          <span className="w-auto bg-white text-black rounded-full px-2 mr-2">
            New Release
          </span>
          Introducing headless hashnode
        </button>
        <p className="mt-5 text-neutral-500 text-center">
          Sign in with google to enjoy the app
        </p>
        <div className="mt-10">
          <AuthProvider />
          <button
            className="bg-black mt-2 text-white px-5 py-2 rounded-[30px] w-full text-[15px]"
            onClick={() => router.push("/")}
          >
            Return to landing page
          </button>
        </div>
      </div>
    </div>
  );
};

export default page;
