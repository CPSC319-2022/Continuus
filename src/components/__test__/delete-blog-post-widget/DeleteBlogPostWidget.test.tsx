import { describe, it, expect, beforeEach, vi } from "vitest";
import { cleanup, render, screen, waitFor } from "@testing-library/react";
import { CommentProps } from "~/components/Comment";
import userEvent from "@testing-library/user-event";

const mutateFn = vi.fn();

const setup = (isSuccess: boolean) => {
  vi.mock("~/utils/api", () => ({
    api: {
      blogPost: {
        delete: {
          useMutation: () => ({
            isSuccess: false,
            isLoading: false,
            mutate: mutateFn,
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

  it("delete confirmation", async () => {
    setup(true);

    const { DeleteBlogPostWidget } = await import(
      "~/components/delete-blog-post-widget/DeleteBlogPostWidget"
    );

    const body = render(<DeleteBlogPostWidget id="test-id" />);
    await userEvent.click(screen.getByTestId("delete-blog-post-button"));
    await waitFor(() => {
      expect(
        screen.getByText("Are you sure you want to delete this post?")
      ).toBeTruthy();
    });

    await new Promise ((resolve) => setTimeout(() => resolve(true), 500));
    expect(body.baseElement).toMatchSnapshot();
  });

  it("execute delete", async () => {
    setup(true);

    const { DeleteBlogPostWidget } = await import(
      "~/components/delete-blog-post-widget/DeleteBlogPostWidget"
    );

    render(<DeleteBlogPostWidget id="test-id" />);
    await userEvent.click(screen.getByTestId("delete-blog-post-button"));
    await userEvent.click(screen.getByTestId("submit-delete"));
    expect(mutateFn).toHaveBeenCalledTimes(1);
  });
});
