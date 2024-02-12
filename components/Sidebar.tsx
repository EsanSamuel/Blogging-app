"use client";
import { ApiContext, TProps } from "@/context/ApiProvider";
import React from "react";

const Sidebar = () => {
  const { user } = React.useContext(ApiContext) as TProps;
  return (
    <div className="p-5 border-r border-neutral-300 w-[250px] h-[100vh] sticky top-0 md:flex hidden">
      <h1 className="text-neutral-500 text-[13px] font-bold">
      {user?.username ? <h1> {user?.username}'s Blog</h1> : "Loading..."} 
      </h1>
    </div>
  );
};

export default Sidebar;
