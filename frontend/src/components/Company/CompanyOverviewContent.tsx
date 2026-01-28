import type { GetCompanyResponse } from "@/types/api/companies"

const CompanyOverviewContent = ({ overview }: { overview: GetCompanyResponse | null }) => {
  if (!overview) return null;
  return (
    <div className="space-y-3 text-sm">
      <div className="flex justify-between border-b pb-2">
        <span className="text-muted-foreground">Name:</span>
        <span className="font-semibold">{overview.name}</span>
      </div>
      <div className="flex justify-between border-b pb-2">
        <span className="text-muted-foreground">Sector:</span>
        <span className="font-semibold">{overview.sector}</span>
      </div>
      <div className="flex justify-between border-b pb-2">
        <span className="text-muted-foreground">Country:</span>
        <span className="font-semibold">{overview.country}</span>
      </div>
      <div className="flex justify-between border-b pb-2">
        <span className="text-muted-foreground">Currency:</span>
        <span className="font-semibold">{overview.currency}</span>
      </div>
      <div className="flex justify-between">
        <span className="text-muted-foreground">Asset Type:</span>
        <span className="font-semibold">{overview.asset_type}</span>
      </div>
    </div>
  )

}

export default CompanyOverviewContent
