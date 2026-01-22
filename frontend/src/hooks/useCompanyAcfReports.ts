
import { useEffect, useState } from "react"
import companiesService from "@/services/companies"
import type { AcfReport } from "@/types/api/companies"

const useCompanyAcfReports = (ticker: string) => {
  const [acfReports, setAcfReports] = useState<Record<number, AcfReport> | null>(null)
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<Error | null>(null)

  const fetchAcfReports = () => {
    if (!ticker) return;

    setError(null);
    setLoading(true);

    companiesService.fetchCompanyAcfReports(ticker)
      .then(() => new Promise(resolve => setTimeout(resolve, 5000)))
      .then(() => companiesService.getCompanyAcfReports(ticker))
      .then((res) => setAcfReports(res.acf_reports))
      .catch(setError)
      .finally(() => setLoading(false))
  }

  useEffect(() => {
    if (!ticker) return;

    setError(null);
    setLoading(true);

    companiesService.getCompanyAcfReports(ticker)
      .then((res) => setAcfReports(res.acf_reports))
      .catch(setError)
      .finally(() => setLoading(false))
  }, [ticker])

  return { acfReports, loading, error, fetchAcfReports }
}

export default useCompanyAcfReports
