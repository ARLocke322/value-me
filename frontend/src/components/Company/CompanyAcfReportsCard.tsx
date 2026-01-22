import useCompanyAcfReports from "@/hooks/useCompanyAcfReports"
import { Card, CardHeader, CardTitle, CardContent } from "../ui/card"
import { CircleDollarSign } from "lucide-react"
import { Button } from "../ui/button"

import { Skeleton } from "@/components/ui/skeleton"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { AlertCircle } from "lucide-react"
import AcfTable from "./AcfTable"

const CompanyAcfReportsCard = ({ ticker }: { ticker: string }) => {
  const { acfReports, loading, error, fetchAcfReports } = useCompanyAcfReports(ticker)

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
    if (acfReports) return (
      <AcfTable acfReports={acfReports} />
    )

    return null
  }
  const cardButton = () => {
    if (loading) return <Button disabled>Fetching</Button>
    if ((error && error.message !== "HTTP 404: Not Found") || acfReports)
      return <Button onClick={fetchAcfReports}>Refetch</Button>
    return <Button onClick={fetchAcfReports}>Fetch</Button>
  }

  return (
    <Card className="flex w-210">
      <CardHeader>
        <CardTitle className="flex justify-center items-center gap-2">
          <CircleDollarSign className="h-5 w-5" />
          Cash Flows
          {cardButton()}
        </CardTitle>
      </CardHeader>
      <CardContent className="flex justify-center">
        {cardContent()}
      </CardContent>
    </Card>
  )
}

export default CompanyAcfReportsCard
