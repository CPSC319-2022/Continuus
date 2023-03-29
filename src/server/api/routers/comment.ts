import {
    BlogPostFindManySchema,
  CommentCreateOneSchema, CommentFindManySchema, CommentFindUniqueSchema,
  CommentUpdateOneSchema,
  CommentWhereInputObjectSchema
} from "~/generated/schemas";

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
  update: protectedProcedure.input(CommentUpdateOneSchema).mutation(async ({ ctx, input }) => {
      const user = await ctx.prisma.user.findUniqueOrThrow({
        where: {
          id: ctx.session.user.id
        }
      });

      const comment = await ctx.prisma.comment.findUniqueOrThrow({
        where: {
          id: input.where.id
        }
      });

      if (!["CONTRIBUTOR", "ADMIN"].includes(user.role)) {
        throw new Error("Your account role is not permitted to update comments");
      }
      if (user.id !== comment.userId) {
        throw new Error("You are forbidden to update another user's comment");
      }

      return await ctx.prisma.comment.update(input);
    }
  ),
  getUnique: publicProcedure.input(CommentFindUniqueSchema).query(async ({ input, ctx }) => {
    return await ctx.prisma.comment.findUniqueOrThrow({
      where: {
        id: input.where.id
      }
    })
  }),
  get: publicProcedure
  .input(CommentFindManySchema)
  .query(async ({ input, ctx }) => {
      const { take = 10, cursor } = input;
      const items = await ctx.prisma.comment.findMany({
          take: take + 1,
          cursor,
          orderBy: [{ createdAt: "desc" }],
          include: {
              user: true,
              blogPost: true,
          },
          where: input.where,
    });
    let nextCursor;
    if (items.length > take) {
        const nextItem = items.pop();
        nextCursor = nextItem?.id;
    }
    return {
        items,
        nextCursor,
    };
  }),
});
