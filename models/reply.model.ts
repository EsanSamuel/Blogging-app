import { IReply } from "@/types";
import { Schema, models, model } from "mongoose";

const replySchema = new Schema<IReply>({
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
    default: () => new Date(),
  },
});

const BlogReply = models.BlogReply || model<IReply>("BlogReply", replySchema);
export default BlogReply;
