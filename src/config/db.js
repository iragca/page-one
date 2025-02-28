import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const clientOptions = {
  serverSelectionTimeoutMS: 2000,
};

export const dbConnect = async (startServer) => {
  try {
    const URI = process.env.MONGO_URI || "mongodb://localhost:27017/pageone";

    console.info(`🚀 Connecting to MongoDB at ${URI}`);
    let client = await mongoose.connect(URI, clientOptions);

    if (client) {
      console.info("🟩 Connected to MongoDB");

      await mongoose.connection.db.admin().command({ ping: 1 });
      console.info(
        `📶 Pinged your deployment.
        Host: ${mongoose.connection.host}
        Database: ${mongoose.connection.name}`
      );

      return startServer();
    }
  } catch (error) {
    mongoose.disconnect();
    console.error(error);
    console.error("🟥 Could not connect to MongoDB");
    console.error("Exiting...");
    process.exit(1);
  }
};
