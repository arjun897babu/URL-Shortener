import { IURLModel } from "@/model/interface";
import { ObjectId, Types } from "mongoose";

export interface ICreateRepo {
  origin: string;
  short: string;
  alias?: boolean;
}

export interface IShort {
  short: string;
  updatedShort: string;
}

export interface IAddAnalytics {
  urlId: Types.ObjectId;
  userAgent: string;
  ip?: string;
  os?: string;
  browser?: string;
}

export interface IURLRepo {
  create(data: ICreateRepo): Promise<void>;
  delete(short: IShort["short"]): Promise<void>;
  get(
    short: IShort["short"]
  ): Promise<Pick<IURLModel, "_id" | "origin"> | null>;
}

export interface IAnalyticsRepo {
  add(data: IAddAnalytics): Promise<void>;
  get(id: string): Promise<any>;
}
