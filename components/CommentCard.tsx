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

type Props = {
  comment: commentProps;
};

const CommentCard = ({ comment }: Props) => {
  const { data: session } = useSession();
  const [editComment, setEditComment] = React.useState<string>("");
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

  const getComment = async () => {
    try {
      const response = await $axios.get(`/api/commentblog/${comment._id}`);
      setEditComment(response.data.comment);
    } catch (error) {
      console.log(error);
    }
  };

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
      const response = await $axios.post(`/api/reply/${comment._id}`);
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
        </div>
      </div>
      {replies?.map((reply: replyProps) => (
        <div key={reply._id}>
          <ReplyCard reply={reply} />
        </div>
      ))}
    </div>
  );
};

export default CommentCard;
