"use client";
import { ApiContext, TProps } from "@/context/ApiProvider";
import { userType } from "@/types";
import Image from "next/image";
import React from "react";

const Users = () => {
  const { users } = React.useContext(ApiContext) as TProps;
  return (
    <div className="h-auto border border-neutral-100 rounded-[10px] p-5 w-auto bg-slate-50">
      <h1 className="font-bold text-neutral-500">Recommended users for you</h1>
      <div className="grid md:grid-cols-2 grid-cols-1 py-5 gap-4">
        {users.slice(0, 3)?.map((user: userType) => (
          <div
            key={user._id}
            className="bg-white p-5 flex gap-2 border border-neutral-100 rounded-[10px] items-center"
          >
            <Image
              src={user?.image}
              width={100}
              height={100}
              className="w-[40px] h-[40px] rounded-full "
              alt=""
            />
            <div className="flex flex-col">
              <h1 className="font-bold">{user?.username}</h1>
              <p className="text-[13px] text-neutral-500">{user?.email}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Users;
