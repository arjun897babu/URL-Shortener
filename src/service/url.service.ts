import { nanoid } from "nanoid";
import { ICreateUrl, IURLService } from "./interface";
import {
  IAddAnalytics,
  IAnalyticsRepo,
  ICreateRepo,
  IURLRepo,
} from "@/repository/interface";
import { HttpStatusCode, IResponse } from "@/utils/constant";
import CustomError from "@/utils/custom.error";
import { URLShortenerEnv } from "@/config/env";
import { IURLModel } from "@/model/interface";

export class URLService implements IURLService {
  private shortKeyLength: number;
  private urlRepo: IURLRepo;
  constructor(URLRepo: IURLRepo) {
    this.shortKeyLength = 12;
    this.urlRepo = URLRepo;
  }

  /**
   * @returns A short key generated using the `nanoid` function with a specified length.
   */

  private generateShortKey() {
    return `${URLShortenerEnv.origin}/${nanoid(this.shortKeyLength)}`;
  }

  /**
   * @param {ICreateUrl}
   * @returns  {IResponse & {origin:string}}
   */
  async create({
    origin,
    alias = "",
  }: ICreateUrl): Promise<IResponse & { short: string }> {
    try {
      const data: Partial<ICreateRepo> = {
        origin,
      };

      if (alias) {
        const response = await this.urlRepo.get(alias);
        if (!response) {
          throw new CustomError(
            "Provided custom alias is already taken",
            HttpStatusCode.Conflict
          );
        }
        data.short = alias;
        data.alias = true;
      } else {
        data.short = this.generateShortKey();
      }

      await this.urlRepo.create(data as ICreateRepo);

      return {
        status: true,
        msg: `New short URL created for the given origin`,
        short: data.short,
      };
    } catch (error) {
      throw error;
    }
  }

  /**
   * @param {string} short
   * @returns  {IResponse}
   */
  async delete(short: string): Promise<IResponse> {
    try {
      await this.urlRepo.delete(short);
      return {
        status: true,
        msg: "Given short URL is deleted successfully",
      };
    } catch (error) {
      throw error;
    }
  }

  /**
   * @param {string} shortURL -   represents the shortened URL
   * @returns  {IResponse&{origin:string}}
   */

  async get(
    shortURL: string
  ): Promise<IResponse & Pick<IURLModel, "_id" | "origin">> {
    try {
      const response = await this.urlRepo.get(shortURL); 
      if (!response) {
        throw new CustomError(
          "Provided short url is not found",
          HttpStatusCode.NotFound
        );
      }
      return {
        status: true,
        msg: "Redirecting to origin....",
        ...response,
      };
    } catch (error) {
      throw error;
    }
  }
}
