import {
  BlogPostCreateOneSchema,
  BlogPostDeleteOneSchema,
  BlogPostFindManySchema,
  BlogPostFindUniqueSchema,
  BlogPostUpdateOneSchema,
  BlogPostWhereInputObjectSchema,
} from "~/generated/schemas";

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
            orderBy: [{ createdAt: "asc" }],
            include: { user: true },
          },
        },
        where: input.where,
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
  getOne: publicProcedure
    .input(BlogPostFindUniqueSchema)
    .query(async ({ input, ctx }) => {
      return ctx.prisma.blogPost.findUnique({
        ...input,
        include: {
          user: true,
          comments: {
            orderBy: [{ createdAt: "asc" }],
            include: { user: true },
          },
        },
      });
    }),
  count: publicProcedure
    .input(BlogPostWhereInputObjectSchema)
    .query(async ({ input, ctx }) => {
      const count: number = await ctx.prisma.blogPost.count({
        where: input,
      });
      return count;
    }),
  update: protectedProcedure
    .input(BlogPostUpdateOneSchema)
    .mutation(async ({ ctx, input }) => {
      const user = await ctx.prisma.user.findUniqueOrThrow({
        where: {
          id: ctx.session.user.id,
        },
      });

      const blogPost = await ctx.prisma.blogPost.findUniqueOrThrow({
        where: {
          id: input.where.id,
        },
      });

      if (!["CONTRIBUTOR", "ADMIN"].includes(user.role)) {
        throw new Error(
          "Your account role is not permitted to update blog posts"
        );
      }
      if (user.id !== blogPost.userId) {
        throw new Error("You are forbidden to update another user's blog post");
      }

      return await ctx.prisma.blogPost.update(input);
    }),
  delete: protectedProcedure
    .input(BlogPostDeleteOneSchema)
    .mutation(async ({ ctx, input }) => {
      const user = await ctx.prisma.user.findUniqueOrThrow({
        where: {
          id: ctx.session.user.id,
        },
      });
      const blogPost = await ctx.prisma.blogPost.findUniqueOrThrow({
        where: {
          id: input.where.id,
        },
      });
      if (user.role !== "ADMIN") {
        if (user.id !== blogPost.userId) {
          throw new Error(
            "You are forbidden to delete another user's blog post"
          );
        }
      }
      return await ctx.prisma.blogPost.delete(input);
    }),
  search: publicProcedure
    .input(BlogPostFindManySchema)
    .query(async ({ ctx, input }) => {
      return ctx.prisma.blogPost.findMany({
        take: 20,
        where: input.where,
        orderBy: [{ createdAt: "desc" }],
        include: {
          user: true,
          comments: {
            orderBy: [{ createdAt: "asc" }],
            include: { user: true },
          },
        },
      });
    }),
});
