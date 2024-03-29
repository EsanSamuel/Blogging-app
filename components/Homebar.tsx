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
import { redirect, useRouter } from "next/navigation";
import { IoSunnyOutline } from "react-icons/io5";
import { IoMdNotificationsOutline } from "react-icons/io";
import { ApiContext, TProps } from "@/context/ApiProvider";
import Image from "next/image";
import { FaHashnode } from "react-icons/fa6";

const Homebar = ({ blog }: { blog?: any }) => {
  const { user } = React.useContext(ApiContext) as TProps;
  const { data: session } = useSession();
  const router = useRouter();
  //if (!session?.user) redirect("/signin");
  return (
    <div
      className={`flex justify-between border-b border-neutral-200 md:py-4 md:px-10 p-5 fixed w-full ${
        blog?.theme === "Dark" ? "bg-slate-900" : "bg-white"
      }`}
    >
      <div className="flex gap-4 items-center justify-center">
        <AiOutlineMenu className="text-[20px] font-extrabold text-neutral-500 md:hidden" />
        <h1 className="md:text-[30px] text-[25px] font-extrabold flex gap-2 items-center">
          <FaHashnode className="text-[#407ef1] text-[30px]" />
          <span
            className={`md:flex hidden ${
              blog?.theme === "Dark" ? "text-white" : "text-black"
            }`}
          >
            hashnode
          </span>
        </h1>
      </div>
      <ul className="flex gap-10 text-[14px] px-20 font-semibold text-neutral-500 md:flex hidden items-center bg-transparent cursor-pointer">
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
              className="bg-[#407ef1] text-white px-5 py-2 rounded-[30px] text-[15px] flex items-center gap-2 "
              onClick={() => router.push("/create-blog")}
            >
              <AiOutlineEdit className="text-[25px] font-bold text-white" />{" "}
              Write
            </button>
          </div>
          <IoSunnyOutline className="text-[25px] font-bold text-neutral-500 md:flex hidden" />
          <IoMdNotificationsOutline className="text-[25px] font-bold text-neutral-500 md:flex hidden" />
          <div onClick={() => router.push("/profile")}>
            {user?.image ? (
              <Image
                src={user?.image}
                width={40}
                height={40}
                className="rounded-full w-[40px] h-[40px] "
                alt=""
              />
            ) : (
              <div className="min-h-[40px] min-w-[40px] rounded-full border border-neutral-300"></div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Homebar;
