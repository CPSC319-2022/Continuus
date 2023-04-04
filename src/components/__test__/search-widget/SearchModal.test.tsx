import { describe, it, expect, beforeEach, vi } from "vitest";
import { cleanup, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { renderWithProviders } from "../utils";

const props = {
  isOpen: true,
  setIsOpen: vi.fn(),
};

const userResults = [
  {
    id: "id1",
    name: "test1",
    image: "test1",
  },
  {
    id: "id2",
    name: "test2",
    image: "test2",
  },
  {
    id: "id3",
    name: "test3",
    image: "test3",
  },
];

const date = new Date();

const blogResults = [
  {
    id: "id1",
    title: "title1",
    updatedAt: date,
    createdAt: date,
    content: "test",
    user: {
      name: "test1",
      image: "image",
    },
  },
  {
    id: "id2",
    title: "title2",
    updatedAt: date,
    createdAt: date,
    content: "test",
    user: {
      name: "test2",
      image: "image",
    },
  },
];

const setup = (userResults: any = [], blogResults: any = []) => {
  vi.doMock("~/utils/api", () => ({
    api: {
      user: {
        searchUsers: {
          useQuery: () => ({
            data: userResults,
            isLoading: false,
          }),
        },
      },
      blogPost: {
        search: {
          useQuery: () => ({
            data: blogResults,
            isLoading: false,
          }),
        },
      },
    },
  }));
};

describe("Search: Snapshot", () => {
  beforeEach(() => {
    cleanup();
    vi.clearAllMocks();
    vi.resetModules();
  });

  beforeEach(() => {
    vi.useRealTimers();
  });

  it("render with no results", async () => {
    setup();
    const { SearchModal } = await import(
      "~/components/search-widget/SearchModal"
    );
    const body = renderWithProviders(<SearchModal {...props} />).baseElement;
    expect(body).toMatchSnapshot();
  });

  it("render with blog results", async () => {
    setup([], blogResults);
    const { SearchModal } = await import(
      "~/components/search-widget/SearchModal"
    );
    const body = renderWithProviders(<SearchModal {...props} />);
    const input = screen.getByTestId("search-input");
    await userEvent.type(input, "hello");
    await waitFor(() => {
      expect(screen.getAllByTestId("search-posts")).toHaveLength(2);
    });
    expect(body.baseElement).toMatchSnapshot();
  });

  it("render with user results", async () => {
    setup(userResults, []);
    const { SearchModal } = await import(
      "~/components/search-widget/SearchModal"
    );
    const body = renderWithProviders(<SearchModal {...props} />);
    const input = screen.getByTestId("search-input");
    await userEvent.type(input, "@test");
    await waitFor(() => {
      expect(screen.getAllByTestId("search-users")).toHaveLength(3);
    });
    expect(body.baseElement).toMatchSnapshot();
  });
});
