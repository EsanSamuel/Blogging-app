import { singleblogType } from "@/types";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";

type Props = {
  blog: singleblogType;
};

const RelatedBlogsCard = ({ blog }: Props) => {
  const router = useRouter();
  const handleClick = () => {
    router.push(`/Blog?blogId=${blog._id}`);
  };
  return (
    <div
      className="border p-5 border-neutral-300 flex flex-col gap-3 rounded-[10px] mt-10"
      onClick={handleClick}
    >
      <div className="flex gap-3 items-center">
        <Image
          src={blog?.author?.image}
          width={100}
          height={100}
          className="w-[30px] h-[30px] rounded-full"
          alt=""
        />
        <h1
          className={`font-bold ${
            blog?.theme === "Dark" ? "text-white" : "text-neutral-500"
          }`}
        >
          {blog?.author?.username}
        </h1>
      </div>
      <Image
        src={blog?.image}
        width={1000}
        height={1000}
        className="w-full h-[200px] rounded"
        alt=""
      />

      <h1
        className={`text-[25px] font-bold text-black ${
          blog?.theme === "Dark" ? "text-white" : "text-black"
        }`}
      >
        {blog?.title}
      </h1>
      <p>{(blog?.firstContent).slice(0, 70)}...</p>
    </div>
  );
};

export default RelatedBlogsCard;
