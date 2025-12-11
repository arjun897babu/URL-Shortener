import { Document, ObjectId, Types } from "mongoose";

export interface IURLModel extends Document {
  origin: string;
  short: string;
  isCustom: boolean;
}
export interface IAnalytics extends Document {
  urlId: Types.ObjectId;
  userAgent: string;
  ip?: string;
  os?: string;
  browser?:string
}
