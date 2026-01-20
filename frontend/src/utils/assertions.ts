import type { ErrorResponse, GetCompanyQuoteResponse, GetCompanyResponse, MissingResponse, Quote } from "@/types/api/companies";

export const isErrorResponse = (response: unknown):
  response is ErrorResponse => {
  return (
    typeof response == 'object' &&
    response != null &&
    'error' in response &&
    typeof response.error == 'string'
  );
}

export const isMissingResponse = (response: unknown)
  : response is MissingResponse => {
  return (
    typeof response == 'object' &&
    response != null &&
    'message' in response &&
    typeof response.message == 'string'
  );
}

export const isFetchCompanyResponse = (response: unknown)
  : response is GetCompanyResponse => {
  return (
    typeof response == 'object' &&
    response != null &&
    'id' in response &&
    typeof response.id == 'number' &&
    'symbol' in response &&
    typeof response.symbol == 'string' &&
    'state' in response &&
    typeof response.state == 'string'
  );
}

export const isGetCompanyResponse = (response: unknown)
  : response is GetCompanyResponse => {
  return (
    typeof response == 'object' &&
    response != null &&
    'symbol' in response &&
    typeof response.symbol == 'string' &&
    'name' in response &&
    typeof response.name == 'string' &&
    'country' in response &&
    typeof response.country == 'string' &&
    'currency' in response &&
    typeof response.currency == 'string' &&
    'sector' in response &&
    typeof response.sector == 'string' &&
    'asset_type' in response &&
    typeof response.asset_type == 'string'
  );
}

const isQuote = (response: unknown)
  : response is Quote => {
  return (
    typeof response == 'object' &&
    response != null &&
    'open' in response &&
    typeof response.open == 'number' &&
    'high' in response &&
    typeof response.high == 'number' &&
    'low' in response &&
    typeof response.low == 'number' &&
    'volume' in response &&
    typeof response.volume == 'number' &&
    'latest_trading_date' in response &&
    response.latest_trading_date instanceof Date &&
    'previous_close' in response &&
    typeof response.previous_close == 'number' &&
    'change' in response &&
    typeof response.change == 'number' &&
    'change_percent' in response &&
    typeof response.change_percent == 'number'
  )
}

export const isGetCompanyQuoteResponse = (response: unknown)
  : response is GetCompanyQuoteResponse => {
  return (
    typeof response == 'object' &&
    response != null &&
    'symbol' in response &&
    typeof response.symbol == 'string' &&
    'quote' in response &&
    isQuote(response.quote)
  );
}

