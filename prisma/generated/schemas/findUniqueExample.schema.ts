import { z } from "zod";
import { ExampleWhereUniqueInputObjectSchema } from "./objects/ExampleWhereUniqueInput.schema";

export const ExampleFindUniqueSchema = z.object({
  where: ExampleWhereUniqueInputObjectSchema,
});
