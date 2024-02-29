"use client";
import { commentProps, replyProps } from "@/types";
import { useSession } from "next-auth/react";
import React, { useMemo } from "react";
import { useRouter } from "next/navigation";
import $axios from "@/lib/api";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import useRoutes from "@/hooks/useRoutes";
import ReplyCard from "./ReplyCard";
import Image from "next/image";
import { formatDistanceToNowStrict } from "date-fns";
import { ApiContext, TProps } from "@/context/ApiProvider";

type Props = {
  comment: commentProps;
};

const CommentCard = ({ comment }: Props) => {
  const { data: session } = useSession();
  const { user } = React.useContext(ApiContext) as TProps;
  const [editComment, setEditComment] = React.useState<string>("");
  const [replyModal, setReplyModal] = React.useState<boolean>(false);
  const [editModal, setEditModal] = React.useState<boolean>(false);
  const [showReplies, setShowReplies] = React.useState(false);
  const [reply, setReply] = React.useState("");
  const router = useRouter();
  const handleClick = () => {
    if (comment?.author?._id === session?.user?.id)
      return router.push("/profile");

    router.push(
      `/profile/${comment?.author?._id}?username=${comment?.author?.username}&image=${comment?.author?.image}&email=${comment?.author?.email}`
    );
  };

  const deleteComment = async () => {
    try {
      await $axios.delete(`/api/comment/${comment._id}`);
    } catch (error) {
      console.log(error);
    }
  };

  React.useEffect(() => {
    const getComment = async () => {
      try {
        const response = await $axios.get(`/api/commentblog/${comment._id}`);
        setEditComment(response.data.comment);
      } catch (error) {
        console.log(error);
      }
    };
    if (comment._id) getComment();
  }, []);

  const { data: authorcomment } = useRoutes(`/api/commentblog/${comment._id}`);

  const commentSchema = z.object({
    editComment: z.string().min(1, {
      message: "Value too short",
    }),
  });

  type commentType = z.infer<typeof commentSchema>;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<commentType>({
    resolver: zodResolver(commentSchema),
  });

  const edit = async ({ editComment }: commentType, e: any) => {
    e.preventDefault();
    try {
      const response = await $axios.patch(`/api/comment/${comment._id}`, {
        comment: editComment,
      });
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const replyComment = async () => {
    try {
      const response = await $axios.post(`/api/reply/${comment._id}`, {
        userId: session?.user?.id,
        reply,
      });
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const { data: replies = [] } = useRoutes(`/api/reply/${comment._id}`);

  const createdAt = useMemo(() => {
    if (!comment?.createdAt) {
      return null;
    }

    return formatDistanceToNowStrict(new Date(comment?.createdAt));
  }, [comment?.createdAt]);

  return (
    <div className="flex flex-col gap-3 pb-3">
      <div className="flex gap-2 items-center">
        <Image
          src={comment?.author?.image}
          width={100}
          height={100}
          className="w-[30px] h-[30px] rounded-full"
          alt=""
        />
        <div className="flex flex-col gap-1">
          <div className="flex gap-3">
            <h4 className="text-[10px] text-neutral-500">
              {comment?.author?.username}
            </h4>
            <div>
              <p className="text-[10px] text-neutral-500">{createdAt!}</p>
            </div>
          </div>
          <h2>{comment?.comment}</h2>
          <div className="flex gap-7">
            <h4
              className="text-[10px] text-neutral-500 cursor-pointer"
              onClick={() => setReplyModal(true)}
            >
              Reply
            </h4>
            {session?.user?.id === comment?.author?._id && (
              <div className="flex gap-7">
                <div>
                  <h4
                    className="text-[10px] text-neutral-500 cursor-pointer"
                    onClick={deleteComment}
                  >
                    Delete
                  </h4>
                </div>
                <div>
                  <h4
                    className="text-[10px] text-neutral-500 cursor-pointer"
                    onClick={() => setEditModal(true)}
                  >
                    Edit
                  </h4>
                </div>
              </div>
            )}
          </div>
          {replies && (
            <button
              onClick={() => setShowReplies(true)}
              className="text-[12px]"
            >
              View all replies
            </button>
          )}
        </div>
      </div>

      {replyModal && (
        <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none bg-neutral-800 bg-opacity-70 ">
          <div className="relative w-full lg:w-3/6 my-6 mx-auto lg:max-w-3xl h-full lg:h-auto">
            <div className="w-full lg:h-auto border-0 rounded-lg relative flex flex-col gap-6 h-auto  p-5 bg-white shadow-lg outline-none focus:outline-none">
              <h1 className="text-center">
                Reply to {authorcomment?.author?.username}'s comment
              </h1>
              <div className="flex gap-2">
                <div>
                  <Image
                    src={authorcomment?.author?.image}
                    width={100}
                    height={100}
                    className="w-[30px] h-[30px] rounded-full"
                    alt=""
                  />

                  <div className="flex gap-3">
                    <h4 className="text-[10px] text-neutral-500">
                      {comment?.author?.username}
                    </h4>
                    <div>
                      <p className="text-[10px] text-neutral-500">
                        {createdAt!}
                      </p>
                    </div>
                  </div>
                </div>
                <h1>{authorcomment?.comment}</h1>
              </div>
              <div className="flex gap-3">
                <div>
                  <Image
                    src={user?.image}
                    width={100}
                    height={100}
                    className="w-[30px] h-[30px] rounded-full"
                    alt=""
                  />
                </div>
                <input
                  className="w-full p-2"
                  placeholder="Enter Reply"
                  onChange={(e) => setReply(e.target.value)}
                />
              </div>
              <button onClick={replyComment}>Reply</button>
            </div>
          </div>
        </div>
      )}

      {showReplies && (
        <div className="p-4">
          {replies?.map((reply: replyProps) => (
            <div key={reply._id}>
              <ReplyCard reply={reply} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CommentCard;
