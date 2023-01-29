import { z } from "zod";
import { StringFilterObjectSchema } from "./StringFilter.schema";
import { DateTimeFilterObjectSchema } from "./DateTimeFilter.schema";

import type { Prisma } from "@prisma/client";

const Schema: z.ZodType<Prisma.ExampleWhereInput> = z
  .object({
    AND: z
      .union([
        z.lazy(() => ExampleWhereInputObjectSchema),
        z.lazy(() => ExampleWhereInputObjectSchema).array(),
      ])
      .optional(),
    OR: z
      .lazy(() => ExampleWhereInputObjectSchema)
      .array()
      .optional(),
    NOT: z
      .union([
        z.lazy(() => ExampleWhereInputObjectSchema),
        z.lazy(() => ExampleWhereInputObjectSchema).array(),
      ])
      .optional(),
    id: z
      .union([z.lazy(() => StringFilterObjectSchema), z.string()])
      .optional(),
    createdAt: z
      .union([z.lazy(() => DateTimeFilterObjectSchema), z.date()])
      .optional(),
    updatedAt: z
      .union([z.lazy(() => DateTimeFilterObjectSchema), z.date()])
      .optional(),
  })
  .strict();

export const ExampleWhereInputObjectSchema = Schema;
