import { z } from "zod";
import { VerificationTokenOrderByWithRelationInputObjectSchema } from "./objects/VerificationTokenOrderByWithRelationInput.schema";
import { VerificationTokenWhereInputObjectSchema } from "./objects/VerificationTokenWhereInput.schema";
import { VerificationTokenWhereUniqueInputObjectSchema } from "./objects/VerificationTokenWhereUniqueInput.schema";
import { VerificationTokenCountAggregateInputObjectSchema } from "./objects/VerificationTokenCountAggregateInput.schema";
import { VerificationTokenMinAggregateInputObjectSchema } from "./objects/VerificationTokenMinAggregateInput.schema";
import { VerificationTokenMaxAggregateInputObjectSchema } from "./objects/VerificationTokenMaxAggregateInput.schema";

export const VerificationTokenAggregateSchema = z.object({
  orderBy: z
    .union([
      VerificationTokenOrderByWithRelationInputObjectSchema,
      VerificationTokenOrderByWithRelationInputObjectSchema.array(),
    ])
    .optional(),
  where: VerificationTokenWhereInputObjectSchema.optional(),
  cursor: VerificationTokenWhereUniqueInputObjectSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  _count: z
    .union([z.literal(true), VerificationTokenCountAggregateInputObjectSchema])
    .optional(),
  _min: VerificationTokenMinAggregateInputObjectSchema.optional(),
  _max: VerificationTokenMaxAggregateInputObjectSchema.optional(),
});
