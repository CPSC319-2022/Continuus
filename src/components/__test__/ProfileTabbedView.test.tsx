import { describe, it, expect, beforeEach, vi } from "vitest";
import { cleanup, render, screen, waitFor } from "@testing-library/react";
import { renderWithProviders } from "./utils";
import userEvent from "@testing-library/user-event";
import { adminUser, blogPosts } from "./BlogPostViewer.test";
import { mockComments } from "./CommentModal.test";

const props = {
  userId: "test-id",
  createdAt: new Date(),
  name: "test user",
  imgUrl: "image",
};

vi.mock("next-auth/react", () => ({
  useSession: () => ({
    data: {
      expires: "1",
      user: { id: "test-user-id", email: "a", name: "hi", image: "c" },
    },
  }),
}));

const setup = () => {
  vi.doMock("~/utils/time", () => ({
    timeAgo: () => "1 second ago",
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
        count: {
          useQuery: () => ({
            data: 5,
            isLoading: false,
          }),
        },
      },
      comment: {
        count: {
          useQuery: () => ({
            data: 5,
            isLoading: false,
          }),
        },
        get: {
          useInfiniteQuery: () => ({
            data: {
              pages: [
                {
                  items: mockComments.map((comment) => ({
                    ...comment,
                    blogPost: {
                      id: comment.blogPostId,
                      title: "test blog post",
                    },
                  })),
                },
              ],
            },
            fetchNextPage: vi.fn(),
            hasNextPage: false,
            status: null,
          }),
        },
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
        user: {
          invalidate: vi.fn(),
        },
      }),
    },
  }));
};

describe("Profile tabbed view: Snapshot", () => {
  beforeEach(() => {
    cleanup();
    vi.clearAllMocks();
    vi.resetModules();
  });

  it("should render profile tabbed view in blog post mode", async () => {
    setup();
    const { ProfileTabbedView } = await import(
      "~/components/ProfileTabbedView"
    );
    const body = renderWithProviders(
      <ProfileTabbedView {...props} />
    ).baseElement;
    expect(body).toMatchSnapshot();
  });

  it("should render profile tabbed view in comment mode", async () => {
    setup();
    const { ProfileTabbedView } = await import(
      "~/components/ProfileTabbedView"
    );
    const body = renderWithProviders(<ProfileTabbedView {...props} />);
    const commentTab = screen.getByTestId("tab-comment-viewer");
    await userEvent.click(commentTab);
    await waitFor(() => {
      expect(screen.getByTestId("comment-viewer")).toBeTruthy();
    });
    expect(body.baseElement).toMatchSnapshot();
  });
});
