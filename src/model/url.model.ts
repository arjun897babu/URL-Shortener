import { model, Schema } from "mongoose";
import { IURLModel } from "./interface";

const urlModelSchema = new Schema<IURLModel>(
  {
    origin: {
      type: String,
      required: true,
      unique: true,
    },
    short: {
      type: String,
      required: true,
      unique: true,
    },
    visitCount: {
      type: Number,
      default: 0,
    },
    isCustom: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

export const URLModel = model<IURLModel>("URLModel", urlModelSchema);
