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

const props = {
  isOpen: true,
  setIsOpen: vi.fn(),
};

const initialMock = {
  api: {
    user: {
      currentUser: {
        useQuery: () => ({
          data: null,
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
};

describe("Contributor Request Menu: Snapshot", () => {
  beforeEach(() => {
    cleanup();
    vi.clearAllMocks();
    vi.resetModules();
  });

  const setup = (mock: any) => {
    vi.doMock("~/utils/api", () => ({ ...mock }));
  };

  it("render menu open with 2 requests", async () => {
    setup(initialMock);
    const { ContributorRequestMenu } = await import(
      "~/components/contributor-request-widget/ContributorRequestMenu"
    );
    const body = renderWithProviders(<ContributorRequestMenu {...props} />).baseElement;
    expect(body).toMatchSnapshot();
  });

  it("render menu open with no requests", async () => {
    setup({
      ...initialMock,
      api: {
        ...initialMock.api,
        contributorRequest: {
          ...initialMock.api.contributorRequest,
          getAll: {
            useQuery: () => ({
              data: [],
              isLoading: false,
            }),
          },
        },
      },
    });
    const { ContributorRequestMenu } = await import(
      "~/components/contributor-request-widget/ContributorRequestMenu"
    );
    const body = renderWithProviders(<ContributorRequestMenu {...props} />).baseElement;
    expect(body).toMatchSnapshot();
  });

  it("render menu closed", async () => {
    setup(initialMock);
    const { ContributorRequestMenu } = await import(
      "~/components/contributor-request-widget/ContributorRequestMenu"
    );
    const body = renderWithProviders(
      <ContributorRequestMenu isOpen={false} setIsOpen={vi.fn} />
    ).baseElement;
    expect(body).toMatchSnapshot();
  });
});
