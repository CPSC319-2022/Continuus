import { CommentCreateOneSchema, CommentWhereInputObjectSchema } from "~/generated/schemas";

import { createTRPCRouter, protectedProcedure, publicProcedure } from "../trpc";

export const commentRouter = createTRPCRouter({
  create: protectedProcedure
    .input(CommentCreateOneSchema)
    .mutation(async ({ ctx, input }) => {
      return await ctx.prisma.comment.create(input);
    }),
  count: publicProcedure
    .input(CommentWhereInputObjectSchema)
    .query(async ({ ctx, input }) => {
        return await ctx.prisma.comment.count({
            where: input
        });
    }),
});
