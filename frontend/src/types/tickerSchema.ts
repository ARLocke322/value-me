import { z } from "zod";

export const createTickerSchema = () =>
  z.object({
    ticker: z.string(),
  })

export type TickerSchemaData = {
  ticker: string;
}
