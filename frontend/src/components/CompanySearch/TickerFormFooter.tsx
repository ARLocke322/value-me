import {
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "../ui/button"
import { CardFooter } from "../ui/card"
import { Field } from "../ui/field"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { AlertCircle } from "lucide-react"

type TickerFormFooterProps = {
  tickerError: string | null
}

const TickerFormFooter = ({ tickerError }: TickerFormFooterProps) =>
  <CardFooter >
    <Field orientation="vertical">
      <Button className="w-full" type="submit" form="trade-form">
        Search
      </Button>
      {tickerError && (
        <Alert variant="destructive" className="mb-4">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{tickerError}</AlertDescription>
        </Alert>
      )}
    </Field>
  </CardFooter>
export default TickerFormFooter
