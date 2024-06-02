export type QueryObj = {
  [key: string]: string | string[] | undefined;
};

export type ReqQuery = {
  page?: string;
  sort?: string;
  limit?: string;
  fields?: string;
  offset?: string;
  [key: string]: string | string[] | undefined;
};
