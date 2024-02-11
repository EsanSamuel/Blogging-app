import mongoose from "mongoose";

const connectDB = async () => {
  try {
    mongoose.set("strictQuery", true);
    //connecting the app to the database
    await mongoose
      .connect(process.env.DATABASE_URL!)
      .then(() => console.log("Database connected!"));
  } catch (error) {
    console.log(error);
  }
};

export default connectDB;
