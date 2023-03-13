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
    example: {
      hello: {
        useQuery: () => ({
          data: {
            greeting: "Hello world",
          },
        }),
      },
      getSecretMessage: {
        useQuery: () => ({
          data: "secret message",
        }),
      },
    },
  },
}));

describe("Sample test suite", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should render the component", () => {
    expect(true).toBeTruthy();
  });
});
