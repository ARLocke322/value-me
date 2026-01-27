import * as z from "zod";

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

export const FlowResponseSchema = z.object({
  id: z.coerce.number(),
  symbol: z.string(),
  state: z.string()
});


export const GetCompanyResponseSchema = z.object({
  symbol: z.string(),
  name: z.string(),
  country: z.string(),
  currency: z.string(),
  sector: z.string(),
  asset_type: z.string(),
});

export const GetCompanyQuoteResponseSchema = z.object({
  symbol: z.string(),
  quote: z.object({
    high: z.coerce.number(),
    open: z.coerce.number(),
    low: z.coerce.number(),
    volume: z.coerce.number(),
    latest_trading_date: z.string().date(),
    previous_close: z.coerce.number(),
    change: z.coerce.number(),
    change_percent: z.coerce.number(),
  }),
});

export const GetCompanyAcfReportsResponseSchema = z.object({
  symbol: z.string(),
  acf_reports: z.record(
    z.string(),
    z.object({
      operating_cash_flow: z.coerce.number(),
      depreciation_depletion_and_amortization: z.coerce.number(),
      capital_expenditures: z.coerce.number(),
      change_in_inventory: z.coerce.number(),
      reported_currency: z.string(),
    }),
  )
});

export const IncomeStatementsResponseSchema = z.object({
  symbol: z.string(),
  income_statements: z.array(
    z.object({
      fiscal_date_ending: z.string(),
      reported_currency: z.string(),
      gross_profit: z.coerce.number(),
      total_revenue: z.coerce.number(),
      cost_of_revenue: z.coerce.number(),
      cost_of_goods_and_services_sold: z.coerce.number(),
      operating_income: z.coerce.number(),
      selling_general_and_administrative: z.coerce.number(),
      research_and_development: z.coerce.number(),
      operating_expenses: z.coerce.number(),
      investment_income_net: z.coerce.number(),
      net_interest_income: z.coerce.number(),
      interest_income: z.coerce.number(),
      interest_expense: z.coerce.number(),
      non_interest_income: z.coerce.number(),
      other_non_operating_income: z.coerce.number(),
      depreciation: z.coerce.number(),
      depreciation_and_amortization: z.coerce.number(),
      income_before_tax: z.coerce.number(),
      income_tax_expense: z.coerce.number(),
      interest_and_debt_expense: z.coerce.number(),
      net_income_from_continuing_operations: z.coerce.number(),
      comprehensive_income_net_of_tax: z.coerce.number(),
      ebit: z.coerce.number(),
      ebitda: z.coerce.number(),
      net_income: z.coerce.number(),
    })
  )
});

export type FlowResponse = z.infer<typeof FlowResponseSchema>;

export type GetCompanyResponse = z.infer<typeof GetCompanyResponseSchema>;

export type GetCompanyQuoteResponse = z.infer<
  typeof GetCompanyQuoteResponseSchema
>;
export type Quote = GetCompanyQuoteResponse['quote'];

export type GetCompanyAcfReportsResponse = z.infer<
  typeof GetCompanyAcfReportsResponseSchema
>;
export type AcfReport = GetCompanyAcfReportsResponse['acf_reports'][string];

export type IncomeStatementsResponse = z.infer<
  typeof IncomeStatementsResponseSchema
>;
export type IncomeStatement =
  IncomeStatementsResponse['income_statements'][number];
