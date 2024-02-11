import { IComment } from "@/types";
import { Schema, models, model } from "mongoose";

const blogCommentSchema = new Schema<IComment>({
  author: {
    type: Schema.Types.ObjectId,
    ref: "Users",
  },
  blog: {
    type: Schema.Types.ObjectId,
    ref: "Blog",
  },
  comment: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: () => new Date(),
  },
});

const BlogComment =
  models.BlogComment || model<IComment>("BlogComment", blogCommentSchema);
export default BlogComment;
