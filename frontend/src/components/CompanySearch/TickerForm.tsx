import TickerFormHeader from "./TickerFormHeader"
import TickerFormFooter from "./TickerFormFooter"
import TickerFormBody from "./TickerFormBody"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { createTickerSchema, type TickerSchemaData } from "@/types/tickerSchema"
import { zodResolver } from "@hookform/resolvers/zod";
import companiesService from "@/services/companies"
import { useLocation } from "wouter"

const TickerForm = () => {
  const [tickerError, setTickerError] = useState<string | null>(null);
  const [_location, navigate] = useLocation();

  const onSubmit = async (data: TickerSchemaData) => {
    try {
      // setTickerError(null);
      // const flowStatus = await companiesService.getFlowStatus(data.ticker);
      // if (flowStatus.error) {
      // setTickerError(flowStatus.error);
      //} else {
      //}
      const ticker = data.ticker
      navigate(`/${ticker}`)
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
      <TickerFormBody form={form} onSubmit={onSubmit} />
      <TickerFormFooter tickerError={tickerError} />
    </div>
  )
}

export default TickerForm;
