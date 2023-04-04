import { describe, it, expect, beforeEach, vi } from "vitest";
import { cleanup, render, screen, waitFor } from "@testing-library/react";
import { CommentProps } from "~/components/Comment";
import userEvent from "@testing-library/user-event";
import { renderWithProviders } from "../utils";

const setup = () => {
  vi.mock("next-auth/react", () => ({
    useSession: () => ({
      data: {
        expires: "1",
        user: { id: "test-user-id", email: "a", name: "hi", image: "c" },
      },
      status: "authenticated",
    }),
  }));
  vi.doMock("~/utils/api", () => ({
    api: {
      blogPost: {
        update: {
          useMutation: () => ({
            onSuccess: vi.fn(),
            isSuccess: true,
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
        blogPost: {
          get: {
            invalidate: vi.fn(),
          },
          count: {
            invalidate: vi.fn(),
          },
        },
      }),
    },
  }));
};

const props = {
  id: "test-id",
  title: "Test",
  content: "test",
};

describe("Update Blog Post Widget: Snapshot", () => {
  beforeEach(() => {
    cleanup();
    vi.clearAllMocks();
    vi.resetModules();
    vi.useRealTimers();
  });

  it("render widget", async () => {
    setup();
    const { UpdateBlogPostWidget } = await import(
      "~/components/update-blog-post-widget/UpdateBlogPostWidget"
    );
    const body = renderWithProviders(
      <UpdateBlogPostWidget {...props} />
    ).baseElement;
    expect(body).toMatchSnapshot();
  });

  it("render widget click button", async () => {
    setup();
    const { UpdateBlogPostWidget } = await import(
      "~/components/update-blog-post-widget/UpdateBlogPostWidget"
    );
    const body = renderWithProviders(<UpdateBlogPostWidget {...props} />);
    await userEvent.click(screen.getByTestId("update-blog-post-button"));
    expect(body.baseElement).toMatchSnapshot();
  });
});