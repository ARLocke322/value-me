import {
  CardContent
} from "@/components/ui/card"
import TickerField from "./TickerField"
import type { UseFormReturn } from "react-hook-form"
import type { TickerSchemaData } from "@/types/tickerSchema"

type TickerFormBodyProps = {
  form: UseFormReturn<TickerSchemaData>
  onSubmit: (data: TickerSchemaData) => void | Promise<void>
}

const TickerFormBody = ({ form, onSubmit }: TickerFormBodyProps) =>
  <CardContent>
    <form id="ticker-form" onSubmit={form.handleSubmit(onSubmit)}>
      <TickerField control={form.control} />
    </form>
  </CardContent>


export default TickerFormBody
