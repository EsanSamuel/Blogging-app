"use client";
import { commentProps, replyProps } from "@/types";
import { useSession } from "next-auth/react";
import React from "react";
import { useRouter } from "next/navigation";
import $axios from "@/lib/api";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import useRoutes from "@/hooks/useRoutes";
import ReplyCard from "./ReplyCard";

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

  return (
    <div>
      {comment.comment}
      {replies?.map((reply: replyProps) => (
        <div key={reply._id}>
          <ReplyCard reply={reply} />
        </div>
      ))}
    </div>
  );
};

export default CommentCard;
