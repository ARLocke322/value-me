import useIncomeStatements from "@/hooks/useIncomeStatements"
import { Card, CardHeader, CardTitle, CardContent } from "../ui/card"
import { Loader2, RefreshCw } from "lucide-react"
import { Button } from "../ui/button"

import { AlertCircle } from "lucide-react"
import IncomeStatementTable from "./IncomeStatementTable"

const CompanyIncomeStatementsCard = ({ ticker }: { ticker: string }) => {
  const { incomeStatements, loading, error, fetchIncomeStatements } = useIncomeStatements(ticker)
  return (
    <Card className="w-full">
      <CardHeader className="flex flex-row items-center justify-between gap-4">
        <CardTitle className="text-xl font-semibold">Income Statement</CardTitle>
        <Button
          onClick={fetchIncomeStatements}
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
      </CardHeader>
      <CardContent>
        {error && (
          <div className="flex items-center gap-2 rounded-lg border border-destructive/50 bg-destructive/10 p-4 text-destructive">
            <AlertCircle className="h-5 w-5" />
            <p className="text-sm font-medium">{error.message}</p>
          </div>
        )}

        {!error && !loading && !incomeStatements && (
          <div className="flex flex-col items-center justify-center py-12 text-muted-foreground">
            <p className="text-sm">No income statement data available.</p>
            <p className="text-sm">Click &ldquo;Fetch Data&rdquo; to load the statements.</p>
          </div>
        )}

        {!error && incomeStatements && (
          <div className="overflow-x-auto">
            <IncomeStatementTable incomeStatements={incomeStatements} />
          </div>
        )}
      </CardContent>
    </Card>
  )
}

export default CompanyIncomeStatementsCard
