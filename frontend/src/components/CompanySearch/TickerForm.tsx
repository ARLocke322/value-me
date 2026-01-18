import TickerFormHeader from "./TickerFormHeader"
import TickerFormFooter from "./TickerFormFooter"
import TickerFormBody from "./TickerFormBody"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { createTickerSchema, type TickerSchemaData } from "@/types/tickerSchema"
import { zodResolver } from "@hookform/resolvers/zod";
import companiesService from "@/services/companies"

const TickerForm = () => {
  const [tickerError, setTickerError] = useState<string | null>(null);

  const onSubmit = async (data: TickerSchemaData) => {
    try {
      setTickerError(null);
      const flowStatus = await companiesService.getFlowStatus(data.ticker);
      if (flowStatus.error) {
        console.log("no flow")
      } else {
        console.log("flow")
      }

    } catch {
      console.log("Error")
    }

  }

  const form = useForm<TickerSchemaData>({
    resolver: zodResolver(createTickerSchema()),
    mode: "onSubmit"
  })
  return (
    <div className="flex flex-col gap-4">
      <TickerFormHeader />
      <TickerFormBody form={form} onSubmit={() => console.log("submit")} />
      <TickerFormFooter tickerError={tickerError} />
    </div>
  )
}

export default TickerForm;
