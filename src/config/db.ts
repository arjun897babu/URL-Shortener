import { connect } from "mongoose";
import { URLShortenerEnv } from "./env";
import CustomError from "@/utils/custom.error"; 

export default class ConnectDB {
  async connect() {
    try {
      const connection = await connect(URLShortenerEnv.mongoURI);
      console.log(`MongoDB connected: `, connection.connection.host);
    } catch (err: any) {
      console.error("MongoDB connection error:", err?.message);
      throw new CustomError("Database connection failed", 500);
    }
  }
}
