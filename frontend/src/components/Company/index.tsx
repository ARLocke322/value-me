
import { useLocation } from "wouter";

import CompanyOverviewCard from "./CompanyOverviewCard";
import CompanyQuoteCard from "./CompanyQuoteCard";
import CompanyAcfReportsCard from "./CompanyAcfReportsCard";
import CompanyIncomeStatementsCard from "./CompanyIncomeStatementsCard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";

const Company = () => {
  const [location, _navigate] = useLocation();
  const companyTicker = location.slice(1);
  const imageUrl = `https://img.logo.dev/ticker/${companyTicker}?token=${process.env.LOGO_DEV_PUBLIC_KEY}`;

  return (
    <div className="mx-auto max-w-7xl">
      <div className="mb-8">
        <img src={imageUrl} className="w-20 h-20 rounded-full object-cover" alt="Company logo" />
        <h1 className="text-3xl font-bold tracking-tight">
          Financial Analysis
        </h1>
      </div>

      <Tabs defaultValue="income-statement" className="w-full">
        <TabsList className="mb-6">
          <TabsTrigger value="summary">Summary</TabsTrigger>
          <TabsTrigger value="income-statement">Income Statement</TabsTrigger>
          <TabsTrigger value="cash-flow">Cash Flow Statement</TabsTrigger>
        </TabsList>

        <TabsContent value="summary">
          <CompanyOverviewCard ticker={companyTicker} />
          <CompanyQuoteCard ticker={companyTicker} />
        </TabsContent>

        <TabsContent value="income-statement">
          <CompanyIncomeStatementsCard ticker={companyTicker} />
        </TabsContent>

        <TabsContent value="cash-flow">
          <CompanyAcfReportsCard ticker={companyTicker} />
        </TabsContent>
      </Tabs>
    </div>
  )
}

export default Company;
