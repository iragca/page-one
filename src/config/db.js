import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

async function run() {
  const clientOptions = {
    serverApi: { version: "1", strict: true, deprecationErrors: true },
    useNewUrlParser: true,
  };
  try {
    // Create a Mongoose client with a MongoClientOptions object to set the Stable API version

    await mongoose.connect(process.env.MONGO_URI, clientOptions);
    await mongoose.connection.db.admin().command({ ping: 1 });
    console.log(
      `🚀 Pinged your deployment. Successfully connected!
      Host: ${mongoose.connection.host}
      Collection: ${mongoose.connection.name}
      URI: ${process.env.MONGO_URI}`
    );
  } finally {
    // Ensures that the client will close when you finish/error
    await mongoose.disconnect();
  }
}

export const connectDB = async () => {
  try {
    run().catch(console.dir);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};
