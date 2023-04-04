import { describe, it, expect, beforeEach, vi } from "vitest";
import { cleanup, render, screen } from "@testing-library/react";
import { CommentProps } from "~/components/Comment";
import userEvent from "@testing-library/user-event";
import { renderWithProviders } from "./utils";

const props = {
  id: "test-id",
  title: "title",
  content: "test",
};

const setup = () => {
  vi.mock("~/utils/api", () => ({
    api: {
      blogPost: {
        update: {
          useMutation: () => ({
            isSuccess: false,
            isLoading: false,
          }),
        },
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
      useContext: () => ({
        blogPost: {
          get: {
            invalidate: vi.fn(),
          },
        },
      }),
    },
  }));
};

describe("Blog post actions menu: Snapshot", () => {
  it("isAuthor", async () => {
    setup();
    const { BlogPostActionsMenu } = await import(
      "~/components/BlogPostActionsMenu"
    );
    const body = renderWithProviders(
      <BlogPostActionsMenu {...props} isAuthor={true} />
    ).baseElement;
    expect(body).toMatchSnapshot();
  });

  it("!isAuthor", async () => {
    setup();
    const { BlogPostActionsMenu } = await import(
      "~/components/BlogPostActionsMenu"
    );
    const body = renderWithProviders(
      <BlogPostActionsMenu {...props} isAuthor={false} />
    ).baseElement;
    expect(body).toMatchSnapshot();
  });
});
