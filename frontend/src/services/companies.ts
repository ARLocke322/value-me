import type { FlowResponse, GetCompanyAcfReportsResponse, GetCompanyQuoteResponse, GetCompanyResponse } from "@/types/api/companies"
import { FlowResponseSchema, GetCompanyAcfReportsResponseSchema, GetCompanyQuoteResponseSchema, GetCompanyResponseSchema } from "@/types/api/companies"
import * as z from "zod";

const baseUrl = "http://localhost:3000/api/v1"

const getData = async <T>(
  ticker: string, resource: string, method: string, schema: z.ZodType<T>
) => {
  try {
    const res = await fetch(
      `${baseUrl}/companies${resource}?symbol=${ticker}`, {
      method: `${method}`
    });

    if (!res.ok) {
      throw new Error(`HTTP ${res.status}: ${res.statusText}`);
    }

    return schema.parse(await res.json());
  } catch (err) {
    if (err instanceof Error || err instanceof z.ZodError) throw err;
    throw new Error("Network or server error")
  }
}

const getFlowStatus = (ticker: string) =>
  getData<FlowResponse>(
    ticker, "/flow_status", "GET", FlowResponseSchema
  )

const fetchCompany = (ticker: string) =>
  getData<FlowResponse>(
    ticker, "/fetch_company", "POST", FlowResponseSchema
  )

const getCompany = (ticker: string) =>
  getData<GetCompanyResponse>(
    ticker, "", "GET", GetCompanyResponseSchema
  )

const fetchCompanyQuote = (ticker: string) =>
  getData<FlowResponse>(
    ticker, "/fetch_quote", "POST", FlowResponseSchema
  )

const getCompanyQuote = (ticker: string) =>
  getData<GetCompanyQuoteResponse>(
    ticker, "/quote", "GET", GetCompanyQuoteResponseSchema
  )

const fetchCompanyAcfReports = (ticker: string) =>
  getData<FlowResponse>(
    ticker, "/fetch_cash_flows", "POST", FlowResponseSchema
  )

const getCompanyAcfReports = (ticker: string) =>
  getData<GetCompanyAcfReportsResponse>(
    ticker, "/cash_flows", "GET", GetCompanyAcfReportsResponseSchema
  )

const fetchCompanyIncomeStatements = (ticker: string) =>
  getData<FlowResponse>(
    ticker, "/fetch_income_statements", "POST", FlowResponseSchema
  )

const getCompanyIncomeStatements = (ticker: string) =>
  getData<GetCompanyAcfReportsResponse>(
    ticker, "/income_statements", "GET", GetCompanyIncomeStatementsResponseSchema
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
