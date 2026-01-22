
import { useLocation } from "wouter";
import { Card } from "../ui/card";
import { useState } from "react";

import CompanyOverviewCard from "./CompanyOverviewCard";
import CompanyQuoteCard from "./CompanyQuoteCard";

const Company = () => {
  const [location, _navigate] = useLocation()
  const [companyTicker, _setCompanyTicker] = useState<string>(location.slice(1))

  return (
    <Card className="w-full sm:max-w-lg text-center p-2">
      <h1 className="text-2xl font-bold uppercase bg-gray-300 text-black px-4 py-2 inline-block rounded-md">
        {companyTicker}
      </h1>
      <CompanyOverviewCard ticker={companyTicker} />
      <CompanyQuoteCard ticker={companyTicker} />
    </Card>
  )
}

export default Company;
