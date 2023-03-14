import { UserFindManySchema } from "~/generated/schemas";
import { createTRPCRouter, protectedProcedure, publicProcedure } from "../trpc";

export const userRouter = createTRPCRouter({
  currentUser: publicProcedure.query(async ({ ctx }) => {
    return (
      (ctx.session?.user &&
        (await ctx.prisma.user.findUnique({
          where: {
            id: ctx.session.user.id,
          },
        }))) ||
      null
    );
  }),
  allUsers: protectedProcedure
    .input(UserFindManySchema)
    .query(async ({ ctx, input }) => {
      const user = await ctx.prisma.user.findUniqueOrThrow({
        where: {
          id: ctx.session.user.id,
        },
      });

      if (user.role !== "ADMIN") {
        throw new Error("UNAUTORHIZED");
      }

      return ctx.prisma.user.findMany(input);
    }),
});
