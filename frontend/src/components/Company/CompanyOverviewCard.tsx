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
    if (overview) return (
      <CardContent className="text-left">
        <p className="font-medium">Name: {overview.name}</p>
        <p className="font-medium">Sector: {overview.sector}</p>
        <p className="font-medium">Country: {overview.country}</p>
        <p className="font-medium">Currency: {overview.currency}</p>
        <p className="font-medium">Asset Type: {overview.asset_type}</p>
      </CardContent>
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
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Building2 className="h-5 w-5" />
          Overview
          {cardButton()}
        </CardTitle>
      </CardHeader>
      {cardContent()}
    </Card>
  )
}
export default CompanyOverviewCard
