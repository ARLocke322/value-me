import { Button } from "@/components/ui/button"
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldLegend,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import TickerFormHeader from "./TickerFormHeader"
import TickerFormFooter from "./TickerFormFooter"

const TickerForm = () => {
  return (
    <div className="flex flex-col justify-center">
      <TickerFormHeader />
      <TickerFormFooter tickerError={null} />
    </div>
  )
}

export default TickerForm;
