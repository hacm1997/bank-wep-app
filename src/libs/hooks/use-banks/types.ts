export interface UseBanksParams {
  page_size?: number;
  page?: number;
}

export interface FormField {
  name: string;
  type: string;
  label: string;
  validation: string;
  placeholder?: string;
  validation_message: string;
}

export interface BanksModel {
  id: number;
  name: string;
  type: string;
  code: string;
  website: string | null;
  display_name: string;
  country_code: string;
  country_codes: string[];
  primary_color: string;
  logo: string;
  icon_logo: string;
  text_logo: string;
  form_fields: FormField[];
  features: string[];
  integration_type: string;
  status: string;
  resources: string[];
  openbanking_information: string | null;
}

export interface BanksResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: BanksModel[];
}
