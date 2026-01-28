import { useEffect, useState } from "react"
import companiesService from "@/services/companies"
import type { GetCompanyResponse } from "@/types/api/companies"

const useCompanyOverview = (ticker: string) => {
  const [data, setData] = useState<GetCompanyResponse | null>(null)
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<Error | null>(null)

  const fetchData = () => {
    if (!ticker) return;

    setError(null);
    setLoading(true);

    companiesService.fetchCompany(ticker)
      .then(() => new Promise(resolve => setTimeout(resolve, 3500)))
      .then(() => companiesService.getCompany(ticker))
      .then(setData)
      .catch(setError)
      .finally(() => setLoading(false))
  }

  useEffect(() => {
    if (!ticker) return;

    setError(null);
    setLoading(true);

    companiesService.getCompany(ticker)
      .then(setData)
      .catch(setError)
      .finally(() => setLoading(false))
  }, [ticker])

  return { data, loading, error, fetchData }
}

export default useCompanyOverview
