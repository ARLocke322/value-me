import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import type { IncomeStatement } from "@/types/api/companies"

const fieldLabels: { key: keyof Omit<IncomeStatement, "fiscal_date_ending" | "reported_currency">; label: string; isSubtotal?: boolean }[] = [
  { key: "total_revenue", label: "Total Revenue", isSubtotal: true },
  { key: "cost_of_revenue", label: "Cost of Revenue" },
  { key: "cost_of_goods_and_services_sold", label: "Cost of Goods & Services Sold" },
  { key: "gross_profit", label: "Gross Profit", isSubtotal: true },
  { key: "operating_expenses", label: "Operating Expenses" },
  { key: "selling_general_and_administrative", label: "Selling, General & Administrative" },
  { key: "research_and_development", label: "Research & Development" },
  { key: "depreciation", label: "Depreciation" },
  { key: "depreciation_and_amortization", label: "Depreciation & Amortization" },
  { key: "operating_income", label: "Operating Income", isSubtotal: true },
  { key: "interest_income", label: "Interest Income" },
  { key: "interest_expense", label: "Interest Expense" },
  { key: "net_interest_income", label: "Net Interest Income" },
  { key: "investment_income_net", label: "Investment Income (Net)" },
  { key: "non_interest_income", label: "Non-Interest Income" },
  { key: "other_non_operating_income", label: "Other Non-Operating Income" },
  { key: "interest_and_debt_expense", label: "Interest & Debt Expense" },
  { key: "income_before_tax", label: "Income Before Tax", isSubtotal: true },
  { key: "income_tax_expense", label: "Income Tax Expense" },
  { key: "net_income_from_continuing_operations", label: "Net Income from Continuing Ops" },
  { key: "comprehensive_income_net_of_tax", label: "Comprehensive Income (Net of Tax)" },
  { key: "net_income", label: "Net Income", isSubtotal: true },
  { key: "ebit", label: "EBIT" },
  { key: "ebitda", label: "EBITDA" },
]

function formatCurrency(value: number, currency: string = "USD"): string {
  if (value === 0 || isNaN(value)) return "-"

  const absValue = Math.abs(value)
  let formattedValue: string
  let suffix: string = ""

  if (absValue >= 1_000_000_000) {
    formattedValue = (value / 1_000_000_000).toFixed(2)
    suffix = "B"
  } else if (absValue >= 1_000_000) {
    formattedValue = (value / 1_000_000).toFixed(2)
    suffix = "M"
  } else if (absValue >= 1_000) {
    formattedValue = (value / 1_000).toFixed(2)
    suffix = "K"
  } else {
    formattedValue = value.toFixed(2)
  }

  const currencySymbol = currency === "USD" ? "$" : currency
  return `${currencySymbol}${formattedValue}${suffix}`
}

function formatYear(dateString: string): string {
  return new Date(dateString).getFullYear().toString()
}

const IncomeStatementTable = ({
  incomeStatements,
}: { incomeStatements: IncomeStatement[] | null }) => {
  const sortedStatements = incomeStatements
    ? [...incomeStatements].sort(
      (a, b) => new Date(b.fiscal_date_ending).getTime() - new Date(a.fiscal_date_ending).getTime()
    )
    : []

  if (!incomeStatements) return null;

  return (
    <Table>
      <TableHeader>
        <TableRow className="hover:bg-transparent">
          <TableHead className="sticky left-0 z-10 min-w-[250px] bg-background font-semibold">
            Line Item
          </TableHead>
          {sortedStatements.map((statement) => (
            <TableHead
              key={statement.fiscal_date_ending}
              className="min-w-[120px] text-right font-semibold"
            >
              <div>{formatYear(statement.fiscal_date_ending)}</div>
              <div className="text-xs font-normal text-muted-foreground">
                {statement.reported_currency}
              </div>
            </TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {fieldLabels.map(({ key, label, isSubtotal }) => (
          <TableRow
            key={key}
            className={isSubtotal ? "bg-muted/50 font-medium" : ""}
          >
            <TableCell
              className={`sticky left-0 z-10 ${isSubtotal
                ? "bg-muted font-semibold"
                : "bg-background pl-6"
                }`}
            >
              {label}
            </TableCell>
            {sortedStatements.map((statement) => {
              const value = statement[key]
              const isNegative = value < 0
              return (
                <TableCell
                  key={`${statement.fiscal_date_ending}-${key}`}
                  className={`text-right tabular-nums ${isSubtotal ? "bg-muted/50" : ""
                    } ${isNegative ? "text-destructive" : ""}`}
                >
                  {formatCurrency(value, statement.reported_currency)}
                </TableCell>
              )
            })}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}

export default IncomeStatementTable
