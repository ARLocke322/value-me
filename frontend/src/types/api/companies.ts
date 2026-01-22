
export interface FlowResponse {
  id: number
  symbol: string
  state: string
}

export enum CompanyAnalysisState {
  Pending = "pending",

  // --- Company Overview ---
  FetchingOverview = "fetching_overview",
  FetchedOverview = "fetched_overview",
  FailedFetchOverview = "failed_fetch_overview",

  SavingOverview = "saving_overview",
  SavedOverview = "saved_overview",
  FailedSaveOverview = "failed_save_overview",

  // --- Company Quote ---
  FetchingQuote = "fetching_quote",
  FetchedQuote = "fetched_quote",
  FailedFetchQuote = "failed_fetch_quote",

  SavingQuote = "saving_quote",
  SavedQuote = "saved_quote",
  FailedSaveQuote = "failed_save_quote",

  // --- Company Cash Flow ---
  FetchingCf = "fetching_cf",
  FetchedCf = "fetched_cf",
  FailedFetchCf = "failed_fetch_cf",

  SavingAcfReports = "saving_acf_reports",
  SavedAcfReports = "saved_acf_reports",
  FailedSaveAcfReports = "failed_save_acf_reports",
}

export interface GetCompanyResponse {
  symbol: string
  name: string
  country: string
  currency: string
  sector: string
  asset_type: string
}

export interface Quote {
  open: number
  high: number
  low: number
  volume: number
  latest_trading_date: Date
  previous_close: number
  change: number
  change_percent: number
}
export interface GetCompanyQuoteResponse {
  symbol: string
  quote: Quote
}

export type ErrorResponse = {
  error: string
}

export type MissingResponse = {
  message: string
}
