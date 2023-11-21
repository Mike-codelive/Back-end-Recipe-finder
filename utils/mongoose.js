import mongoose from "mongoose";
import dotenv from "dotenv/config";

const mongoUri = process.env.MONGODB_URI;

export async function connectToDB() {
  mongoose
    .connect(mongoUri, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
      console.log("Connected to MongoDB");
    })
    .catch((error) => {
      console.error("Error connecting to MongoDB:", error);
    });
}
