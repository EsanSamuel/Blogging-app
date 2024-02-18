import { IReply } from "@/types";
import { Schema, models, model } from "mongoose";

const replyss = new Schema<IReply>({
  author: {
    type: Schema.Types.ObjectId,
    ref: "Users",
  },
  blogcomment: {
    type: Schema.Types.ObjectId,
    ref: "BlogComment",
  },
  reply: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: () => new Date().toISOString(),
  },
});

const BlogReply = models.BlogReply || model<IReply>("BlogReply", replyss);
export default BlogReply;
