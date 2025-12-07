import { Document } from "mongoose";

export interface IURLModel extends Document {
  origin: string;
  short: string;
  isCustom: boolean;
}
