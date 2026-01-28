import useCompanyAcfReports from "./useCompanyAcfReports";
import useCompanyOverview from "./useCompanyOverview";
import useCompanyQuote from "./useCompanyQuote";
import useIncomeStatements from "./useIncomeStatements";

export type Resource = 'overview' | 'quote' | 'acfReports' | 'incomeStatements'

const useResource = (ticker: string, resource: Resource) => {
  // TypeScript ensures only valid resources can be passed
  switch (resource) {
    case "overview":
      return useCompanyOverview(ticker);
    case "quote":
      return useCompanyQuote(ticker);
    case "acfReports":
      return useCompanyAcfReports(ticker);
    case "incomeStatements":
      return useIncomeStatements(ticker);
  }
}

export default useResource;
