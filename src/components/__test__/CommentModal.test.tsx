import { describe, it, expect, beforeEach, vi } from "vitest";
import { cleanup, render, waitFor, screen } from "@testing-library/react";
import * as reduxHooks from "~/redux/hooks";
import { renderWithProviders } from "./utils";

const reader = {
  createdAt: new Date(),
  email: "email",
  id: "reader-id",
  image: "image",
  name: "reader",
  role: "READER",
  updatedAt: new Date(),
};

export const mockComments = [
  {
    id: "comment-1",
    blogPostId: "post-1",
    content: "test comment",
    createdAt: new Date(),
    updatedAt: new Date(),
    user: {
      name: "test user 2",
      id: "user-2",
      image: "image",
    },
  },
  {
    id: "comment-2",
    blogPostId: "post-1",
    content: "test comment 2",
    createdAt: new Date(),
    updatedAt: new Date(),
    user: {
      name: "test user 3",
      id: "user-3",
      image: "image",
    },
  },
];

const setup = (user: any = null, post: any = null) => {
  vi.doMock("next/router", () => ({
    useRouter: () => ({
      events: {
        on: vi.fn(),
      },
    }),
  }));

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
            data: user,
            isLoading: false,
          }),
        },
        updateOne: {
          useMutation: vi.fn(),
        },
      },
      blogPost: {
        getOne: {
          useQuery: () => ({
            data: {
              id: "post-1",
              userId: "user-1",
              title: "title",
              updatedAt: new Date(),
              createdAt: new Date(),
              content: "content",
              comments: mockComments,
              user: {
                name: "test user",
                image: "imageUrl",
              },
            },
            isLoading: false,
          }),
        },
      },
      comment: {
        getUnique: {
          useQuery: () => ({
            data: {
              id: "comment-1",
              blogPostId: "post-1",
              content: "test comment",
              createdAt: new Date(),
              updatedAt: new Date(),
              user: {
                name: "test user 2",
                id: "user-2",
                image: "image",
              },
            },
            isLoading: false,
          }),
        },
        create: {
          useMutation: () => ({
            onSuccess: vi.fn(),
          }),
        },
        update: {
          useMutation: () => ({
            onSuccess: vi.fn(),
          }),
        },
        delete: {
          useMutation: () => ({
            onSuccess: vi.fn(),
          }),
        },
      },
      useContext: () => ({
        blogPost: {
          invalidate: vi.fn(),
        },
        comment: {
          count: {
            invalidate: vi.fn(),
          },
        },
      }),
    },
  }));
};

describe("Comment Modal: Snapshots", () => {
  const useSelectorMock = vi.spyOn(reduxHooks, "useAppSelector");
  const useDispatchMock = vi.spyOn(reduxHooks, "useAppDispatch");

  beforeEach(() => {
    cleanup();
    useSelectorMock.mockClear();
    useDispatchMock.mockClear();
    vi.clearAllMocks();
  });

  it("render comment modal not logged in no selected post", async () => {
    setup();
    const { CommentModal } = await import("~/components/CommentModal");
    const body = renderWithProviders(<CommentModal />);
    expect(body.baseElement).toMatchSnapshot();
  });

  it("render comment modal not logged in with selected post", async () => {
    setup(null);
    useSelectorMock.mockReturnValue({
      posts: {
        selectedPost: "post-1",
      },
    });
    const { CommentModal } = await import("~/components/CommentModal");
    const body = renderWithProviders(<CommentModal />);
    expect(body.baseElement).toMatchSnapshot();
  });

  it("render comment modal logged in with selected post", async () => {
    setup(reader);
    useSelectorMock.mockReturnValue({
      posts: {
        selectedPost: "post-1",
      },
    });
    const { CommentModal } = await import("~/components/CommentModal");
    const body = renderWithProviders(<CommentModal />);
    expect(body.baseElement).toMatchSnapshot();
  });
});
