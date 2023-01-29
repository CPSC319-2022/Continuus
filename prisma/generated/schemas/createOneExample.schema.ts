import { z } from "zod";
import { ExampleCreateInputObjectSchema } from "./objects/ExampleCreateInput.schema";
import { ExampleUncheckedCreateInputObjectSchema } from "./objects/ExampleUncheckedCreateInput.schema";

export const ExampleCreateOneSchema = z.object({
  data: z.union([
    ExampleCreateInputObjectSchema,
    ExampleUncheckedCreateInputObjectSchema,
  ]),
});
