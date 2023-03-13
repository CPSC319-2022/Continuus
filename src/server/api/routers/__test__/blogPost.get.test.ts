import { PrismaClient, User } from "@prisma/client";
import type { Session } from "next-auth";
import { describe, it, expect, beforeEach } from "vitest";
import { mockDeep, mockReset } from "vitest-mock-extended";
import { appRouter } from "../../root";

describe("Retrieving Blog Posts", () => {
  const prismaMock = mockDeep<PrismaClient>();
  const mockUser: User = {
    id: "reader",
    name: "Reader User",
    role: "READER",
    email: null,
    emailVerified: null,
    image: null,
  };

  const mockSession: Session = {
    expires: new Date().toISOString(),
    user: mockUser,
  };

  beforeEach(() => {
    mockReset(prismaMock);
  });

  it("TODO", () => {
    expect(true).toBeTruthy();
  });
});
