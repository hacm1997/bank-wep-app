export interface UseAccountParams {
  page_size?: number;
  page?: number;
  link_id?: string;
}

export interface Institution {
  name: string;
  type: string;
}

export interface Balance {
  current: number;
  available: number;
}

export interface LoanData {
  fees: number | null;
  limit_day: string | null;
  loan_type: string | null;
  principal: number | null;
  limit_date: string | null;
  cutting_day: string | null;
  collected_at: string | null;
  credit_limit: number | null;
  cutting_date: string | null;
  interest_rate: number | null;
  interest_rates: number | null;
  contract_number: string | null;
  monthly_payment: number | null;
  payment_due_day: string | null;
  last_payment_date: string | null;
  next_payment_date: string | null;
  contract_start_date: string | null;
  last_period_balance: number | null;
  no_interest_payment: number | null;
  outstanding_balance: number | null;
  outstanding_principal: number | null;
  number_of_installments_total: number | null;
  number_of_installments_outstanding: number | null;
}

export interface CreditData {
  collected_at: string;
  credit_limit: number;
  cutting_date: string;
  interest_rate: number;
  minimum_payment: number;
  monthly_payment: number;
  last_payment_date: string;
  next_payment_date: string;
  last_period_balance: number;
  no_interest_payment: number;
}

export interface AccountModel {
  id: string;
  link: string;
  institution: Institution;
  created_at: string;
  name: string;
  type: string;
  agency: string;
  number: string;
  balance: Balance;
  category: string;
  currency: string;
  loan_data: LoanData | null;
  credit_data: CreditData | null;
  balance_type: string;
  collected_at: string;
  bank_product_id: string;
  last_accessed_at: string;
  internal_identification: string;
  public_identification_name: string;
  public_identification_value: string;
}

export interface AcountResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: AccountModel[];
}
