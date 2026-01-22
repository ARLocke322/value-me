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
    <TableCell>{acfReport.operating_cash_flow}</TableCell>
    <TableCell>{acfReport.depreciation_depletion_and_amortization}</TableCell>
    <TableCell>{acfReport.capital_expenditures}</TableCell>
    <TableCell className="text-right">{acfReport.change_in_inventory}</TableCell>
  </TableRow>
)

const AcfTable = ({ acfReports }: { acfReports: Record<number, AcfReport> }) => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-25">Year</TableHead>
          <TableHead>Operating cash flow</TableHead>
          <TableHead>Depreciation depletion + amortization</TableHead>
          <TableHead>Capital expenditures</TableHead>
          <TableHead className="text-right">Change in inventory</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {Object.entries(acfReports).map(([key, value]) =>
          <AcfTableRow date={key} acfReport={value} />
        )}
      </TableBody>
    </Table>
  )
}

export default AcfTable
