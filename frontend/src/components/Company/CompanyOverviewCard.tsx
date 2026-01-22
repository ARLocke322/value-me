import { Button } from "../ui/button"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { AlertCircle } from "lucide-react"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { Building2 } from "lucide-react"
import useCompanyOverview from "@/hooks/useCompanyOverview"


const CompanyOverviewCard = ({ ticker }: { ticker: string }) => {
  const { overview, loading, error, fetchCompany } = useCompanyOverview(ticker)

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
    if (overview) return (
      <div className="space-y-3 text-sm">
        <div className="flex justify-between border-b pb-2">
          <span className="text-muted-foreground">Name:</span>
          <span className="font-semibold">{overview.name}</span>
        </div>
        <div className="flex justify-between border-b pb-2">
          <span className="text-muted-foreground">Sector:</span>
          <span className="font-semibold">{overview.sector}</span>
        </div>
        <div className="flex justify-between border-b pb-2">
          <span className="text-muted-foreground">Country:</span>
          <span className="font-semibold">{overview.country}</span>
        </div>
        <div className="flex justify-between border-b pb-2">
          <span className="text-muted-foreground">Currency:</span>
          <span className="font-semibold">{overview.currency}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-muted-foreground">Asset Type:</span>
          <span className="font-semibold">{overview.asset_type}</span>
        </div>
      </div>
    )
    return null
  }

  const cardButton = () => {
    if (loading) return <Button disabled>Fetching</Button>
    if ((error && error.message !== "HTTP 404: Not Found") || overview)
      return <Button onClick={fetchCompany}>Refetch</Button>
    return <Button onClick={fetchCompany}>Fetch</Button>
  }

  return (
    <Card className="min-w-80 ">
      <CardHeader>
        <CardTitle className="flex justify-center items-center gap-2">
          <Building2 className="h-5 w-5" />
          Overview
          {cardButton()}
        </CardTitle>
      </CardHeader>
      <CardContent>
        {cardContent()}
      </CardContent>
    </Card>
  )
}
export default CompanyOverviewCard
