import { Button } from "../ui/button"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { AlertCircle, CircleDollarSign } from "lucide-react"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import useCompanyquote from "@/hooks/useCompanyQuote"


const CompanyQuoteCard = ({ ticker }: { ticker: string }) => {
  const { quote, loading, error, fetchQuote } = useCompanyquote(ticker)

  const cardContent = () => {
    if (error && error.message !== "HTTP 404: Not Found") return (
      <CardContent>
        <Alert variant="destructive" className="mb-4">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error.message}</AlertDescription>
        </Alert>
      </CardContent>
    )
    if (loading) return (
      <CardContent>
        <Skeleton className="h-6 w-48" />
      </CardContent>
    )
    if (quote) return (
      <CardContent className="text-left">
        <p className="font-medium">Open: {quote.open}</p>
        <p className="font-medium">Low: {quote.low}</p>
        <p className="font-medium">Volume: {quote.volume}</p>
        <p className="font-medium">Latest Trading Date: {quote.latest_trading_date.toString()}</p>
        <p className="font-medium">Previous Close: {quote.previous_close}</p>
        <p className="font-medium">Change: {quote.change}</p>
        <p className="font-medium">Change (percent): {quote.change_percent}</p>
      </CardContent>
    )
    return null
  }

  const cardButton = () => {
    if (loading) return <Button disabled>Fetching</Button>
    if ((error && error.message !== "HTTP 404: Not Found") || quote)
      return <Button onClick={fetchQuote}>Refetch</Button>
    return <Button onClick={fetchQuote}>Fetch</Button>
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <CircleDollarSign className="h-5 w-5" />
          Company quote
          {cardButton()}

        </CardTitle>
      </CardHeader>
      {cardContent()}
    </Card>
  )
}
export default CompanyQuoteCard
