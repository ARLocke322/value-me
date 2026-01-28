import FetchCard from "../FetchCard"
import useCompanyQuote from "@/hooks/useCompanyQuote"
import CompanyQuoteContent from "./CompanyQuoteContent"


const Quote = ({ ticker }: { ticker: string }) => {
  const { data, loading, error, fetchData } = useCompanyQuote(ticker)

  return (
    <FetchCard
      cardTitle="Quote"
      dataPresent={!!data}
      loading={loading}
      error={error}
      fetchData={fetchData}
    >
      <CompanyQuoteContent quote={data} />
    </FetchCard>
  );
}
export default Quote;
