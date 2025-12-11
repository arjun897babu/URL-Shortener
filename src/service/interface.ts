import { IURLModel } from "@/model/interface";
import { IAddAnalytics } from "@/repository/interface";
import { IResponse } from "@/utils/constant";

export interface ICreateUrl {
  alias?: string;
  origin: string;
}

export interface IURLService {
  get(shortURL: string): Promise<IResponse & Pick<IURLModel, "_id" | "origin">>;
  create(data: ICreateUrl): Promise<IResponse & { short: string }>;
  delete(url: string): Promise<IResponse>;
}

export interface IAnalyticsService {
  add(data: IAddAnalytics): Promise<IResponse>;
  get(_id: string): Promise<any>;
}
