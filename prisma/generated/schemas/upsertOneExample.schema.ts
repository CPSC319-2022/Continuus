import { z } from "zod";
import { ExampleWhereUniqueInputObjectSchema } from "./objects/ExampleWhereUniqueInput.schema";
import { ExampleCreateInputObjectSchema } from "./objects/ExampleCreateInput.schema";
import { ExampleUncheckedCreateInputObjectSchema } from "./objects/ExampleUncheckedCreateInput.schema";
import { ExampleUpdateInputObjectSchema } from "./objects/ExampleUpdateInput.schema";
import { ExampleUncheckedUpdateInputObjectSchema } from "./objects/ExampleUncheckedUpdateInput.schema";

export const ExampleUpsertSchema = z.object({
  where: ExampleWhereUniqueInputObjectSchema,
  create: z.union([
    ExampleCreateInputObjectSchema,
    ExampleUncheckedCreateInputObjectSchema,
  ]),
  update: z.union([
    ExampleUpdateInputObjectSchema,
    ExampleUncheckedUpdateInputObjectSchema,
  ]),
});
