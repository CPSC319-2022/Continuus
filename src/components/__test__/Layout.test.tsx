import { describe, it, expect, beforeEach, vi } from "vitest";
import { cleanup, render, screen } from "@testing-library/react";
import { CommentProps } from "~/components/Comment";
import userEvent from "@testing-library/user-event";
import { renderWithProviders } from "./utils";

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
  vi.mock("next/router", () => ({
    useRouter: () => ({
      asPath: "/",
    }),
  }));

  vi.mock("~/utils/api", () => ({
    api: {
      user: {
        currentUser: {
          useQuery: () => ({
            data: {
              createdAt: new Date(),
              email: "email",
              id: "test-user-id",
              image: "image",
              name: "contributor",
              role: "CONTRIBUTOR",
              contributorRequest: [],
              updatedAt: new Date(),
            },
            isLoading: false,
          }),
        },
        searchUsers: {
          useQuery: () => ({
            data: [],
            isLoading: false,
          }),
        },
      },
      contributorRequest: {
        create: {
          useMutation: () => ({
            mutate: vi.fn(),
            mutateAsync: vi.fn(),
          }),
        },
      },
      blogPost: {
        search: {
          useQuery: () => ({
            data: [],
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
  }));
};

describe("Layout: Snapshot", () => {
  beforeEach(() => {
    cleanup();
    vi.clearAllMocks();
    vi.resetModules();
  });

  it("Render layout", async () => {
    setup();
    const { Layout } = await import("~/components/Layout");
    const body = renderWithProviders(<Layout />).baseElement;
    expect(body).toMatchSnapshot();
  });
});
