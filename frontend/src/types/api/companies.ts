export interface FetchCompanyResponse {
  id: number
  symbol: string
  state: string
}

export interface GetFlowStatusResponse {
  id: number
  symbol: string
  state: string
}

export interface GetCompanyResponse {
  symbol: string
  name: string
  country: string
  currency: string
  sector: string
  asset_type: string
}

interface Quote {
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
