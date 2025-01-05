import mongoose from 'mongoose';

export const ConnectDB = async (): Promise<void> => {
  try {
    await mongoose.connect(process.env.MONGO_URI!);
    console.log("Connected to MongoDB");
  } catch (error: any) {
    console.error("Failed to connect to MongoDB", error);
    throw error;
  }
};
