

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Ellipsis } from "lucide-react"


const FlowStatusCard = ({ flowStatus }: { flowStatus: string | null }) => {
  return (
    <div>
      {flowStatus && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Ellipsis />
              Status: {flowStatus}
            </CardTitle>
          </CardHeader>
        </Card>
      )}
    </div>
  )
}
export default FlowStatusCard
