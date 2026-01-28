
import { CardHeader, CardTitle } from "../ui/card"
import { ChevronDown, ChevronUp, Loader2, RefreshCw } from "lucide-react"
import { Button } from "../ui/button"


interface DetailCardProps {
  cardTitle: string
  isVisible: boolean
  onToggleVisibility: () => void
  fetchResource: () => void
  loading: boolean
}

const FetchCardHeader = (
  { cardTitle, isVisible, onToggleVisibility, fetchResource, loading }
    : DetailCardProps
) => {
  return (
    <CardHeader className="flex flex-row items-center justify-between gap-4">
      <CardTitle className="text-xl font-semibold">{cardTitle}</CardTitle>
      <div className="flex items-center gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={onToggleVisibility}
        >
          {isVisible ? (
            <>
              <ChevronUp className="mr-2 h-4 w-4" />
              Hide
            </>
          ) : (
            <>
              <ChevronDown className="mr-2 h-4 w-4" />
              Show
            </>
          )}
        </Button>
        <Button
          onClick={fetchResource}
          disabled={loading}
          variant="outline"
          size="sm"
        >
          {loading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Loading...
            </>
          ) : (
            <>
              <RefreshCw className="mr-2 h-4 w-4" />
              Fetch Data
            </>
          )}
        </Button>
      </div>
    </CardHeader>
  )
}

export default FetchCardHeader
