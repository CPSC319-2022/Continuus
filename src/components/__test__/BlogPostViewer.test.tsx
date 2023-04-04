import { describe, it, expect, beforeEach, vi } from "vitest";
import { cleanup } from "@testing-library/react";
import { renderWithProviders } from "./utils";

vi.mock("~/utils/time.ts", () => ({
  timeAgo: () => "X seconds ago",
}));

export const blogPosts = {
  pages: [
    {
      items: [
        {
          id: "post-1",
          userId: "user-1",
          title: "title",
          updatedAt: new Date(),
          createdAt: new Date(),
          content: "content",
          comments: [
            {
              id: "comment-1",
              userId: "user-2",
              blogPostId: "post-1",
              content: "test comment",
              createdAt: new Date(),
              updatedAt: new Date(),
            },
          ],
          user: {
            name: "test user",
            image: "imageUrl",
          },
        },
        {
          id: "post-2",
          userId: "user-3",
          title: "another title",
          updatedAt: new Date(),
          createdAt: new Date(),
          content: "another content",
          comments: [
            {
              id: "comment-2",
              userId: "user-4",
              blogPostId: "post-2",
              content: "interesting post",
              createdAt: new Date(),
              updatedAt: new Date(),
            },
          ],
          user: {
            name: "another test user",
            image: "anotherImageUrl",
          },
        },
        {
          id: "post-3",
          userId: "user-5",
          title: "different title",
          updatedAt: new Date(),
          createdAt: new Date(),
          content: "different content",
          comments: [
            {
              id: "comment-3",
              userId: "user-6",
              blogPostId: "post-3",
              content: "great information",
              createdAt: new Date(),
              updatedAt: new Date(),
            },
          ],
          user: {
            name: "different test user",
            image: "differentImageUrl",
          },
        },
      ],
    },
  ],
};

export const adminUser = {
  createdAt: new Date(),
  email: "email",
  id: "admin-id",
  image: "image",
  name: "admin",
  role: "ADMIN",
  updatedAt: new Date(),
};

const setup = (blogPosts: any = { pages: [] }) => {
  vi.mock("next-auth/react", () => ({
    useSession: () => ({
      data: {
        expires: "1",
        user: { id: "test-user-id", email: "a", name: "hi", image: "c" },
      },
    }),
  }));

  vi.doMock("~/utils/api", () => ({
    api: {
      user: {
        currentUser: {
          useQuery: () => ({
            data: adminUser,
            isLoading: false,
          }),
        },
      },
      blogPost: {
        get: {
          useInfiniteQuery: () => ({
            data: blogPosts,
            fetchNextPage: vi.fn(),
            hasNextPage: false,
          }),
        },
      },
    },
  }));
};

describe("Blog post viewer: Snapshot", () => {
  beforeEach(() => {
    cleanup();
    vi.clearAllMocks();
    vi.resetModules();
  });

  it("render no blog posts", async () => {
    setup();
    const { BlogPostViewer } = await import("~/components/BlogPostViewer");
    const body = renderWithProviders(
      <BlogPostViewer user="user" />
    ).baseElement;
    expect(body).toMatchSnapshot();
  });

  it("render with blog posts", async () => {
    setup(blogPosts);
    const { BlogPostViewer } = await import("~/components/BlogPostViewer");
    const body = renderWithProviders(
      <BlogPostViewer user="user" />
    ).baseElement;
    expect(body).toMatchSnapshot();
  });
});
