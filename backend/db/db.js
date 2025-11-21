import mongoose from "mongoose";

const connectDb = async () => {
  console.log("🔌 Initializing MongoDB connection...");
  console.log("🔎 MONGO_URI:", process.env.MONGO_URI || "❌ NOT FOUND");

  try {
    await mongoose.connect(process.env.MONGO_URI, {
      serverSelectionTimeoutMS: 15000,
    });

    console.log("✅ MongoDB Connected Successfully");
  } catch (error) {
    console.error("❌ MongoDB Connection Error:", error);
  }
};

export default connectDb;
