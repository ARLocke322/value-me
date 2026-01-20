import type { ErrorResponse, FetchCompanyResponse, GetCompanyQuoteResponse, GetCompanyResponse, GetFlowStatusResponse } from "@/types/api/companies"
import { isErrorResponse, isFetchCompanyResponse, isGetCompanyQuoteResponse, isGetCompanyResponse } from "@/utils/assertions";

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


    if (!res.ok) {
      throw new Error(`HTTP ${res.status}: ${res.statusText}`);
    }

    if (isErrorResponse(data)) {
      throw new Error(data.error || "API returned an error");
    }

    if (isFetchCompanyResponse(data)) {
      return data;
    }

    throw new Error("Invalid data received from server")
  } catch {
    throw new Error("Network or server error")
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
    });

    if (!res.ok) {
      throw new Error(`HTTP ${res.status}: ${res.statusText}`);
    }

    const data: GetCompanyResponse | ErrorResponse = await res.json();

    if (isErrorResponse(data)) {
      throw new Error(data.error || "API returned an error");
    }

    if (isGetCompanyResponse(data)) {
      return data;
    }

    throw new Error("Invalid data received from server")
  } catch (err) {
    if (err instanceof Error) throw err;
    throw new Error("Network or server error")
  }
}

const getCompanyQuote = async (ticker: string) => {
  try {
    const res = await fetch(
      `${baseUrl}/companies/quote?symbol=${ticker}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    });

    if (!res.ok) {
      return {
        error: `HTTP ${res.status}: ${res.statusText}`
      } as ErrorResponse;
    }

    const data: GetCompanyQuoteResponse | ErrorResponse = await res.json();

    if (isErrorResponse(data)) {
      return data;
    }

    if (isGetCompanyQuoteResponse(data)) {
      return data;
    }

    return { error: "Invalid data received from server" } as ErrorResponse
  } catch {
    return { error: "Network or server error" } as ErrorResponse;
  }
}

const getCompanyCashFlows = (ticker: string) => { }

export default {
  fetchCompany,
  getFlowStatus,
  getCompany,
  getCompanyQuote,
  getCompanyCashFlows
}
