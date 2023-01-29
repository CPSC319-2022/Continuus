import { z } from "zod";
import { SessionOrderByWithRelationInputObjectSchema } from "./objects/SessionOrderByWithRelationInput.schema";
import { SessionWhereInputObjectSchema } from "./objects/SessionWhereInput.schema";
import { SessionWhereUniqueInputObjectSchema } from "./objects/SessionWhereUniqueInput.schema";
import { SessionScalarFieldEnumSchema } from "./enums/SessionScalarFieldEnum.schema";

export const SessionFindManySchema = z.object({
  orderBy: z
    .union([
      SessionOrderByWithRelationInputObjectSchema,
      SessionOrderByWithRelationInputObjectSchema.array(),
    ])
    .optional(),
  where: SessionWhereInputObjectSchema.optional(),
  cursor: SessionWhereUniqueInputObjectSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.array(SessionScalarFieldEnumSchema).optional(),
});
