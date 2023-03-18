import { CommentCreateOneSchema } from "~/generated/schemas";

import { createTRPCRouter, publicProcedure, protectedProcedure } from "../trpc";

export const commentRouter = createTRPCRouter({
  create: protectedProcedure
    .input(CommentCreateOneSchema)
    .mutation(async ({ ctx, input }) => {
      return await ctx.prisma.comment.create(input);
    }),
});
