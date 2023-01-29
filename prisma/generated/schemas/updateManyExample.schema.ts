import { z } from "zod";
import { ExampleUpdateManyMutationInputObjectSchema } from "./objects/ExampleUpdateManyMutationInput.schema";
import { ExampleWhereInputObjectSchema } from "./objects/ExampleWhereInput.schema";

export const ExampleUpdateManySchema = z.object({
  data: ExampleUpdateManyMutationInputObjectSchema,
  where: ExampleWhereInputObjectSchema.optional(),
});
