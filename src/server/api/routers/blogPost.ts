import {
  BlogPostCreateOneSchema,
  BlogPostFindManySchema,
} from "../../../generated/schemas";

import { createTRPCRouter, protectedProcedure, publicProcedure } from "../trpc";

export const blogPostRouter = createTRPCRouter({
  create: protectedProcedure
    .input(BlogPostCreateOneSchema)
    .mutation(async ({ ctx, input }) => {
      const user = await ctx.prisma.user.findUniqueOrThrow({
        where: {
          id: ctx.session.user.id,
        },
      });

      if (!["CONTRIBUTOR", "ADMIN"].includes(user.role)) {
        throw new Error("UNAUTHORIZED");
      }

      return await ctx.prisma.blogPost.create(input);
    }),
  get: publicProcedure
    .input(BlogPostFindManySchema)
    .query(async ({ input, ctx }) => {
      const { take = 10, cursor } = input;
      const items = await ctx.prisma.blogPost.findMany({
        take: take + 1,
        cursor,
        orderBy: [{ createdAt: "desc" }],
        include: {
          user: true,
          comments: {
            orderBy: [{ createdAt: "desc" }],
            include: { user: true },
          },
        },
      });
      let nextCursor;
      if (items.length > take) {
        const nextItem = items.pop(); // return the last item from the array
        nextCursor = nextItem?.id;
      }
      return {
        items,
        nextCursor,
      };
    }),
});
