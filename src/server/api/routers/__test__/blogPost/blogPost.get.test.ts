import { BlogPost, PrismaClient, User, Comment } from "@prisma/client";
import { describe, it, expect, beforeEach } from "vitest";
import { mockDeep, mockReset } from "vitest-mock-extended";
import { appRouter } from "~/server/api/root";

const date = new Date();

const generateBlogPostsWithCommentsAndUser = (count: number) => {
  return [...new Array(count)].map((_, i) => ({
    id: `_${i}_`,
    userId: `_user_${i}_`,
    title: `_title_${i}_`,
    content: `_content_${i}_`,
    createdAt: date,
    updatedAt: date,
    user: {
      id: `_user_${i}_`,
      name: null,
      email: null,
      password: null,
      emailVerified: null,
      image: null,
      role: 'CONTRIBUTOR',
      createdAt: date,
      updatedAt: date,
    },
    comments: [
      {
        id: `_comment_${i}_`,
        userId: `_user_${i}_`,
        blogPostId: `_${i}_`,
        content: '__TEST COMMENT__',
        createdAt: date,
        updatedAt: date,
        user: {
          id: `_user_${i}_`,
          name: null,
          email: null,
          password: null,
          emailVerified: null,
          image: null,
          role: 'CONTRIBUTOR',
          createdAt: date,
          updatedAt: date,
        },
      }
    ]
  } as BlogPost & {
    user: User;
    comments: (Comment & {
      user: User;
    })[];
  }))
}

describe("Retrieving Paged Blog Posts", () => {
  const prismaMock = mockDeep<PrismaClient>();

  beforeEach(() => {
    mockReset(prismaMock);
  });

  it("should return the first 10 posts when no cursor is specified", async () => {
    const caller = appRouter.createCaller({ session: null, prisma: prismaMock });

    prismaMock.blogPost.findMany.mockResolvedValue(
      generateBlogPostsWithCommentsAndUser(10)
    );

    const blogPosts = await caller.blogPost.get({});

    expect(blogPosts.items.length).toEqual(10);
    expect(blogPosts.nextCursor).toBeUndefined();
    expect(prismaMock.blogPost.findMany).toBeCalledTimes(1);
  });

  it("should return the first 10 posts when no cursor is specified and a cursor", async () => {
    const caller = appRouter.createCaller({ session: null, prisma: prismaMock });

    prismaMock.blogPost.findMany.mockResolvedValue(
      generateBlogPostsWithCommentsAndUser(11)
    );

    const blogPosts = await caller.blogPost.get({});

    expect(blogPosts.items.length).toEqual(10);
    expect(blogPosts.nextCursor).toStrictEqual("_10_");
    expect(prismaMock.blogPost.findMany).toBeCalledTimes(1);
  });

  it("should return the first 10 posts from the cursor", async () => {
    const caller = appRouter.createCaller({ session: null, prisma: prismaMock });

    prismaMock.blogPost.findMany.mockResolvedValue(
      generateBlogPostsWithCommentsAndUser(21)
    );

    const blogPosts = await caller.blogPost.get({
      take: 20,
      cursor: {
        id: `_13_`
      }
    });

    expect(blogPosts.items.length).toEqual(20);
    expect(blogPosts.nextCursor).toStrictEqual("_20_");
    expect(prismaMock.blogPost.findMany).toBeCalledTimes(1);
    expect(prismaMock.blogPost.findMany).toBeCalledWith({
      take: 21,
      cursor:  {
        id: `_13_`
      },
      orderBy: [{ createdAt: "desc" }],
      include: {
        user: true,
        comments: {
          orderBy: [{ createdAt: "asc" }],
          include: { user: true },
        },
      }
    });
  });
});
