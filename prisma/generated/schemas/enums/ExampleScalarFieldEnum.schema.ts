import { z } from "zod";

export const ExampleScalarFieldEnumSchema = z.enum([
  "id",
  "createdAt",
  "updatedAt",
]);
