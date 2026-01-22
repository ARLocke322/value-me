
import { useLocation } from "wouter";
import { Card } from "../ui/card";
import { useState } from "react";

import CompanyOverviewCard from "./CompanyOverviewCard";
import CompanyQuoteCard from "./CompanyQuoteCard";
import CompanyAcfReportsCard from "./CompanyAcfReportsCard";

const Company = () => {
  const [location, _navigate] = useLocation()
  const [companyTicker, _setCompanyTicker] = useState<string>(location.slice(1))

  return (
    <Card className="bg-gray-200 w-full min-h-screen text-center p-2">
      <h1 className="text-2xl font-bold uppercase bg-white text-black px-4 py-2 inline-block rounded-md">
        {companyTicker}
      </h1>
      <div className="flex flex-row gap-2 justify-center">
        <CompanyOverviewCard ticker={companyTicker} />
        <CompanyQuoteCard ticker={companyTicker} />
        <CompanyAcfReportsCard ticker={companyTicker} />
      </div>
    </Card>
  )
}

export default Company;
