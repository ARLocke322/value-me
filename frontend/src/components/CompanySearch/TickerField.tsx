import { Field, FieldDescription, FieldError } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import type { TickerSchemaData } from "@/types/tickerSchema"
import { Controller, type Control } from "react-hook-form"

const TickerField = (
  { control }: { control: Control<TickerSchemaData> }) =>
  <Controller
    name="ticker"
    control={control}
    render={({ field, fieldState }) => {
      return (
        <Field data-invalid={fieldState.invalid}>
          <Input
            {...field}
            id="form-ticker"
            aria-invalid={fieldState.invalid}
            value={String(field.value)}
            placeholder="E.G., AAPL"
          />
          {fieldState.invalid && (<FieldError errors={[fieldState.error]} />)}
        </Field>
      )
    }}
  />


export default TickerField
