import { z } from "zod";
import { ExampleUpdateInputObjectSchema } from "./objects/ExampleUpdateInput.schema";
import { ExampleUncheckedUpdateInputObjectSchema } from "./objects/ExampleUncheckedUpdateInput.schema";
import { ExampleWhereUniqueInputObjectSchema } from "./objects/ExampleWhereUniqueInput.schema";

export const ExampleUpdateOneSchema = z.object({
  data: z.union([
    ExampleUpdateInputObjectSchema,
    ExampleUncheckedUpdateInputObjectSchema,
  ]),
  where: ExampleWhereUniqueInputObjectSchema,
});
