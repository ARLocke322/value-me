import type { AcfReport, ErrorResponse, FlowResponse, GetCompanyAcfReportsResponse, GetCompanyQuoteResponse, GetCompanyResponse, MissingResponse, Quote } from "@/types/api/companies";

export const isErrorResponse = (response: unknown):
  response is ErrorResponse => {
  return (
    typeof response === 'object' &&
    response !== null &&
    'error' in response &&
    typeof response.error === 'string'
  );
}

export const isMissingResponse = (response: unknown)
  : response is MissingResponse => {
  return (
    typeof response === 'object' &&
    response !== null &&
    'message' in response &&
    typeof response.message === 'string'
  );
}

export const isFlowResponse = (response: unknown)
  : response is FlowResponse => {
  return (
    typeof response === 'object' &&
    response !== null &&
    'id' in response &&
    typeof response.id === 'number' &&
    'symbol' in response &&
    typeof response.symbol === 'string' &&
    'state' in response &&
    typeof response.state === 'string'
  );
}

export const isGetCompanyResponse = (response: unknown)
  : response is GetCompanyResponse => {
  return (
    typeof response === 'object' &&
    response !== null &&
    'symbol' in response &&
    typeof response.symbol === 'string' &&
    'name' in response &&
    typeof response.name === 'string' &&
    'country' in response &&
    typeof response.country === 'string' &&
    'currency' in response &&
    typeof response.currency === 'string' &&
    'sector' in response &&
    typeof response.sector === 'string' &&
    'asset_type' in response &&
    typeof response.asset_type === 'string'
  );
}

const isQuote = (response: unknown): response is Quote => {
  return (
    typeof response === 'object' &&
    response !== null &&
    'open' in response &&
    typeof response.open === 'string' && !isNaN(Number(response.open)) &&
    'high' in response &&
    typeof response.high === 'string' && !isNaN(Number(response.high)) &&
    'low' in response &&
    typeof response.low === 'string' && !isNaN(Number(response.low)) &&
    'volume' in response &&
    typeof response.volume === 'number' &&
    'latest_trading_date' in response &&
    typeof response.latest_trading_date === 'string' && Date.parse(response.latest_trading_date) > 0 &&
    'previous_close' in response &&
    typeof response.previous_close === 'string' && !isNaN(Number(response.previous_close)) &&
    'change' in response &&
    typeof response.change === 'string' && !isNaN(Number(response.change)) &&
    'change_percent' in response &&
    typeof response.change_percent === 'string' && !isNaN(Number(response.change_percent))
  );
};

export const isGetCompanyQuoteResponse = (response: unknown)
  : response is GetCompanyQuoteResponse => {
  return (
    typeof response === 'object' &&
    response !== null &&
    'symbol' in response &&
    typeof response.symbol === 'string' &&
    'quote' in response &&
    isQuote(response.quote)
  );
}

const isAcfReport = (data: unknown)
  : data is AcfReport => {
  return (
    typeof data === 'object' &&
    data != null &&
    'operating_cash_flow' in data &&
    typeof data.operating_cash_flow === 'string' &&
    !isNaN(Number(data.operating_cash_flow)) &&
    'depreciation_depletion_and_amortization' in data &&
    typeof data.depreciation_depletion_and_amortization === 'string' &&
    !isNaN(Number(data.depreciation_depletion_and_amortization)) &&
    'capital_expenditures' in data &&
    typeof data.capital_expenditures === 'string' &&
    !isNaN(Number(data.capital_expenditures)) &&
    'change_in_inventory' in data &&
    typeof data.change_in_inventory === 'string' &&
    !isNaN(Number(data.change_in_inventory)) &&
    'reported_currency' in data &&
    typeof data.reported_currency === 'string'
  )
}

export const isGetCompanyAcfReportsResponse = (response: unknown)
  : response is GetCompanyAcfReportsResponse => {
  return (
    typeof response === 'object' &&
    response !== null &&
    'symbol' in response &&
    typeof response.symbol === 'string' &&
    'acf_reports' in response &&
    typeof response.acf_reports === 'object' &&
    response.acf_reports !== null &&
    Object.entries(response.acf_reports).every(([key, value]) =>
      !isNaN(Date.parse(key)) && isAcfReport(value)
    )
  );
}
