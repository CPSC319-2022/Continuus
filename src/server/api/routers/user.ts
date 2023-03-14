import { createTRPCRouter, publicProcedure } from "../trpc";

export const userRouter = createTRPCRouter({
  currentUser: publicProcedure
  .query(async ({ ctx }) => {
    return (ctx.session?.user && await ctx.prisma.user.findUnique({
        where: {
            id: ctx.session.user.id
        }
    })) || null
  })
});
