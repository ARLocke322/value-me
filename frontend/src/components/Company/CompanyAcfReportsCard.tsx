import useCompanyAcfReports from "@/hooks/useCompanyAcfReports"
import { Card, CardHeader, CardTitle, CardContent } from "../ui/card"
import { CircleDollarSign, Eye } from "lucide-react"
import { Button } from "../ui/button"

import { Skeleton } from "@/components/ui/skeleton"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { AlertCircle } from "lucide-react"
import AcfTable from "./AcfTable"
import { useState } from "react"

const CompanyAcfReportsCard = ({ ticker }: { ticker: string }) => {
  const { acfReports, loading, error, fetchAcfReports } = useCompanyAcfReports(ticker)
  const [tableVisible, setTableVisible] = useState<boolean>(false)

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
      <Button
        variant="secondary"
        className="w-full"
        onClick={() => setTableVisible(true)}
      >
        <Eye className="h-4 w-4" />
      </Button>
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
    <div>
      <Card className="flex min-w-80">
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
      <div>
        {(tableVisible && acfReports) && (
          <>
            <div
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
              onClick={() => setTableVisible(false)}
            />
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4" onClick={() => setTableVisible(false)}>
              <Card className="w-full max-w-210" onClick={(e) => e.stopPropagation()}>
                <AcfTable acfReports={acfReports} />
              </Card>
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export default CompanyAcfReportsCard
