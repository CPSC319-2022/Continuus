import { z } from "zod";
import { ExampleWhereUniqueInputObjectSchema } from "./objects/ExampleWhereUniqueInput.schema";

export const ExampleDeleteOneSchema = z.object({
  where: ExampleWhereUniqueInputObjectSchema,
});
