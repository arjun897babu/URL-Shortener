import { URLModel } from "@/model/url.model";
import { ICreateRepo, IShort, IURLRepo } from "./interface";
import CustomError from "@/utils/custom.error";
import { HttpStatusCode } from "@/utils/constant"; 

/* The URLRepo class in implements methods for creating, deleting, updating, and retrieving
URLs . */

export default class URLRepo implements IURLRepo {
  /**
   * @param {ICreateRepo} data - The `data` parameter contains the origin URL and short code
   */
  async create(data: ICreateRepo): Promise<void> {
    try {
      await URLModel.create(data);
    } catch (error: any) {
      if (error?.code == 11000) {
        throw new CustomError(
          "The provided URL already exists.",
          HttpStatusCode.Conflict
        );
      }
      throw error;
    }
  }

  /**
   * @param short - The `short` parameter in the `delete` method is used to identify the short URL that needs to be deleted from the database.
   */
  async delete(short: IShort["short"]): Promise<void> {
    try {
      const response = await URLModel.deleteOne({ short });
      if (response.deletedCount === 0) {
        throw new CustomError(
          "Provided URL is not found.",
          HttpStatusCode.NotFound
        );
      }
    } catch (error) {
      throw error;
    }
  }

  private async isShortExist(
    short: string
  ): Promise<{ origin: ICreateRepo["origin"] | undefined }> {
    try {
      const response = await URLModel.findOne({ short }, { origin: 1 });

      return { origin: response?.origin };
    } catch (error) {
      throw error;
    }
  }

  /**
   * @param short - The `short` parameter check if a short URL exists
   * @returns Returning a Promise that resolves to an object with the `origin`
   */
  async get(
    short: IShort["short"]
  ): Promise<{ origin: ICreateRepo["origin"] | undefined }> {
    try {
      const response = await this.isShortExist(short);
      return response;
    } catch (error) {
      throw error;
    }
  }
}
