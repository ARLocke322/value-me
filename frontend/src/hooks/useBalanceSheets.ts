import { useEffect, useState } from "react"
import companiesService from "@/services/companies"
import type { BalanceSheet } from "@/types/api/companies"

const useBalanceSheets = (ticker: string) => {
  const [data, setData] = useState<
    Array<BalanceSheet> | null
  >(null)

  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<Error | null>(null)

  const fetchData = () => {
    if (!ticker) return;

    setError(null);
    setLoading(true);

    companiesService.fetchBalanceSheets(ticker)
      .then(() => new Promise(resolve => setTimeout(resolve, 3500)))
      .then(() => companiesService.getBalanceSheets(ticker))
      .then((res) => setData(res.balance_sheets))
      .catch(setError)
      .finally(() => setLoading(false))
  }

  useEffect(() => {
    if (!ticker) return;

    setError(null);
    setLoading(true);

    companiesService.getBalanceSheets(ticker)
      .then((res) => setData(res.balance_sheets))
      .catch(setError)
      .finally(() => setLoading(false))
  }, [ticker])

  return { data, loading, error, fetchData }
}

export default useBalanceSheets
