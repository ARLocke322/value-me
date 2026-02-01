import useBalanceSheets from "@/hooks/useBalanceSheets";
import FetchCard from "../FetchCard";
import BalanceSheetTable from "./BalanceSheetTable";

const BalanceSheets = ({ ticker }: { ticker: string }) => {
  const { data, loading, error, fetchData } = useBalanceSheets(ticker);

  return (
    <FetchCard
      cardTitle="Balance Sheets"
      dataPresent={!!data}
      loading={loading}
      error={error}
      fetchData={fetchData}
    >
      <BalanceSheetTable balanceSheets={data} />
    </FetchCard>
  );
};

export default BalanceSheets;
