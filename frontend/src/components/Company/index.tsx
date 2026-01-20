
import { useLocation } from "wouter";
import { Card } from "../ui/card";
import { useState } from "react";

import CompanyOverviewCard from "./CompanyOverviewCard";
import FlowStatusCard from "./FlowStatusCard";

const Company = () => {
  const [location, _navigate] = useLocation()
  const [companyTicker, _setCompanyTicker] = useState<string>(location.slice(1))

  return (
    <Card className="w-full sm:max-w-lg text-center p-2">
      <h1 className="text-1xl font-bold">{companyTicker}</h1>
      <FlowStatusCard flowStatus={null} />
      <CompanyOverviewCard ticker={companyTicker} />
    </Card>
  )
}

export default Company;
