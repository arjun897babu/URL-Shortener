import mongoose from "mongoose";
import { IAddAnalytics, IAnalyticsRepo } from "./interface";
import { AnalyticsModel } from "@/model/analytic.model";

export default class AnalyticsRepo implements IAnalyticsRepo {
  async add(data: IAddAnalytics): Promise<void> {
    try {
      await AnalyticsModel.create(data);
    } catch (error) {
      throw error;
    }
  }

  async get(_id: string): Promise<any> {
    try {
      const [response] = await AnalyticsModel.aggregate([
        { $match: { urlId: new mongoose.Types.ObjectId(_id) } },
        {
          $group: {
            _id: "$urlId",
            clicks: { $sum: 1 },
            osSet: { $addToSet: { $ifNull: ["$os", "__unknown os__"] } },
            browserSet: {
              $addToSet: { $ifNull: ["$browser", "__unknown browser__"] },
            },
            ipSet: { $addToSet: { $ifNull: ["$ip", "__unknown ip__"] } },
            uaSet: { $addToSet: { $ifNull: ["$userAgent", "__unknown UA__"] } },
          },
        },
        {
          $lookup: {
            from: "urlmodels",
            localField: "_id",
            foreignField: "_id",
            as: "data",
          },
        },
        {
          $unwind: "$data",
        },
        {
          $project: {
            _id: 0,
            origin: "$data.origin",
            short: "$data.short",
            clicks: "$clicks",
            createdAt: "$data.createdAt",
            os: { count: { $size: "$osSet" }, list: "$osSet" },
            browser: { count: { $size: "$browserSet" }, list: "$browserSet" },
            ua: { count: { $size: "$uaSet" }, list: "$uaSet" },
            ip: { count: { $size: "$ipSet" }, list: "$ipSet" },
          },
        },
      ]);

      return response;
    } catch (error) {
      throw error;
    }
  }
}
