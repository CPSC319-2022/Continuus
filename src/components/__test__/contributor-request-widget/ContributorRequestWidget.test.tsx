import { describe, it, expect, beforeEach, vi } from "vitest";
import { cleanup, render } from "@testing-library/react";
import { renderWithProviders } from "../utils";

vi.mock("next-auth/react", () => ({
  useSession: () => ({
    data: {
      expires: "1",
      user: { id: "test-user-id", email: "a", name: "hi", image: "c" },
    },
  }),
}));

const adminuser = {
  createdAt: new Date(),
  email: "email",
  id: "admin-id",
  image: "image",
  name: "admin",
  role: "ADMIN",
  updatedAt: new Date(),
};

const reader = {
  createdAt: new Date(),
  email: "email",
  id: "reader-id",
  image: "image",
  name: "reader",
  role: "READER",
  updatedAt: new Date(),
};

describe("Contributor Request Menu: Snapshot", () => {
  beforeEach(() => {
    cleanup();
    vi.clearAllMocks();
    vi.resetModules();
  });

  const setup = (user = adminuser) => {
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
        contributorRequest: {
          getAll: {
            useQuery: () => ({
              data: [
                {
                  id: "contribreq-id-1",
                  createdAt: new Date(),
                  user: {
                    id: "user-id-1",
                    name: "test user 1",
                    image: "image",
                  },
                },
                {
                  id: "contribreq-id-2",
                  createdAt: new Date(),
                  user: {
                    id: "user-id-2",
                    name: "test user 2",
                    image: "image",
                  },
                },
              ],
              isLoading: false,
            }),
          },
          delete: {
            useMutation: () => ({
              mutate: vi.fn(),
              mutateAsync: vi.fn(),
            }),
          },
        },
        useContext: () => ({
          contributorRequest: {
            invalidate: vi.fn(),
          },
        }),
      },
    }));
  };

  it("render as admin", async () => {
    setup(adminuser);
    const { ContributorRequestWidget } = await import(
      "~/components/contributor-request-widget/ContributorRequestWidget"
    );
    const body = renderWithProviders(<ContributorRequestWidget />).baseElement;
    expect(body).toMatchSnapshot();
  });

  it("render as reader", async () => {
    setup(reader);
    const { ContributorRequestWidget } = await import(
      "~/components/contributor-request-widget/ContributorRequestWidget"
    );
    const body = renderWithProviders(<ContributorRequestWidget />).baseElement;
    expect(body).toMatchSnapshot();
  });
});
