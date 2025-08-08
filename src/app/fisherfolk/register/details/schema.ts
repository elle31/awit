// schema.ts (example)
import * as z from "zod";

export const formSchema = z.object({
  name: z.string().min(1, "Required"),
  age: z.number().min(18, "Must be adult"),
});