import mongoose from "mongoose";

let isConnected = false;

const connectDb = async () => {
  if (isConnected) {
    console.log("⚡ Using existing MongoDB connection");
    return;
  }

  console.log("🔌 Initializing MongoDB connection...");
  console.log("🔎 MONGO_URI:", process.env.MONGO_URI || "❌ NOT FOUND");

  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      serverSelectionTimeoutMS: 15000,
    });

    isConnected = conn.connections[0].readyState === 1;

    console.log("✅ MongoDB Connected Successfully");
  } catch (error) {
    console.error("❌ MongoDB Connection Error:", error);
    throw error; // 🔥 important: don't silently fail
  }
};

export default connectDb;
