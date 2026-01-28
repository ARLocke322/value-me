import { useEffect, useState } from "react"
import companiesService from "@/services/companies"
import type { IncomeStatement } from "@/types/api/companies"

const useIncomeStatements = (ticker: string) => {
  const [data, setData] = useState<
    Array<IncomeStatement> | null
  >(null)

  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<Error | null>(null)

  const fetchData = () => {
    if (!ticker) return;

    setError(null);
    setLoading(true);

    companiesService.fetchIncomeStatements(ticker)
      .then(() => new Promise(resolve => setTimeout(resolve, 3500)))
      .then(() => companiesService.getIncomeStatements(ticker))
      .then((res) => setData(res.income_statements))
      .catch(setError)
      .finally(() => setLoading(false))
  }

  useEffect(() => {
    if (!ticker) return;

    setError(null);
    setLoading(true);

    companiesService.getIncomeStatements(ticker)
      .then((res) => setData(res.income_statements))
      .catch(setError)
      .finally(() => setLoading(false))
  }, [ticker])

  return { data, loading, error, fetchData }
}

export default useIncomeStatements
