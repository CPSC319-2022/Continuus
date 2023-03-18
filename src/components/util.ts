import type { User } from "@prisma/client";

export const isAuthed = (status: string) => {
  if (status === "authenticated") {
    return true;
  } else if (status === "unauthenticated") {
    return false;
  }
}

export const isAuthor = (currUserData: User, authorUserId: string) => {
  if ((currUserData !== null) && (currUserData !== undefined)) {
    return currUserData.id === authorUserId;
  }
}

export const isAdmin = (currUserData: User) => {
  if ((currUserData !== null) && (currUserData !== undefined)) {
    return currUserData.role === "ADMIN";
  }
  return false;
}