import type { AcfReport, GetCompanyAcfReportsResponse } from "@/types/api/companies"
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

const AcfTableRow = ({ date, acfReport }: { date: string, acfReport: AcfReport }) => (
  <TableRow>
    <TableCell className="font-medium">{date}</TableCell>
    <TableCell>{Number(acfReport.operating_cash_flow).toLocaleString()}</TableCell>
    <TableCell>{Number(acfReport.depreciation_depletion_and_amortization).toLocaleString()}</TableCell>
    <TableCell>{Number(acfReport.capital_expenditures).toLocaleString()}</TableCell>
    <TableCell className="text-right">{Number(acfReport.change_in_inventory).toLocaleString()}</TableCell>
  </TableRow>
)

const AcfTable = ({ acfReports }: { acfReports: Record<number, AcfReport> | null }) => {
  if (!acfReports) return null;
  return (
    <Table>
      <TableCaption>
        All numbers are in {acfReports["2024"]?.reported_currency}
      </TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="text-center w-25">Year</TableHead>
          <TableHead>Operating cash flow</TableHead>
          <TableHead>Depreciation depletion + amortization</TableHead>
          <TableHead>Capital expenditures</TableHead>
          <TableHead className="text-right">Change in inventory</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {Object.entries(acfReports).map(([key, value]) =>
          <AcfTableRow key={key} date={key} acfReport={value} />
        )}
      </TableBody>
    </Table>
  )
}

export default AcfTable
