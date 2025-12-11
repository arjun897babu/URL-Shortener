import { IAddAnalytics, IAnalyticsRepo } from "@/repository/interface";
import { IResponse } from "@/utils/constant";
import { IAnalyticsService } from "./interface";

export default class AnalyticsService implements IAnalyticsService {
  analyticsRepo: IAnalyticsRepo;
  constructor(analyticsRepo: IAnalyticsRepo) {
    this.analyticsRepo = analyticsRepo;
  }
  async add(data: IAddAnalytics): Promise<IResponse> {
    try {
      await this.analyticsRepo.add(data);
      return {
        status: true,
        msg: "data added successfully",
      };
    } catch (error) {
      throw error;
    }
  }

  async get(_id: string): Promise<any> {
    try {
      const response = await this.analyticsRepo.get(_id);
      return response
    } catch (error) {
      throw error;
    }
  }
}
