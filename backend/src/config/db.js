import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONG_URI);
    console.log({
      message: "Database connected successfully",
      host: conn.connection.host,
      status: "success"
    });
  } catch (error) {
    console.error({
      message: "Database connection failed",
      error: error.message,
      status: "failed"
    });
    process.exit(1);
  }
};

export default connectDB;
