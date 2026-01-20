import {
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Search } from "lucide-react"

const TickerFormHeader = () =>
  <CardHeader className="text-center">
    <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
      <Search className="h-6 w-6 text-primary" />
    </div>
    <CardTitle className="text-xl">Company Financial Analysis</CardTitle>
    <CardDescription>
      Enter a stock ticker symbol to analyze company financials
    </CardDescription>
  </CardHeader>

export default TickerFormHeader
