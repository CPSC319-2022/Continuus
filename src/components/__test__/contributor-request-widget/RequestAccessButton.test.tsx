import { describe, it, expect, beforeEach, vi } from "vitest";
import { cleanup, render } from "@testing-library/react";

vi.mock("next-auth/react", () => ({
  useSession: () => ({
    data: {
      expires: "1",
      user: { id: "test-user-id", email: "a", name: "hi", image: "c" },
    },
  }),
}));

const admin = {
  createdAt: new Date(),
  email: "email",
  id: "admin-id",
  image: "image",
  name: "admin",
  role: "ADMIN",
  contributorRequest: [],
  updatedAt: new Date(),
};

const reader = {
  createdAt: new Date(),
  email: "email",
  id: "reader-id",
  image: "image",
  name: "reader",
  role: "READER",
  contributorRequest: [
    {
      id: "contribreq-id-1",
      createdAt: new Date(),
      user: {
        id: "reader-id",
        name: "reader",
        image: "image",
      },
    },
  ],
  updatedAt: new Date(),
};

const contributor = {
  createdAt: new Date(),
  email: "email",
  id: "contributor-id",
  image: "image",
  name: "contributor",
  role: "CONTRIBUTOR",
  contributorRequest: [],
  updatedAt: new Date(),
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
    const body = render(<RequestAccessButton />).baseElement;
    expect(body).toMatchSnapshot();
  });

  it("render as contributor", async () => {
    setup(contributor);
    const { RequestAccessButton } = await import(
      "~/components/contributor-request-widget/RequestAccessButton"
    );
    const body = render(<RequestAccessButton />).baseElement;
    expect(body).toMatchSnapshot();
  });

  it("render as reader", async () => {
    setup(reader);
    const { RequestAccessButton } = await import(
      "~/components/contributor-request-widget/RequestAccessButton"
    );
    const body = render(<RequestAccessButton />).baseElement;
    expect(body).toMatchSnapshot();
  });
});
