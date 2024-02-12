import $axios from "@/lib/api";
import { blogType } from "@/types";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";
import { AiOutlineDelete, AiOutlineHeart } from "react-icons/ai";
import { FaRegComment } from "react-icons/fa";
import { FaRegComments } from "react-icons/fa6";
import { BsBookmarkStar } from "react-icons/bs";

type Props = {
  blog: blogType;
};

const Card = ({ blog }: Props) => {
  const router = useRouter();
  const { data: session } = useSession();
  const handleProfileClick = () => {
    if (blog?.author?._id === session?.user?.id) return router.push("/profile");

    router.push(
      `/profile/${blog?.author?._id}?username=${blog?.author?.username}?image=${blog?.author?.image}?email=${blog?.author?.email}`
    );
  };

  const deleteblog = async () => {
    try {
      const response = await $axios.delete(`/api/blog/${blog._id}`);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="h-auto border border-neutral-200 rounded-[10px] p-5 w-auto">
      <div className="md:flex justify-between gap-5">
        <div>
          <div className="flex gap-2 items-center" onClick={handleProfileClick}>
            <Image
              src={blog?.author?.image}
              width={1000}
              height={1000}
              className="h-[35px] w-[35px] rounded-full"
              alt=""
            />
            <div className="flex flex-col">
              <h1 className="text-neutral-500 font-bold">
                {blog?.author?.username}
              </h1>
              <p className="text-neutral-400 text-[11px]">
                {blog?.author?.email}
              </p>
            </div>
          </div>
          <h1 className="font-bold text-neutral-700 text-[22px] pt-2">
            {blog?.title}
          </h1>
          <p className="text-neutral-400 text-[14px] md:flex hidden">
            {(blog?.firstContent).slice(0, 120)}...
          </p>
        </div>
        <div className="flex justify-center items-center">
          <Image
            src={blog?.image}
            width={1000}
            height={1000}
            className="md:h-[100px] md:w-[300px] w-full h-[200px] rounded-[10px] md:flex mt-5"
            alt=""
          />
        </div>
      </div>
      <div className="justify-between flex">
        <div className="flex gap-4">
          <AiOutlineHeart className="text-neutral-500 text-[20px] mt-5" />
          <FaRegComments className="text-neutral-500 text-[20px] mt-5" />
        </div>
        <div className="flex gap-2 items-center">
          <BsBookmarkStar className="text-neutral-500 text-[15px] mt-5" />
          <button className="rounded-full bg-[#eaeaea] text-neutral-400 py-1 px-3 mt-5 text-[11px] ">
            {blog?.category}
          </button>
          {session?.user?.id === blog?.author?._id && (
            <AiOutlineDelete
              className="text-neutral-500 text-[20px] mt-5"
              onClick={deleteblog}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Card;
