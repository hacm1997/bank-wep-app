import { AccountModel } from "../use-account";

export interface UseTransactionsParams {
  page_size?: number;
  page?: number;
  link_id?: string;
  account_id?: string;
  transaction_id?: string;
}

export interface TransactionsResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: TransactionModel[];
}

export interface TransactionModel {
  id: string;
  account: AccountModel;
  created_at: string;
  category: string;
  subcategory: string | null;
  merchant: Merchant;
  type: string;
  amount: number;
  status: string;
  balance: number;
  currency: string;
  reference: string;
  value_date: string;
  description: string;
  collected_at: string;
  observations: string | null;
  accounting_date: string;
  internal_identification: string;
}

export interface Merchant {
  logo: string;
  name: string;
  website: string;
}

export interface KpiModel {
  balance: number;
  revenues: number;
  expenses: number;
}
