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

const date = new Date();

const admin = {
  createdAt: date,
  email: "email",
  id: "admin-id",
  image: "image",
  name: "admin",
  role: "ADMIN",
  contributorRequest: [],
  updatedAt: date,
};

const reader = {
  createdAt: date,
  email: "email",
  id: "reader-id",
  image: "image",
  name: "reader",
  role: "READER",
  contributorRequest: [
    {
      id: "contribreq-id-1",
      createdAt: date,
      user: {
        id: "reader-id",
        name: "reader",
        image: "image",
      },
    },
  ],
  updatedAt: date,
};

const contributor = {
  createdAt: date,
  email: "email",
  id: "contributor-id",
  image: "image",
  name: "contributor",
  role: "CONTRIBUTOR",
  contributorRequest: [],
  updatedAt: date,
};

describe("Request Access button: Snapshot", () => {
  beforeEach(() => {
    cleanup();
    vi.clearAllMocks();
    vi.resetModules();
  });

  const setup = (user: any) => {
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
          create: {
            useMutation: () => ({
              mutate: vi.fn(),
              mutateAsync: vi.fn(),
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

  it("render as admin", async () => {
    setup(admin);
    const { RequestAccessButton } = await import(
      "~/components/contributor-request-widget/RequestAccessButton"
    );
    const body = renderWithProviders(<RequestAccessButton />).baseElement;
    expect(body).toMatchSnapshot();
  });

  it("render as contributor", async () => {
    setup(contributor);
    const { RequestAccessButton } = await import(
      "~/components/contributor-request-widget/RequestAccessButton"
    );
    const body = renderWithProviders(<RequestAccessButton />).baseElement;
    expect(body).toMatchSnapshot();
  });

  it("render as reader", async () => {
    setup(reader);
    const { RequestAccessButton } = await import(
      "~/components/contributor-request-widget/RequestAccessButton"
    );
    const body = renderWithProviders(<RequestAccessButton />).baseElement;
    expect(body).toMatchSnapshot();
  });
});
