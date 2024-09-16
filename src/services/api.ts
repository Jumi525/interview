export type datakeys = {
  data: apiKeys[];
  pagination: paginatedKeys;
};

export type paginatedKeys = {
  current_page: string;
  limit: number;
  next_url: string;
  offset: number;
  total: number;
  total_pages: number;
};

export type apiKeys = {
  artist_display: string;
  inscriptions: string;
  date_start: number;
  date_end: number;
  place_of_origin: string;
  title: string;
  id: number;
};
