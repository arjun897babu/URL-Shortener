export interface ICreateRepo {
  origin: string;
  short: string;
  alias?: boolean; 
}

export interface IShort {
  short: string;
  updatedShort: string;
}

export interface IURLRepo {
  create(data: ICreateRepo): Promise<void>; 
  delete(short: IShort["short"]): Promise<void>;
  get(
    short: IShort["short"]
  ): Promise<{ origin: ICreateRepo["origin"] | undefined }>;
}
