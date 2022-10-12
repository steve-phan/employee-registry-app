import mongoose from "mongoose";

export const connectMongoDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI!);
    console.log("MongoDb connected");
  } catch (error) {
    throw Error(`MongoDB connect fail: ${JSON.stringify(error)}`);
  }
};
