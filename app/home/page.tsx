import Homebar from "@/components/Homebar";
import React from "react";

const page = () => {
  return (
    <div className="w-full pb-10">
      <Homebar />
      <div className="flex gap-6 md:justify-center md:items-center overflow-x-auto py-5 md:text-[13px] text-neutral-500">
        <button className="border border-neutral-200 rounded-full px-3 py-1 hover:text-[#407ef1] hover:border-[#407ef1] transition-[.10s]">
          Web development
        </button>
        <button className="border border-neutral-200 rounded-full px-3 py-1 hover:text-[#407ef1] hover:border-[#407ef1] transition-[.10s]">
          Mobile development
        </button>
        <button className="border border-neutral-200 rounded-full px-3 py-1 hover:text-[#407ef1] hover:border-[#407ef1] transition-[.10s]">
          AI & ML
        </button>
        <button className="border border-neutral-200 rounded-full px-3 py-1 hover:text-[#407ef1] hover:border-[#407ef1] transition-[.10s]">
          Data science
        </button>
        <button className="border border-neutral-200 rounded-full px-3 py-1 hover:text-[#407ef1] hover:border-[#407ef1] transition-[.10s]">
          Blockchain
        </button>
      </div>

      <div className="px-[25%] mt-5 flex flex-col gap-10">
        <div className="min-h-[200px] border border-neutral-200 rounded-[10px]"></div>
        <div className="min-h-[200px] border border-neutral-200 rounded-[10px]"></div>
      </div>
    </div>
  );
};

export default page;
