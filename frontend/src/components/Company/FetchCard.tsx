import { useState } from "react"
import { Card, CardContent } from "../ui/card"
import FetchCardHeader from "./FetchCardHeader"
import { AlertCircle } from "lucide-react"

interface FetchCardProps {
  children: React.ReactNode,
  dataPresent: boolean,
  cardTitle: string,
  loading: boolean,
  error: Error | null,
  fetchData: () => void,

}
const FetchCard = (
  { children, cardTitle, dataPresent, loading, error, fetchData }
    : FetchCardProps
) => {
  const [isVisible, setIsVisible] = useState(true)
  const onToggleVisibility = () => setIsVisible(!isVisible)

  return (
    <Card className="w-full">
      <FetchCardHeader
        cardTitle={cardTitle}
        isVisible={isVisible}
        onToggleVisibility={onToggleVisibility}
        fetchResource={fetchData}
        loading={loading}
      />
      <CardContent>
        {isVisible && (
          <>
            {error && (
              <div className="flex items-center gap-2 rounded-lg border border-destructive/50 bg-destructive/10 p-4 text-destructive">
                <AlertCircle className="h-5 w-5" />
                <p className="text-sm font-medium">{error.message}</p>
              </div>
            )}

            {!error && !loading && !dataPresent && (
              <div className="flex flex-col items-center justify-center py-12 text-muted-foreground">
                <p className="text-sm">No data available.</p>
                <p className="text-sm">Click &ldquo;Fetch Data&rdquo; to load.</p>
              </div>
            )}

            {!error && dataPresent && (
              <div className="overflow-x-auto">
                {children}
              </div>
            )}
          </>
        )}
      </CardContent>
    </Card>
  )
}

export default FetchCard
