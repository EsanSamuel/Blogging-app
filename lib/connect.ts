import mongoose from "mongoose";

const connectDB = async () => {
  try {
    mongoose.set("strictQuery", true);
    await mongoose
      .connect(process.env.DATABASE_URL!)
      .then(() => console.log("Database connected 🚀🚀!"));
  } catch (error) {
    console.log(error);
  }
};

export default connectDB;
