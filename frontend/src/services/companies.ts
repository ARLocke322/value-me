import type { ErrorResponse, FlowResponse, GetCompanyAcfReportsResponse, GetCompanyQuoteResponse, GetCompanyResponse } from "@/types/api/companies"
import { isErrorResponse, isFlowResponse, isGetCompanyAcfReportsResponse, isGetCompanyQuoteResponse, isGetCompanyResponse } from "@/utils/assertions";

const baseUrl = "http://localhost:3000/api/v1"

const getData = async <dataType>(
  ticker: string, resource: string, method: string,
  isDataType: (response: unknown) => response is dataType
) => {
  try {
    const res = await fetch(
      `${baseUrl}/companies${resource}?symbol=${ticker}`, {
      method: `${method}`
    });

    if (!res.ok) {
      throw new Error(`HTTP ${res.status}: ${res.statusText}`);
    }

    const data: dataType | ErrorResponse = await res.json();

    if (isErrorResponse(data)) throw new Error(data.error || "API returned an error");
    if (isDataType(data)) return data;

    throw new Error("Invalid data received from server")
  } catch (err) {
    if (err instanceof Error) throw err;
    throw new Error("Network or server error")
  }
}

const getFlowStatus = (ticker: string) =>
  getData<FlowResponse>(
    ticker, "/flow_status", "GET", isFlowResponse
  )

const fetchCompany = (ticker: string) =>
  getData<FlowResponse>(
    ticker, "/fetch_company", "POST", isFlowResponse
  )

const getCompany = (ticker: string) =>
  getData<GetCompanyResponse>(
    ticker, "", "GET", isGetCompanyResponse
  )

const fetchCompanyQuote = (ticker: string) =>
  getData<FlowResponse>(
    ticker, "/fetch_quote", "POST", isFlowResponse
  )

const getCompanyQuote = (ticker: string) =>
  getData<GetCompanyQuoteResponse>(
    ticker, "/quote", "GET", isGetCompanyQuoteResponse
  )

const fetchCompanyAcfReports = (ticker: string) =>
  getData<FlowResponse>(
    ticker, "/fetch_cash_flows", "POST", isFlowResponse
  )

const getCompanyAcfReports = (ticker: string) =>
  getData<GetCompanyAcfReportsResponse>(
    ticker, "/cash_flows", "GET", isGetCompanyAcfReportsResponse
  )


export default {
  fetchCompany,
  getFlowStatus,
  getCompany,
  fetchCompanyQuote,
  getCompanyQuote,
  fetchCompanyAcfReports,
  getCompanyAcfReports
}
