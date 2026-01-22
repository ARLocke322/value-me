import { Button } from "../ui/button"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { AlertCircle, ChartCandlestick } from "lucide-react"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import useCompanyquote from "@/hooks/useCompanyQuote"


const CompanyQuoteCard = ({ ticker }: { ticker: string }) => {
  const { quote, loading, error, fetchQuote } = useCompanyquote(ticker)

  const cardContent = () => {
    if (error && error.message !== "HTTP 404: Not Found") return (
      <Alert variant="destructive" className="mb-4">
        <AlertCircle className="h-4 w-4" />
        <AlertDescription>{error.message}</AlertDescription>
      </Alert>
    )
    if (loading) return (
      <Skeleton className="h-6 w-48" />
    )
    if (quote) return (
      <div className="space-y-3 text-sm">
        <div className="flex justify-between border-b pb-2">
          <span className="text-muted-foreground">Open:</span>
          <span className="font-semibold">${Number(quote.open).toLocaleString()}</span>
        </div>
        <div className="flex justify-between border-b pb-2">
          <span className="text-muted-foreground">Low:</span>
          <span className="font-semibold">${Number(quote.low).toLocaleString()}</span>
        </div>
        <div className="flex justify-between border-b pb-2">
          <span className="text-muted-foreground">Volume:</span>
          <span className="font-semibold">${Number(quote.volume).toLocaleString()}</span>
        </div>
        <div className="flex justify-between border-b pb-2">
          <span className="text-muted-foreground">Latest Trading Date:</span>
          <span className="font-semibold">{quote.latest_trading_date.toString()}</span>
        </div>
        <div className="flex justify-between border-b pb-2">
          <span className="text-muted-foreground">Previous Close:</span>
          <span className="font-semibold">${Number(quote.previous_close).toLocaleString()}</span>
        </div>
        <div className="flex justify-between border-b pb-2">
          <span className="text-muted-foreground">Change:</span>
          <span className="font-semibold">${Number(quote.change).toLocaleString()}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-muted-foreground">Change (percent):</span>
          <span className="font-semibold">{quote.change_percent}%</span>
        </div>
      </div>
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
    <Card className="min-w-80 ">
      <CardHeader>
        <CardTitle className="flex justify-center items-center gap-2">
          <ChartCandlestick className="h-5 w-5" />
          Company quote
          {cardButton()}

        </CardTitle>
      </CardHeader>
      <CardContent>
        {cardContent()}
      </CardContent>
    </Card>
  )
}
export default CompanyQuoteCard
