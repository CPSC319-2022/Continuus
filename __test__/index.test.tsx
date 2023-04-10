import { expect, describe, it, vi, beforeEach } from "vitest";
import { render, screen, within } from "@testing-library/react";
import Home from "../src/pages/index";

vi.mock("next-auth/react", () => ({
  useSession: () => ({
    data: {
      expires: "1",
      user: { id: "1", email: "a", name: "hi", image: "c" },
    },
  }),
}));

vi.mock("../src/utils/api", () => ({
  api: {
    user: {
      currentUser: {
        useQuery: () => ({
          data: null
        })
      }
    }
  },
}));

describe("Sample test suite", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it.skip("should render the component", () => {
    render(<Home />);
    const main = within(screen.getByRole("main"));
    expect(
      main.getByRole("heading", { level: 1, name: "Create T3 App" })
    ).toBeDefined();
  });
});
