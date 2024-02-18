import { ISave } from "@/types";
import { Schema, models, model } from "mongoose";

const saveSchema = new Schema<ISave>({
  author: {
    type: Schema.Types.ObjectId,
    ref: "Users",
  },
  blog: {
    type: Schema.Types.ObjectId,
    ref: "Blog",
  },
  owner: {
    type: Schema.Types.ObjectId,
    ref: "Users",
  },
  createdAt: {
    type: Date,
    default: () => new Date().toISOString(),
  },
});

const Save = models.Save || model<ISave>("Save", saveSchema);
export default Save;
