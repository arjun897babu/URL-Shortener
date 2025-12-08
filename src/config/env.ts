import { config } from "dotenv";

config();
export const URLShortenerEnv = Object.freeze({
  mongoURI: process.env.MONGO_URI || "",
  origin: process.env.ORIGIN || "",
  port: process.env.PORT || 5000,
});
