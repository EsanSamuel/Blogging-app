import { replyProps, singleReplyProps } from "@/types";
import React from "react";

type Props = {
  reply: singleReplyProps;
};

const ReplyCard = ({ reply }: Props) => {
  return <div>
    {reply.reply}
  </div>;
};

export default ReplyCard;
