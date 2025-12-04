import { Logger } from "@/utils/logger";
import { ErrorMiddleware } from "@/routes/middleware/error.middleware"; 


export const logger = new Logger();
export const errorMiddlware = new ErrorMiddleware()