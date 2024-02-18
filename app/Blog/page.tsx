"use client";
import React, { useMemo } from "react";
import { useSearchParams } from "next/navigation";
import useRoutes from "@/hooks/useRoutes";
import $axios from "@/lib/api";
import { useSession } from "next-auth/react";
import { allCommentsProps, blogType, commentProps } from "@/types";
import { formatDistanceToNowStrict } from "date-fns";
import Image from "next/image";
import CommentCard from "@/components/CommentCard";
import Homebar from "@/components/Homebar";
import { FaRegHeart, FaComment, FaRegBookmark } from "react-icons/fa";
import { FaRegComment } from "react-icons/fa6";
import { IoCloseOutline, IoShareSocialOutline } from "react-icons/io5";
import useCommentModal from "@/hooks/zustand/useCommentModal";
import { ApiContext, TProps } from "@/context/ApiProvider";
import RelatedBlogsCard from "@/components/RelatedBlogsCard";

const BLOG_URL = "/api/blog";
const COMMENT_URL = "/api/comment";

const Blog = () => {
  const { user, blogs } = React.useContext(ApiContext) as TProps;
  const { data: session } = useSession();
  const getParams = useSearchParams();
  const blogId = getParams.get("blogId");
  const [comment, setComment] = React.useState<string>("");
  const modal = useCommentModal();
  const openModal = () => {
    modal.onOpen();
  };

  const closeModal = () => {
    modal.onClose();
  };

  const { data: blog, isLoading } = useRoutes(`${BLOG_URL}/${blogId}`);

  const getRelatedBlogs = blogs.filter(
    (item) => item.category === blog?.category
  );

  if (isLoading) {
    console.log("Blog loading...");
  }

  const createComment = async () => {
    const body = {
      userId: session?.user?.id,
      comment,
    };
    try {
      const response = await $axios.post(`${COMMENT_URL}/${blogId}`, body);
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const { data: comments = [], isLoading: loadingBlogs } = useRoutes(
    `${COMMENT_URL}/${blogId}`
  );

  if (loadingBlogs) {
    console.log("Loading comments...");
  }

  const createdAt = useMemo(() => {
    if (!blog?.createdAt) {
      return null;
    }
    const date = new Date(blog?.createdAt);
    return formatDistanceToNowStrict(date);
  }, [blog?.createdAt]);

  return (
    <>
      <Homebar />
      <div className="pt-20">
        <div className="px-[20%] py-20 ">
          {blog?.image ? (
            <Image
              src={blog?.image}
              width={1000}
              height={1000}
              className="w-full h-[500px] rounded-[10px] "
              alt=""
            />
          ) : (
            <div className="w-full min-h-[500px] rounded-[10px] border border-neutral-300"></div>
          )}
          <h1 className="text-[50px] text-center font-bold mt-10">
            {blog?.title}
          </h1>
          {blog?.author && (
            <div className="flex gap-4 text-[17px] text-neutral-500 text-center items-center justify-center">
              <Image
                src={blog?.author?.image}
                width={30}
                height={30}
                className="rounded-full"
                alt=""
              />
              <p className="text-center">
                Written by {blog?.author?.username},
              </p>
              <div>
                <p>Posted {createdAt} ago.</p>
              </div>
            </div>
          )}
          <div className="mt-20 flex flex-col gap-5">
            <h1 className="font-bold text-[30px]">{blog?.firstParagraph}</h1>
            <p className="text-[22px] text-neutral-500">{blog?.firstContent}</p>
          </div>

          <div className="mt-20 flex flex-col gap-5">
            <h1 className="font-bold text-[30px]">{blog?.secondParagraph}</h1>
            <p className="text-[22px] text-neutral-500">
              {blog?.secondContent}
            </p>
          </div>

          <div className="mt-10 flex flex-col gap-5">
            <h1 className="font-bold text-[30px]">{blog?.thirdParagraph}</h1>
            <p className="text-[22px] text-neutral-500">{blog?.thirdContent}</p>
          </div>

          <div className="flex items-center justify-center">
            <div className="min-h-[50px] min-w-[300px] shadow-lg rounded-full fixed bottom-5 px-7 py-3 bg-white flex justify-between border border-neutral-300">
              <FaRegHeart className="text-[20px] text-neutral-500" />
              <div className="flex gap-2">
                <FaRegComment
                  className="text-[20px] text-neutral-500"
                  onClick={openModal}
                />
                <h1 className="text-[15px] text-neutral-500">
                  {comments.length}
                </h1>
              </div>
              <FaRegBookmark className="text-[20px] text-neutral-500" />
              <IoShareSocialOutline className="text-[20px] text-neutral-500" />
            </div>
          </div>
        </div>

        {modal.isOpen === true && (
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none bg-neutral-800 bg-opacity-70 ">
            <div className="relative w-full lg:w-3/6 my-6 mx-auto lg:max-w-3xl h-full lg:h-auto">
              <div className="w-full lg:h-auto border-0 rounded-lg relative flex flex-col gap-6 h-auto  p-5 bg-white shadow-lg outline-none focus:outline-none">
                <IoCloseOutline
                  className="text-neutral-500 text-[20px] cursor-pointer text-right "
                  onClick={closeModal}
                />
                <h1 className="text-neutral-700 font-semibold">
                  Create Comment
                </h1>
                <div className="flex w-full gap-2 items-center justify-center">
                  {user?.image ? (
                    <Image
                      src={user?.image}
                      width={30}
                      height={30}
                      className="rounded-full w-[40px] h-[40px]"
                      alt=""
                    />
                  ) : (
                    <div className="min-w-[40px] min-h-[40px] border border-neutral-300 rounded-full"></div>
                  )}
                  <input
                    className="w-full border-hidden mt-5 py-3 px-4 outline-none"
                    placeholder="Enter Comment..."
                    onChange={(e) => setComment(e.target.value)}
                  />
                </div>
                <div className=" flex gap-4 mt-10 w-full">
                  <button
                    className="border border-neutral-300 rounded-full text-neutral-500 p-2 px-4 "
                    onClick={closeModal}
                  >
                    Cancel
                  </button>
                  <button
                    className="bg-[#407ef1] rounded-full text-white p-2 px-4 "
                    onClick={createComment}
                  >
                    Comment
                  </button>
                </div>
                <hr />
                <div className="">
                  <h1 className="text-neutral-500 text-[20px] pb-5 overflow-y-auto">
                    Comments
                  </h1>
                  {comments?.length > 0 ? (
                    <div>
                      {comments.map((comment: allCommentsProps) => (
                        <div className="flex flex-col gap-3" key={comment._id}>
                          <CommentCard comment={comment} />
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className='"text-neutral-300 text-[15px] text-center pb-5 overflow-y-auto'>
                      No comment yet, Be the first to comment.
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="px-[20%] py-10">
          <h1 className="text-neutral-500 text-[20px]">Related Blogs</h1>
          {getRelatedBlogs.slice(0, 3)?.map((relatedblog: blogType) => (
            <div
              key={relatedblog._id}
              className="flex md:flex-row flex-col justify-between w-full"
            >
              <RelatedBlogsCard blog={relatedblog} />
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Blog;
