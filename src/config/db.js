import mongoose from "mongoose";

const connectDB = async () => {
  try {
      const uri = process.env.MONGO_URI || 'mongodb://localhost:27017/ecommerce';
      await mongoose.connect(uri);
    console.log("MongoDB connected");
  } catch (error) {
      // Log the error but do not exit the process. In hosted environments
      // (e.g. Render) the app should still bind to the port so the
      // platform can detect the service; failing to connect to MongoDB
      // should not prevent the server from starting. The deploy should
      // still be configured with a valid `MONGODB_URI`.
      console.error("MongoDB connection error:", error.message);
      // Re-throw so callers can optionally handle this promise rejection.
      throw error;
  }
};

export default connectDB;