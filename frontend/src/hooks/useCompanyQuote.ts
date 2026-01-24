import type { Quote } from "@/types/api/companies"
import { useEffect, useState } from "react"
import companiesService from "@/services/companies"

const useCompanyQuote = (ticker: string) => {
  const [quote, setQuote] = useState<Quote | null>(null)
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<Error | null>(null)

  const fetchQuote = () => {
    if (!ticker) return;

    setError(null)
    setLoading(true);

    companiesService.fetchCompanyQuote(ticker)
      .then(() => new Promise(resolve => setTimeout(resolve, 300)))
      .then(() => companiesService.getCompanyQuote(ticker))
      .then((res) => setQuote(res.quote))
      .catch(setError)
      .finally(() => setLoading(false))
  }

  useEffect(() => {
    if (!ticker) return;

    setError(null)
    setLoading(true);

    companiesService.getCompanyQuote(ticker)
      .then((res) => setQuote(res.quote))
      .catch(setError)
      .finally(() => setLoading(false))
  }, [ticker]);

  return { quote, loading, error, fetchQuote }
}

export default useCompanyQuote
