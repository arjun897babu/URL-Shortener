import { URLShortenerEnv } from "@/config/env";

export const generateShortURL = (url: string) => {
  return `${URLShortenerEnv.origin}/${url}`;
};
