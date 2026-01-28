
import FetchCard from "../FetchCard";
import AcfTable from "./AcfTable";
import useCompanyAcfReports from "@/hooks/useCompanyAcfReports";

const AcfReports = ({ ticker }: { ticker: string }) => {
  const { data, loading, error, fetchData } = useCompanyAcfReports(ticker);

  return (
    <FetchCard
      cardTitle="Cash Flow Statements"
      dataPresent={!!data}
      loading={loading}
      error={error}
      fetchData={fetchData}
    >
      <AcfTable acfReports={data} />
    </FetchCard>
  );
};

export default AcfReports;
