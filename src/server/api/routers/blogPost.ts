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
  get: publicProcedure.input(BlogPostFindManySchema).query(({ ctx }) => {
    return ctx.prisma.blogPost.findMany({
      orderBy: [{ createdAt: "desc" }],
      include: {
        user: true,
        comments: { orderBy: [{ createdAt: "desc" }], include: { user: true } },
      },
    });
  }),
});
