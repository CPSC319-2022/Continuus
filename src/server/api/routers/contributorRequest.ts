import {
  ContributorRequestCreateOneSchema,
  ContributorRequestDeleteOneSchema,
  ContributorRequestFindManySchema,
} from "~/generated/schemas";
import { createTRPCRouter, protectedProcedure } from "../trpc";
import { assertAdminRole } from "./user";

export const contributorRequestRouter = createTRPCRouter({
  getAll: protectedProcedure
    .input(ContributorRequestFindManySchema)
    .query(async ({ ctx, input }) => {
      await assertAdminRole(ctx.prisma, ctx.session.user.id);
      return ctx.prisma.contributorRequest.findMany({
        include: { user: true },
      });
    }),

  create: protectedProcedure
    .input(ContributorRequestCreateOneSchema)
    .mutation(async ({ ctx, input }) => {
      const user = await ctx.prisma.user.findUniqueOrThrow({
        where: {
          id: ctx.session.user.id,
        },
      });

      if (["CONTRIBUTOR", "ADMIN"].includes(user.role)) {
        throw new Error("You already have contributor access");
      }

      return ctx.prisma.contributorRequest.create(input);
    }),

  delete: protectedProcedure
    .input(ContributorRequestDeleteOneSchema)
    .mutation(async ({ ctx, input }) => {
      await assertAdminRole(ctx.prisma, ctx.session.user.id);
      return ctx.prisma.contributorRequest.delete(input);
    }),
});
