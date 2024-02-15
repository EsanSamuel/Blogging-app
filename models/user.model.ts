import { IUser } from "@/types";
import { Schema, models, model } from "mongoose";

const userSchema = new Schema<IUser>({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  nickname: {
    type: String,
  },
  jobtype: {
    type: String,
    enum: [
      "Frontend developer",
      "UI/UX designer",
      "Backend developer",
      "Software engineer",
      "Cyber Security expert",
    ],
  },
  bio: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: () => new Date(),
  },
});

const Users = models.Users || model<IUser>("Users", userSchema);
export default Users;
