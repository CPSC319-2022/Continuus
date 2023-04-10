import { type PrismaClient } from "@prisma/client";
import { z } from "zod";
import { UserFindManySchema, UserUpdateOneSchema } from "~/generated/schemas";
import { createTRPCRouter, protectedProcedure, publicProcedure } from "../trpc";
import { TRPCError } from "@trpc/server";
import { hash } from "argon2";

const getCurrentUser = async (prisma: PrismaClient, userId?: string) => {
  return (
    (userId &&
      (await prisma.user.findUnique({
        where: {
          id: userId,
        },
        include: {
          contributorRequest: true,
        },
      }))) ||
    null
  );
};

export const assertAdminRole = async (
  prisma: PrismaClient,
  userId?: string
) => {
  const currUser = await getCurrentUser(prisma, userId);

  if (!!!currUser || currUser.role !== "ADMIN") {
    throw new Error("UNAUTHORIZED");
  }
};

export const userRouter = createTRPCRouter({
  currentUser: publicProcedure.query(async ({ ctx }) => {
    return await getCurrentUser(ctx.prisma, ctx.session?.user?.id);
  }),
  searchUsers: publicProcedure
    .input(UserFindManySchema)
    .query(async ({ ctx, input }) => {
      return ctx.prisma.user.findMany(input);
    }),
  paginatedUsers: protectedProcedure
    .input(
      z.object({
        pageIndex: z.number(),
        pageSize: z.number(),
      })
    )
    .query(async ({ ctx, input }) => {
      await assertAdminRole(ctx.prisma, ctx.session.user.id);

      return await ctx.prisma.user.findMany({
        skip: input.pageIndex * input.pageSize,
        take: input.pageSize,
        orderBy: {
          createdAt: "asc",
        },
      });
    }),
  count: protectedProcedure.query(async ({ ctx }) => {
    await assertAdminRole(ctx.prisma, ctx.session.user.id);

    return await ctx.prisma.user.count();
  }),
  batchUpdate: protectedProcedure
    .input(z.array(UserUpdateOneSchema))
    .mutation(async ({ ctx, input }) => {
      await assertAdminRole(ctx.prisma, ctx.session.user.id);

      let triedRemovingLastAdmin = false;

      // Sorting is needed to first update users to admin role before removing admin roles
      input.sort((update) => (update.data.role === "ADMIN" ? -1 : 1));

      for (const update of input) {
        if (update.data.role && update.data.role !== "ADMIN") {
          const adminCount = await ctx.prisma.user.count({
            where: {
              role: "ADMIN",
            },
          });

          if (adminCount <= 1) {
            const targetUser = await ctx.prisma.user.findUniqueOrThrow({
              where: update.where,
            });

            if (targetUser.role === "ADMIN") {
              triedRemovingLastAdmin = true;
              console.error("Batch Update: Can't remove the last admin");
              continue;
            }
          }
        }

        await ctx.prisma.user.update(update);
      }

      return triedRemovingLastAdmin;
    }),
  selectedUser: publicProcedure
    .input(
      z
        .object({
          userId: z.string(),
        })
    )
    .query(async ({ ctx, input }) => {
      return await getCurrentUser(ctx.prisma, input.userId);
    }),
  updateOne: protectedProcedure
    .input(UserUpdateOneSchema)
    .mutation(async ({ ctx, input }) => {
      await assertAdminRole(ctx.prisma, ctx.session.user.id);
      return ctx.prisma.user.update(input);
    }),
  signup: publicProcedure
    .input(z.object({
      name: z.string().min(2).max(32),
      email: z.string().email(),
      password: z.string().min(4).max(12),
    }))
    .mutation(async ({ ctx, input }) => {
      const lowerCaseInputEmail = input.email.toLowerCase();

      const exists = await ctx.prisma.user.findFirst({
        where: {
          email: lowerCaseInputEmail
        }
      });

      if (exists) {
        throw new TRPCError({
          code: "CONFLICT",
          message: JSON.stringify([{
            message: "That e-mail is already in use"
          }]),
        });
      }

      const hashedPassword = await hash(input.password);

      const createdUser = await ctx.prisma.user.create({
        data: {
          name: input.name,
          email: lowerCaseInputEmail,
          password: hashedPassword,
        },
      });

      return createdUser;
    })
});
