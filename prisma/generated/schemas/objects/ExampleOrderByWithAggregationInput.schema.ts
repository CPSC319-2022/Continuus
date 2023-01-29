import { z } from "zod";
import { SortOrderSchema } from "../enums/SortOrder.schema";
import { ExampleCountOrderByAggregateInputObjectSchema } from "./ExampleCountOrderByAggregateInput.schema";
import { ExampleMaxOrderByAggregateInputObjectSchema } from "./ExampleMaxOrderByAggregateInput.schema";
import { ExampleMinOrderByAggregateInputObjectSchema } from "./ExampleMinOrderByAggregateInput.schema";

import type { Prisma } from "@prisma/client";

const Schema: z.ZodType<Prisma.ExampleOrderByWithAggregationInput> = z
  .object({
    id: z.lazy(() => SortOrderSchema).optional(),
    createdAt: z.lazy(() => SortOrderSchema).optional(),
    updatedAt: z.lazy(() => SortOrderSchema).optional(),
    _count: z
      .lazy(() => ExampleCountOrderByAggregateInputObjectSchema)
      .optional(),
    _max: z.lazy(() => ExampleMaxOrderByAggregateInputObjectSchema).optional(),
    _min: z.lazy(() => ExampleMinOrderByAggregateInputObjectSchema).optional(),
  })
  .strict();

export const ExampleOrderByWithAggregationInputObjectSchema = Schema;
