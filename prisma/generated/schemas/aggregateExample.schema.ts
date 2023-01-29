import { z } from "zod";
import { ExampleOrderByWithRelationInputObjectSchema } from "./objects/ExampleOrderByWithRelationInput.schema";
import { ExampleWhereInputObjectSchema } from "./objects/ExampleWhereInput.schema";
import { ExampleWhereUniqueInputObjectSchema } from "./objects/ExampleWhereUniqueInput.schema";
import { ExampleCountAggregateInputObjectSchema } from "./objects/ExampleCountAggregateInput.schema";
import { ExampleMinAggregateInputObjectSchema } from "./objects/ExampleMinAggregateInput.schema";
import { ExampleMaxAggregateInputObjectSchema } from "./objects/ExampleMaxAggregateInput.schema";

export const ExampleAggregateSchema = z.object({
  orderBy: z
    .union([
      ExampleOrderByWithRelationInputObjectSchema,
      ExampleOrderByWithRelationInputObjectSchema.array(),
    ])
    .optional(),
  where: ExampleWhereInputObjectSchema.optional(),
  cursor: ExampleWhereUniqueInputObjectSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  _count: z
    .union([z.literal(true), ExampleCountAggregateInputObjectSchema])
    .optional(),
  _min: ExampleMinAggregateInputObjectSchema.optional(),
  _max: ExampleMaxAggregateInputObjectSchema.optional(),
});
