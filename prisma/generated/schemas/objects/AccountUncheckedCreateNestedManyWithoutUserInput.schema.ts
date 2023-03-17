import { z } from "zod";
import { AccountCreateWithoutUserInputObjectSchema } from "./AccountCreateWithoutUserInput.schema";
import { AccountUncheckedCreateWithoutUserInputObjectSchema } from "./AccountUncheckedCreateWithoutUserInput.schema";
import { AccountCreateOrConnectWithoutUserInputObjectSchema } from "./AccountCreateOrConnectWithoutUserInput.schema";
import { AccountWhereUniqueInputObjectSchema } from "./AccountWhereUniqueInput.schema";

import type { Prisma } from "@prisma/client";

const Schema: z.ZodType<Prisma.AccountUncheckedCreateNestedManyWithoutUserInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => AccountCreateWithoutUserInputObjectSchema),
          z.lazy(() => AccountCreateWithoutUserInputObjectSchema).array(),
          z.lazy(() => AccountUncheckedCreateWithoutUserInputObjectSchema),
          z
            .lazy(() => AccountUncheckedCreateWithoutUserInputObjectSchema)
            .array(),
        ])
        .optional(),
      connectOrCreate: z
        .union([
          z.lazy(() => AccountCreateOrConnectWithoutUserInputObjectSchema),
          z
            .lazy(() => AccountCreateOrConnectWithoutUserInputObjectSchema)
            .array(),
        ])
        .optional(),
      connect: z
        .union([
          z.lazy(() => AccountWhereUniqueInputObjectSchema),
          z.lazy(() => AccountWhereUniqueInputObjectSchema).array(),
        ])
        .optional(),
    })
    .strict();

export const AccountUncheckedCreateNestedManyWithoutUserInputObjectSchema =
  Schema;
