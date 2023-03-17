import { Role, type PrismaClient } from '@prisma/client';
import { z } from "zod";
import { UserUpdateOneSchema } from '~/generated/schemas';
import { createTRPCRouter, protectedProcedure, publicProcedure } from "../trpc";

const getCurrentUser = async (prisma: PrismaClient, userId?: string) => {
  return (
    userId && (await prisma.user.findUnique({
      where: {
        id: userId,
      },
    })) || null
  );
}

const assertAdminRole = async (prisma: PrismaClient, userId?: string) => {
  const currUser = await getCurrentUser(prisma, userId);

  if (!!!currUser || currUser.role !== "ADMIN") {
    throw new Error("UNAUTHORIZED");
  }
}

export const userRouter = createTRPCRouter({
  currentUser: publicProcedure.query(async ({ ctx }) => {
    return await getCurrentUser(ctx.prisma, ctx.session?.user?.id);
  }),
  paginatedUsers: protectedProcedure
    .input(z
      .object({
        pageIndex: z.number(),
        pageSize: z.number(),
      }))
    .query(async ({ ctx, input }) => {
      await assertAdminRole(ctx.prisma, ctx.session.user.id);

      return await ctx.prisma.user.findMany({
        skip: input.pageIndex * input.pageSize,
        take: input.pageSize,
        orderBy: {
          createdAt: 'asc'
        },
      });
    }),
  count: protectedProcedure
    .query(async ({ ctx }) => {
      await assertAdminRole(ctx.prisma, ctx.session.user.id);

      return await ctx.prisma.user.count();
    }),
  update: protectedProcedure
    .input(z.array(UserUpdateOneSchema))
    .mutation(async ({ ctx, input }) => {
      await assertAdminRole(ctx.prisma, ctx.session.user.id);

      for (const update of input) {
        await ctx.prisma.user.update(update);
      }
    }),
});
