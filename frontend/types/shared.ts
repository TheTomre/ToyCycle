export type CategoryType = {
  id: number;
  title: string;
  filterForApi: string;
};

export type Pagination = {
  page: number;
  limit: number;
  sort: string;
  totalCount?: number;
};
