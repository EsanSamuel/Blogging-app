import { IBlog } from "@/types";
import { Schema, model, models } from "mongoose";

const blogSchema = new Schema<IBlog>({
  author: {
    type: Schema.Types.ObjectId,
    ref: "Users",
  },
  title: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  firstParagraph: {
    type: String,
    required: true,
  },
  firstContent: {
    type: String,
    required: true,
  },
  secondParagraph: {
    type: String,
  },
  secondContent: {
    type: String,
  },
  thirdParagraph: {
    type: String,
  },
  thirdContent: {
    type: String,
  },
  category: {
    type: String,
    enum: [
      "Web development",
      "Mobile development",
      "AI & ML",
      "Data science",
      "Blockchain",
    ],
  },
  likes: {
    type: Number,
    default: 0,
  },
  dislikes: {
    type: Number,
    default: 0,
  },
  createdAt: {
    type: Date,
    default: () => new Date(),
  },
});

const Blog = models.Blog || model<IBlog>("Blog", blogSchema);
export default Blog;
