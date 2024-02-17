"use client";
import Card from "@/components/Card";
import Homebar from "@/components/Homebar";
import { ApiContext, TProps } from "@/context/ApiProvider";
import { blogType } from "@/types";
import Image from "next/image";
import React, { useContext } from "react";
import { MdFilterListOff } from "react-icons/md";
import Setup from "../../components/Setup";

const page = () => {
  const { blogs, user } = useContext(ApiContext) as TProps;
  const [filterCategory, setFilterCategory] = React.useState<string>("");

  const filterBlog = (category: string) =>
    filterCategory ? blogs.filter((blog) => blog.category === category) : blogs;

  return (
    <div className="w-full pb-10">
      <Homebar />
      <div className="flex gap-6 md:justify-center md:items-center overflow-x-auto py-5 md:text-[13px] text-neutral-500 md:flex hidden">
        <button
          className="border border-neutral-200 rounded-full px-3 py-1 hover:text-[#407ef1] hover:border-[#407ef1] transition-[.10s] font-bold"
          onClick={() => setFilterCategory("Web development")}
        >
          Web development
        </button>
        <button
          className="border border-neutral-200 rounded-full px-3 py-1 hover:text-[#407ef1] hover:border-[#407ef1] transition-[.10s] font-bold"
          onClick={() => setFilterCategory("Mobile development")}
        >
          Mobile development
        </button>
        <button
          className="border border-neutral-200 rounded-full px-3 py-1 hover:text-[#407ef1] hover:border-[#407ef1] transition-[.10s] font-bold"
          onClick={() => setFilterCategory("AI & ML")}
        >
          AI & ML
        </button>
        <button
          className="border border-neutral-200 rounded-full px-3 py-1 hover:text-[#407ef1] hover:border-[#407ef1] transition-[.10s] font-bold"
          onClick={() => setFilterCategory("Data science")}
        >
          Data science
        </button>
        <button
          className="border border-neutral-200 rounded-full px-3 py-1 hover:text-[#407ef1] hover:border-[#407ef1] transition-[.10s] font-bold"
          onClick={() => setFilterCategory("Blockchain")}
        >
          Blockchain
        </button>
        <MdFilterListOff
          className="text-neutral-500 text-[26px] hover:text-[#407ef1] cursor-pointer"
          onClick={() => setFilterCategory("")}
        />
      </div>

      <div className="md:px-[25%] p-5 mt-5 flex flex-col gap-10">
        <div className="">
          {filterBlog(filterCategory)?.map((blog: blogType) => (
            <div key={blog._id} className="flex gap-4 flex-col">
              <div className="flex flex-col gap-5 pb-5">
                <Card blog={blog} />
              </div>
            </div>
          ))}
        </div>
      </div>

      <Setup />
    </div>
  );
};

export default page;
