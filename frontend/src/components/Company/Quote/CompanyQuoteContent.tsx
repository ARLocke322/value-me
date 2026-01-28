import type { Quote } from "@/types/api/companies"

const CompanyQuoteContent = ({ quote }: { quote: Quote | null }) => {
  if (!quote) return null;
  return (
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

}

export default CompanyQuoteContent;
