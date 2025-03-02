export interface UseLinksParams {
  page_size?: number;
  page?: number;
}

export interface LinkModel {
  id: string;
  institution: string;
  access_mode: string;
  status: string;
  refresh_rate: string;
  created_by: string;
  last_accessed_at: string;
  external_id: string | null;
  created_at: string;
  institution_user_id: string;
  credentials_storage: string;
  stale_in: string | null;
  fetch_resources: string[];
}

export interface LinkResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: LinkModel[];
}
