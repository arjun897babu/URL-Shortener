import { IResponse } from "@/utils/constant";

export interface ICreateUrl {
  alias?: string;
  origin: string;
  userAgent: any;
}

export interface IURLService {
  get(shortURL: string): Promise<IResponse & { origin: string }>;
  create(data: ICreateUrl): Promise<IResponse & { short: string }>;
  delete(url: string): Promise<IResponse>;
}
