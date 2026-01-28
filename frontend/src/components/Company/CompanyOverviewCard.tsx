import useCompanyOverview from "@/hooks/useCompanyOverview"
import FetchCard from "./FetchCard"
import CompanyOverviewContent from "./CompanyOverviewContent"


const CompanyOverviewCard = ({ ticker }: { ticker: string }) => {
  const { data, loading, error, fetchData } = useCompanyOverview(ticker)

  return (
    <FetchCard
      cardTitle="Overview"
      dataPresent={!!data}
      loading={loading}
      error={error}
      fetchData={fetchData}
    >
      <CompanyOverviewContent overview={data} />
    </FetchCard>
  );
}
export default CompanyOverviewCard
