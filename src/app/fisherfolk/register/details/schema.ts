// schema.ts (example)
import * as z from "zod";

export const formSchema = z.object({
  name: z.string().min(1, "Required"),
  age: z.number().min(18, "Must be adult"),
});

// Add a basic DetailsSchema export
export const DetailsSchema = z.object({
  someField: z.string().optional(), // Replace with actual fields
  anotherField: z.number().optional(), // Replace with actual fields
});