import { nanoid } from "nanoid";
import { ICreateUrl, IURLService } from "./interface";
import { ICreateRepo, IURLRepo } from "@/repository/interface";
import { IResponse } from "@/utils/constant";

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
    return nanoid(this.shortKeyLength);
  }

  /**
   * @param {ICreateUrl}
   * @returns  {IResponse & {origin:string}}
   */
  async create({
    origin,
    userAgent,
    alias = "",
  }: ICreateUrl): Promise<IResponse & { short: string }> {
    try {
      const data = {
        origin,
        userAgent,
        short: this.generateShortKey(),
      };
      await this.urlRepo.create(data);
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

  async get(shortURL: string): Promise<IResponse & { origin: string }> {
    try {
      const { origin } = await this.urlRepo.get(shortURL);

      return {
        status: true,
        msg: "Redirecting to origin....",
        origin,
      };
    } catch (error) {
      throw error;
    }
  }
}
