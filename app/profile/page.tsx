"use client";
import Homebar from "@/components/Homebar";
import { ApiContext, TProps } from "@/context/ApiProvider";
import { format, formatDistanceToNowStrict } from "date-fns";
import Image from "next/image";
import React, { useMemo } from "react";

const YourProfile = () => {
  const { userBlogs, user } = React.useContext(ApiContext) as TProps;

  const createdAt = useMemo(() => {
    if (!user?.createdAt) {
      return null;
    }
    const date = new Date(user?.createdAt);
    return formatDistanceToNowStrict(date);
  }, [user?.createdAt]);
  return (
    <div>
      <Homebar />
      <div className="px-[15%] py-[10%]">
        <div className="border border-neutral-300 rounded-[10px] px-20 py-10">
          <div className="flex items-center gap-4 pb-10">
            {user?.image ? (
              <Image
                src={user?.image}
                width={100}
                height={100}
                alt=""
                className="w-[200px] h-[200px] rounded-full"
              />
            ) : (
              <div className="min-w-[200px] min-h-[200px] rounded-full border border-neutral-300"></div>
            )}
            <div className="">
              <h1 className="font-bold text-[30px]">{user?.username}</h1>
              <p className=" text-[17px] text-neutral-400">{user?.nickname}</p>
            </div>
          </div>

          <div className="border border-neutral-300 rounded-[10px] py-5 text-center">
            Joined on {createdAt} ago
          </div>
          <div className="grid grid-cols-3 mt-10 gap-3">
            <div className="p-10 border border-neutral-300 rounded-[10px] ">
              <h1 className="font-bold text-[20px]">About Me</h1>
              <p className="text-neutral-500 text-[14px]">{user?.bio}</p>
            </div>
            <div className="p-10 border border-neutral-300 rounded-[10px] ">
              <h1 className="font-bold text-[20px]">My Tech Stack</h1>
            </div>
            <div className="p-10 border border-neutral-300 rounded-[10px] ">
              <h1 className="font-extrabold text-[20px]">Job Type</h1>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default YourProfile;
