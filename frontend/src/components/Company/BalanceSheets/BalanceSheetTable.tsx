import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import type { BalanceSheet } from "@/types/api/companies"

const fieldLabels: { key: keyof Omit<BalanceSheet, "fiscal_date_ending" | "reported_currency">; label: string; isSubtotal?: boolean; isSectionHeader?: boolean }[] = [
  // Assets Section
  { key: "total_assets", label: "Total Assets", isSectionHeader: true },

  // Current Assets
  { key: "total_current_assets", label: "Total Current Assets", isSubtotal: true },
  { key: "cash_and_cash_equivalents_at_carrying_value", label: "Cash & Cash Equivalents" },
  { key: "cash_and_short_term_investments", label: "Cash & Short-Term Investments" },
  { key: "short_term_investments", label: "Short-Term Investments" },
  { key: "current_net_receivables", label: "Net Receivables" },
  { key: "inventory", label: "Inventory" },
  { key: "other_current_assets", label: "Other Current Assets" },

  // Non-Current Assets
  { key: "total_non_current_assets", label: "Total Non-Current Assets", isSubtotal: true },
  { key: "property_plant_equipment", label: "Property, Plant & Equipment" },
  { key: "accumulated_depreciation_amortization_ppe", label: "Accumulated Depreciation" },
  { key: "intangible_assets", label: "Intangible Assets" },
  { key: "intangible_assets_excluding_goodwill", label: "Intangible Assets (excl. Goodwill)" },
  { key: "goodwill", label: "Goodwill" },
  { key: "investments", label: "Investments" },
  { key: "long_term_investments", label: "Long-Term Investments" },
  { key: "other_non_current_assets", label: "Other Non-Current Assets" },

  // Liabilities Section
  { key: "total_liabilities", label: "Total Liabilities", isSectionHeader: true },

  // Current Liabilities
  { key: "total_current_liabilities", label: "Total Current Liabilities", isSubtotal: true },
  { key: "current_accounts_payable", label: "Accounts Payable" },
  { key: "deferred_revenue", label: "Deferred Revenue" },
  { key: "current_debt", label: "Current Debt" },
  { key: "short_term_debt", label: "Short-Term Debt" },
  { key: "current_long_term_debt", label: "Current Long-Term Debt" },
  { key: "other_current_liabilities", label: "Other Current Liabilities" },

  // Non-Current Liabilities
  { key: "total_non_current_liabilities", label: "Total Non-Current Liabilities", isSubtotal: true },
  { key: "long_term_debt", label: "Long-Term Debt" },
  { key: "long_term_debt_noncurrent", label: "Long-Term Debt (Non-Current)" },
  { key: "short_long_term_debt_total", label: "Total Debt" },
  { key: "capital_lease_obligations", label: "Capital Lease Obligations" },
  { key: "other_non_current_liabilities", label: "Other Non-Current Liabilities" },

  // Shareholders' Equity
  { key: "total_shareholder_equity", label: "Total Shareholders' Equity", isSectionHeader: true },
  { key: "common_stock", label: "Common Stock" },
  { key: "retained_earnings", label: "Retained Earnings" },
  { key: "treasury_stock", label: "Treasury Stock" },
  { key: "common_stock_shares_outstanding", label: "Shares Outstanding" },
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
  balanceSheets,
}: { balanceSheets: BalanceSheet[] | null }) => {
  const sortedStatements = balanceSheets
    ? [...balanceSheets].sort(
      (a, b) => new Date(b.fiscal_date_ending).getTime() - new Date(a.fiscal_date_ending).getTime()
    )
    : []

  if (!balanceSheets) return null;

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
        {fieldLabels.map(({ key, label, isSubtotal, isSectionHeader }) => (
          <TableRow
            key={key}
            className={isSubtotal ? "bg-muted/50 font-medium" : ""}
          >
            <TableCell
              className={`sticky left-0 z-10 ${isSubtotal
                ? "bg-muted font-semibold"
                : isSectionHeader
                  ? "bg-gray-300 font-semibold"
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
                  className={`text-right tabular-nums ${isSubtotal
                    ? "bg-muted/50"
                    : isSectionHeader
                      ? "bg-gray-300"
                      : ""
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
