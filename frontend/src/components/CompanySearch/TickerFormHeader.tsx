import {
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { TrendingUp } from "lucide-react"

const TickerFormHeader = () =>
  <CardHeader>
    <TrendingUp className="h-6 w-6 text-primary" />
    <CardTitle>Company Financial Analysis</CardTitle>
    <CardDescription>
      Enter a stock ticker symbol to analyze company financials
    </CardDescription>
  </CardHeader>

export default TickerFormHeader
