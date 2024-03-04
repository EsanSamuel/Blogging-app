"use client";
import { ApiContext, TProps } from "@/context/ApiProvider";
import React from "react";

type Props = {
  setTheme: any;
  theme?: string;
};

const Sidebar = ({ setTheme, theme }: Props) => {
  const { user } = React.useContext(ApiContext) as TProps;
  return (
    <div className="p-5 border-r border-neutral-300 w-[250px] h-[100vh] sticky top-0 md:flex hidden flex flex-col gap-5">
      <h1 className="text-neutral-500 text-[13px] font-bold">
        {user?.username ? <h1> {user?.username}'s Blog</h1> : "Loading..."}
      </h1>
      <label className="text-[13px] text-neutral-500 flex flex-col gap-2">
        <h1> Select blog theme</h1>
        <select
          className="p-2 outline-none"
          onChange={(e) => setTheme(e.target.value)}
          value={theme}
        >
          <option>Light</option>
          <option>Dark</option>
        </select>
      </label>
    </div>
  );
};

export default Sidebar;
