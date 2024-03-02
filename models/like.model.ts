import { ILike, ISave } from "@/types";
import { Schema, models, model } from "mongoose";

const likeSchema = new Schema<ILike>({
  author: {
    type: Schema.Types.ObjectId,
    ref: "Users",
  },
  blog: {
    type: Schema.Types.ObjectId,
    ref: "Blog",
  },
  createdAt: {
    type: Date,
    default: () => new Date().toISOString(),
  },
});

const Like = models.Like || model<ILike>("Like", likeSchema);
export default Like;
