import { z } from "zod";
import { StringWithAggregatesFilterObjectSchema } from "./StringWithAggregatesFilter.schema";
import { DateTimeWithAggregatesFilterObjectSchema } from "./DateTimeWithAggregatesFilter.schema";

import type { Prisma } from "@prisma/client";

const Schema: z.ZodType<Prisma.VerificationTokenScalarWhereWithAggregatesInput> =
  z
    .object({
      AND: z
        .union([
          z.lazy(
            () => VerificationTokenScalarWhereWithAggregatesInputObjectSchema
          ),
          z
            .lazy(
              () => VerificationTokenScalarWhereWithAggregatesInputObjectSchema
            )
            .array(),
        ])
        .optional(),
      OR: z
        .lazy(() => VerificationTokenScalarWhereWithAggregatesInputObjectSchema)
        .array()
        .optional(),
      NOT: z
        .union([
          z.lazy(
            () => VerificationTokenScalarWhereWithAggregatesInputObjectSchema
          ),
          z
            .lazy(
              () => VerificationTokenScalarWhereWithAggregatesInputObjectSchema
            )
            .array(),
        ])
        .optional(),
      identifier: z
        .union([
          z.lazy(() => StringWithAggregatesFilterObjectSchema),
          z.string(),
        ])
        .optional(),
      token: z
        .union([
          z.lazy(() => StringWithAggregatesFilterObjectSchema),
          z.string(),
        ])
        .optional(),
      expires: z
        .union([
          z.lazy(() => DateTimeWithAggregatesFilterObjectSchema),
          z.date(),
        ])
        .optional(),
    })
    .strict();

export const VerificationTokenScalarWhereWithAggregatesInputObjectSchema =
  Schema;
