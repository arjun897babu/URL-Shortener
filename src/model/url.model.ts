import { model, Schema } from "mongoose";
import { IURLModel } from "./interface";

const urlModelSchema = new Schema<IURLModel>(
  {
    origin: {
      type: String,
      required: true,
    },
    short: {
      type: String,
      required: true,
    },
    alias: {
      type: String,
    },
    visitCount: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

export const URLModel = model<IURLModel>("URLModel", urlModelSchema);
