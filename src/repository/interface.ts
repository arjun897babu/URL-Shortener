export interface ICreateRepo {
  origin: string;
  short: string;
  alias?: boolean;
  userAgent: any;
}

export interface IShort {
  short: string;
  updatedShort: string;
}

export interface IURLRepo {
  create(data: ICreateRepo): Promise<void>;
  update(data: IShort): Promise<void>;
  delete(short: IShort["short"]): Promise<void>;
  get(short: IShort["short"]): Promise<{ origin: ICreateRepo["origin"] }>;
}
