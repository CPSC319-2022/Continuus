import { describe, it, expect, beforeEach, vi } from "vitest";
import { cleanup, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { renderWithProviders } from "../utils";

const setup = (isSuccess: boolean) => {
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
            isSuccess,
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
    setup(false);
    const { UpdateBlogPostWidget } = await import(
      "~/components/update-blog-post-widget/UpdateBlogPostWidget"
    );
    const body = renderWithProviders(
      <UpdateBlogPostWidget {...props} />
    ).baseElement;
    expect(body).toMatchSnapshot();
  });

  it("update not successful", async () => {
    setup(false);
    const { UpdateBlogPostWidget } = await import(
      "~/components/update-blog-post-widget/UpdateBlogPostWidget"
    );
    const body = renderWithProviders(<UpdateBlogPostWidget {...props} />);
    await userEvent.click(screen.getByTestId("update-blog-post-button"));
    expect(body.baseElement).toMatchSnapshot();
  });

  it("update successful", async () => {
    setup(true);
    const { UpdateBlogPostWidget } = await import(
      "~/components/update-blog-post-widget/UpdateBlogPostWidget"
    );
    const body = renderWithProviders(<UpdateBlogPostWidget {...props} />);
    await userEvent.click(screen.getByTestId("update-blog-post-button"));
    
    await new Promise ((resolve) => setTimeout(() => resolve(true), 500));
    expect(body.baseElement).toMatchSnapshot();
  });
});
