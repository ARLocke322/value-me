
import { useLocation } from "wouter";
import { Card } from "../ui/card";
import { useState } from "react";

import CompanyOverviewCard from "./CompanyOverviewCard";
import CompanyQuoteCard from "./CompanyQuoteCard";
import CompanyAcfReportsCard from "./CompanyAcfReportsCard";

const Company = () => {
  const [location, _navigate] = useLocation()
  const [companyTicker, _setCompanyTicker] = useState<string>(location.slice(1))
  const imageUrl = `https://img.logo.dev/ticker/${companyTicker}?token=${process.env.LOGO_DEV_PUBLIC_KEY}`

  return (
    <Card className="bg-gray-200 w-full min-h-screen text-center p-2">
      <div>
        <h1 className="text-2xl font-bold uppercase bg-white text-black px-4 py-2 inline-flex items-center gap-3 rounded-md">
          <img src={imageUrl} className="w-10 h-10 rounded-full object-cover" alt="Company logo" />
          {companyTicker}
        </h1>
      </div>

      <div className="flex flex-row gap-2 justify-center">
        <CompanyOverviewCard ticker={companyTicker} />
        <CompanyQuoteCard ticker={companyTicker} />
        <CompanyAcfReportsCard ticker={companyTicker} />
      </div>
    </Card>
  )
}

export default Company;
