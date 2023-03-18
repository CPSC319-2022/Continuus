import type { User } from "@prisma/client";

const isAuthed = (status: string) => {
  if (status === "authenticated") {
    return true;
  } else if (status === "unauthenticated") {
    return false;
  }
}

const isAuthor = (currUserData: User | null | undefined, authorUserId: string) => {
  if ((currUserData !== null) && (currUserData !== undefined)) {
    return currUserData.id === authorUserId;
  }
}

export const isAdmin = (currUserData: User | null | undefined) => {
  if ((currUserData !== null) && (currUserData !== undefined)) {
    return currUserData.role === "ADMIN";
  }
  return false;
}

export const hasPermissionToAccess = (status: string, currUserData: User | null | undefined, authorUserId: string) => {
  return ((isAuthed(status) && isAuthor(currUserData, authorUserId)) || (isAuthed(status) && isAdmin(currUserData)))
}