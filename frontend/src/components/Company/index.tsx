
import { useLocation } from "wouter";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import Overview from "./Overview";
import Quote from "./Quote";
import IncomeStatements from "./IncomeStatements";
import AcfReports from "./AcfReports";
import BalanceSheets from "./BalanceSheets";

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

      <Tabs defaultValue="summary" className="w-full">
        <TabsList className="mb-6">
          <TabsTrigger value="summary">Summary</TabsTrigger>
          <TabsTrigger value="income-statement">Income Statement</TabsTrigger>
          <TabsTrigger value="cash-flow">Cash Flow Statement</TabsTrigger>
          <TabsTrigger value="balance-sheet">Balance Sheet</TabsTrigger>
        </TabsList>

        <TabsContent value="summary">
          <div className="flex flex-col gap-2">
            <Overview ticker={companyTicker} />
            <Quote ticker={companyTicker} />
          </div>
        </TabsContent>

        <TabsContent value="income-statement">
          <IncomeStatements ticker={companyTicker} />
        </TabsContent>

        <TabsContent value="cash-flow">
          <AcfReports ticker={companyTicker} />
        </TabsContent>

        <TabsContent value="balance-sheet">
          <BalanceSheets ticker={companyTicker} />
        </TabsContent>
      </Tabs>
    </div>
  )
}

export default Company;
