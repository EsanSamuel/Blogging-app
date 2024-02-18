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
    <div className="border p-3 border-neutral-400 flex flex-col gap-3">
      <div className="flex gap-3">
        <Image
          src={blog?.author?.image}
          width={100}
          height={100}
          className="w-[30px] h-[30px] rounded-full"
          alt=""
        />
        <h1 className="text-neutral-500 font-bold">{blog?.author?.username}</h1>
      </div>
      <Image
        src={blog?.image}
        width={100}
        height={100}
        className="w-full h-[200px] rounded"
        alt=""
      />

      <h1 className="text-[25px] font-bold text-neutral-500">{blog?.title}</h1>
    </div>
  );
};

export default RelatedBlogsCard;
