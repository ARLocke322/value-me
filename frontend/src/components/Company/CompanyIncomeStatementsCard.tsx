import useIncomeStatements from "@/hooks/useIncomeStatements";
import FetchCard from "./FetchCard";
import IncomeStatementTable from "./IncomeStatementTable";

const CompanyIncomeStatementsCard = ({ ticker }: { ticker: string }) => {
  const { data, loading, error, fetchData } = useIncomeStatements(ticker);

  return (
    <FetchCard
      cardTitle="Income Statements"
      dataPresent={!!data}
      loading={loading}
      error={error}
      fetchData={fetchData}
    >
      <IncomeStatementTable incomeStatements={data} />
    </FetchCard>
  );
};

export default CompanyIncomeStatementsCard;
