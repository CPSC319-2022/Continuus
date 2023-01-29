import { z } from "zod";
import { ExampleWhereInputObjectSchema } from "./objects/ExampleWhereInput.schema";

export const ExampleDeleteManySchema = z.object({
  where: ExampleWhereInputObjectSchema.optional(),
});
