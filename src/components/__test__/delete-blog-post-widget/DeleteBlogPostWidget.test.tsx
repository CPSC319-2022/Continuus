import { describe, it, expect, beforeEach, vi } from "vitest";
import { cleanup, render, screen } from "@testing-library/react";
import { CommentProps } from "~/components/Comment";
import userEvent from "@testing-library/user-event";

const setup = (isSuccess: boolean) => {
  vi.mock("~/utils/api", () => ({
    api: {
      blogPost: {
        delete: {
          useMutation: () => ({
            isSuccess: false,
            isLoading: false,
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
    },
  }));
};

describe("Delete blog post widget: Snapshot", () => {
  beforeEach(() => {
    cleanup();
    vi.clearAllMocks();
    vi.resetModules();
  });

  it("render component", async () => {
    setup(false);

    const { DeleteBlogPostWidget } = await import(
      "~/components/delete-blog-post-widget/DeleteBlogPostWidget"
    );

    const body = render(<DeleteBlogPostWidget id="test-id" />).baseElement;
    expect(body).toMatchSnapshot();
  });

  it("open widget", async () => {
    setup(false);

    const { DeleteBlogPostWidget } = await import(
      "~/components/delete-blog-post-widget/DeleteBlogPostWidget"
    );

    const body = render(<DeleteBlogPostWidget id="test-id" />);
    await userEvent.click(screen.getByTestId("delete-blog-post-button"));
    expect(body.baseElement).toMatchSnapshot();
  });

  it("delete successful", async () => {
    setup(true);

    const { DeleteBlogPostWidget } = await import(
      "~/components/delete-blog-post-widget/DeleteBlogPostWidget"
    );

    const body = render(<DeleteBlogPostWidget id="test-id" />);
    await userEvent.click(screen.getByTestId("delete-blog-post-button"));
    expect(body.baseElement).toMatchSnapshot();
  });
});
