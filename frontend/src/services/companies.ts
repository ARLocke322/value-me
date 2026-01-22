import type { ErrorResponse, FlowResponse, GetCompanyQuoteResponse, GetCompanyResponse } from "@/types/api/companies"
import { isErrorResponse, isFlowResponse, isGetCompanyQuoteResponse, isGetCompanyResponse } from "@/utils/assertions";

const baseUrl = "http://localhost:3000/api/v1"

const getData = async <dataType>(
  ticker: string, resource: string,
  isDataType: (response: unknown) => response is dataType
) => {
  try {
    const res = await fetch(
      `${baseUrl}/companies${resource}?symbol=${ticker}`, {
      method: "GET"
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
  getData<FlowResponse>(ticker, "/flow_status", isFlowResponse)

const fetchCompany = (ticker: string) =>
  getData<FlowResponse>(ticker, "/fetch_company", isFlowResponse)

const getCompany = (ticker: string) =>
  getData<GetCompanyResponse>(ticker, "", isGetCompanyResponse)

const fetchCompanyQuote = (ticker: string) =>
  getData<FlowResponse>(ticker, "/fetch_quote", isFlowResponse)

const getCompanyQuote = (ticker: string) =>
  getData<GetCompanyQuoteResponse>(ticker, "/quote", isGetCompanyQuoteResponse)


export default {
  fetchCompany,
  getFlowStatus,
  getCompany,
  fetchCompanyQuote,
  getCompanyQuote,
}
