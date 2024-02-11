"use client";
import React from "react";
import { useSession } from "next-auth/react";
import {
  AiOutlineMenu,
  AiOutlineSearch,
  AiOutlineEdit,
  AiOutlineNotification,
} from "react-icons/ai";
import { MdSunny } from "react-icons/md";
import { useRouter } from "next/navigation";

const Homebar = () => {
  const { data: session } = useSession();
  const router = useRouter();
  return (
    <div className="flex justify-between border-b border-neutral-200 md:py-4 md:px-10 p-5">
      <div className="flex gap-4 items-center justify-center">
        <AiOutlineMenu className="text-[20px] font-bold text-neutral-500 md:hidden" />
        <h1 className="md:text-[30px] text-[25px] font-extrabold">hashnode</h1>
      </div>
      <ul className="flex gap-10 text-[14px] justify-center items-center font-semibold text-neutral-500 md:flex hidden">
        <li>My Feed</li>
        <li>Discussion</li>
        <li>Headless</li>
        <li>More</li>
      </ul>
      <div className="flex gap-4 ">
        <div className="flex gap-4 justify-center items-center ">
          <AiOutlineSearch className="text-[20px] font-bold text-neutral-500 md:flex hidden" />
          <div>
            <button
              className="bg-[#407ef1] text-white px-5 py-2 rounded-[30px] text-[15px] flex gap-2"
              onClick={() => router.push("/create-blog")}
            >
              <AiOutlineEdit className="text-[20px] font-bold text-white" />{" "}
              Write
            </button>
          </div>
          <MdSunny className="text-[20px] font-bold text-neutral-500 md:flex hidden" />
          <AiOutlineNotification className="text-[20px] font-bold text-neutral-500 md:flex hidden" />
        </div>
      </div>
    </div>
  );
};

export default Homebar;
