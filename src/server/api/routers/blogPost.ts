import {
  BlogPostCreateOneSchema,
  BlogPostFindManySchema, BlogPostFindUniqueSchema, BlogPostUpdateOneSchema
} from "~/generated/schemas";

import { createTRPCRouter, protectedProcedure, publicProcedure } from "../trpc";

export const blogPostRouter = createTRPCRouter({
  create: protectedProcedure
    .input(BlogPostCreateOneSchema)
    .mutation(async ({ ctx, input }) => {
      const user = await ctx.prisma.user.findUniqueOrThrow({
        where: {
          id: ctx.session.user.id
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
  getOne: publicProcedure.input(BlogPostFindUniqueSchema).query(({ ctx, input }) => {
    return ctx.prisma.blogPost.findUnique({
      where: {
        id: input.where.id
      }
    });
  }),
  update: protectedProcedure.input(BlogPostUpdateOneSchema).mutation(async ({ ctx, input }) => {
      const user = await ctx.prisma.user.findUniqueOrThrow({
        where: {
          id: ctx.session.user.id
        }
      });

      if (!["CONTRIBUTOR", "ADMIN"].includes(user.role)) {
        throw new Error("Your account role is not permitted to update blog posts");
      }

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    if (user.id !== input.data.userId) {
        throw new Error("You are forbidden to update another user's blog post");
      }

      return await ctx.prisma.blogPost.update(input);
    }
  )
});
