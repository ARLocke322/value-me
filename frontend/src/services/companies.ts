import type { ErrorResponse, FetchCompanyResponse, GetCompanyResponse, GetFlowStatusResponse } from "@/types/api/companies"
import { isErrorResponse } from "@/utils/assertions";

const baseUrl = "http://localhost:3000/api/v1"

const fetchCompany = async (ticker: string) => {
  try {
    const res = await fetch(
      `${baseUrl}/companies/fetch_company?symbol=${ticker}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      }
    });

    const data: FetchCompanyResponse | ErrorResponse = await res.json();

    if (isErrorResponse(data)) {
      return { error: data.error }
    }

    return { symbol: data.symbol, state: data.state }
  } catch {
    return { error: "Network or server error" }
  }
}

const getFlowStatus = async (ticker: string) => {
  try {
    const res = await fetch(
      `${baseUrl}/companies/flow_status?symbol=${ticker}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    });

    const data: GetFlowStatusResponse | ErrorResponse = await res.json();

    if (isErrorResponse(data)) {
      return { error: data.error }
    }

    return { symbol: data.symbol, state: data.state }
  } catch {
    return { error: "Network or server error" }
  }
}

const getCompany = async (ticker: string) => {
  try {
    const res = await fetch(
      `${baseUrl}/companies?symbol=${ticker}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    });

    const data: GetCompanyResponse | ErrorResponse = await res.json();

    if (isErrorResponse(data)) {
      return { error: data.error }
    }

    return {
      symbol: data.symbol,
      name: data.name,
      country: data.country,
      currency: data.currency,
      sector: data.sector,
      asset_type: data.asset_type,
    }
  } catch {
    return { error: "Network or server error" }
  }
}

const getCompanyQuote = (ticker: string) => { }

const getCompanyCashFlows = (ticker: string) => { }

export default {
  fetchCompany,
  getFlowStatus,
  getCompany,
  getCompanyQuote,
  getCompanyCashFlows
}
