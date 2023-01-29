import { z } from "zod";
import { ExampleWhereInputObjectSchema } from "./objects/ExampleWhereInput.schema";
import { ExampleOrderByWithAggregationInputObjectSchema } from "./objects/ExampleOrderByWithAggregationInput.schema";
import { ExampleScalarWhereWithAggregatesInputObjectSchema } from "./objects/ExampleScalarWhereWithAggregatesInput.schema";
import { ExampleScalarFieldEnumSchema } from "./enums/ExampleScalarFieldEnum.schema";

export const ExampleGroupBySchema = z.object({
  where: ExampleWhereInputObjectSchema.optional(),
  orderBy: z
    .union([
      ExampleOrderByWithAggregationInputObjectSchema,
      ExampleOrderByWithAggregationInputObjectSchema.array(),
    ])
    .optional(),
  having: ExampleScalarWhereWithAggregatesInputObjectSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  by: z.array(ExampleScalarFieldEnumSchema),
});
