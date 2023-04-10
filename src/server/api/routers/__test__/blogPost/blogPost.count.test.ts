import { PrismaClient, User } from "@prisma/client";
import { describe, it, expect, beforeEach } from "vitest";
import { mockDeep, mockReset } from "vitest-mock-extended";
import { appRouter } from "~/server/api/root";

describe("Retrieving Blog Post Count", () => {
  const prismaMock = mockDeep<PrismaClient>();

  beforeEach(() => {
    mockReset(prismaMock);
  });

  it("should return the number of posts in the database", async () => {
    const caller = appRouter.createCaller({ session: null, prisma: prismaMock });

    prismaMock.blogPost.count.mockResolvedValue(100);

    const count = await caller.blogPost.count({});

    
    expect(count).toEqual(100);
    expect(prismaMock.blogPost.count).toBeCalledTimes(1);
    expect(prismaMock.blogPost.count).toBeCalledWith({
      where: {}
    });
  });

  
  it("should return the number of posts in the database with selection", async () => {
    const caller = appRouter.createCaller({ session: null, prisma: prismaMock });

    prismaMock.blogPost.count.mockResolvedValue(89);

    const count = await caller.blogPost.count({
      id: '__test_id__'
    });

    
    expect(count).toEqual(89);
    expect(prismaMock.blogPost.count).toBeCalledTimes(1);
    expect(prismaMock.blogPost.count).toBeCalledWith({
      where: {
        id: '__test_id__'
      }
    });
  });
});
