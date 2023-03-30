import { describe, it, expect, beforeEach, vi } from "vitest";
import { cleanup, render, screen } from "@testing-library/react";
import { CommentProps } from "~/components/Comment";

const mockCommentProps: CommentProps = {
  dateAdded: new Date(),
  comment: "Hello world",
  name: "Test User",
  userId: "test-user-id",
  imgUrl: "https://i.stack.imgur.com/34AD2.jpg",
  commentId: "test-comment-id",
  dateUpdated: new Date(),
};

vi.mock("next-auth/react", () => ({
  useSession: () => ({
    data: {
      expires: "1",
      user: { id: "test-user-id", email: "a", name: "hi", image: "c" },
    },
  }),
}));

const initialMock = {
  api: {
    comment: {
      getUnique: {
        useQuery: () => ({
          data: {
            id: "test-comment-id",
            userId: "test-user-id",
            blogPostId: "test-blog-post-id",
            content: "Hello world",
            createdAt: new Date(),
            updatedAt: new Date(),
          },
          isLoading: false,
        }),
      },
      update: {
        useMutation: () => ({
          isSuccess: false,
        }),
      },
      delete: {
        useMutation: () => ({
          isSuccess: false,
        }),
      },
    },
    user: {
      currentUser: {
        useQuery: () => ({
          data: null,
          isLoading: false,
        }),
      },
    },
    useContext: () => ({
      comment: {
        get: {
          invalidate: vi.fn(),
        },
        count: {
          invalidate: vi.fn(),
        },
      },
    }),
  },
};

describe("Snapshot: Comment", () => {
  beforeEach(() => {
    cleanup();
    vi.clearAllMocks();
    vi.resetModules();
  });

  const setup = (mock: any) => {
    vi.doMock("~/utils/api", () => ({ ...mock }));
  };

  it("render comment", async () => {
    setup(initialMock);
    const { Comment } = await import("~/components/Comment");
    const body = render(<Comment {...mockCommentProps} />).baseElement;
    expect(body).toMatchSnapshot();
  });

  it("render comment updated", async () => {
    setup({
      ...initialMock,
      api: {
        ...initialMock.api,
        comment: {
          ...initialMock.api.comment,
          update: { useMutation: () => ({ isSuccess: true }) },
        },
      },
    });
    const { Comment } = await import("~/components/Comment");
    const body = render(<Comment {...mockCommentProps} />).baseElement;
    expect(body).toMatchSnapshot();
  });

  it("render comment deleted", async () => {
    setup({
      ...initialMock,
      api: {
        ...initialMock.api,
        comment: {
          ...initialMock.api.comment,
          delete: { useMutation: () => ({ isSuccess: true }) },
        },
      },
    });
    const { Comment } = await import("~/components/Comment");
    const body = render(<Comment {...mockCommentProps} />).baseElement;
    expect(body).toMatchSnapshot();
  });
});
