import mongoose from "mongoose";
import { env } from "../config/env.service.js";

const URI = env.databaseURI;
export const databaseConnection = async () => {
  try {
    await mongoose.connect(URI);
    console.log("Database Connected");
  } catch (error) {
    console.log("Error");
  }
};
