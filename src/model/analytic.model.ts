import { model, Schema, Types } from "mongoose";
import { IAnalytics } from "./interface";

const analyticSchema = new Schema<IAnalytics>(
  {
    urlId: {
      type: Types.ObjectId,
      ref: "URLModel",
      required: true,
      index: true,
    },
    userAgent: {
      type: String,
      required: true,
    },
    ip: {
      type: String,
      required: true,
      default:null
    },
    os: {
      type: String,
      default:null
    },
    browser: {
      type: String,
      default:null 
    },
  },
  { timestamps: true }
);

export const AnalyticsModel = model("Analytics", analyticSchema);
