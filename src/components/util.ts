import type { User } from "@prisma/client";

export const isAuthed = (status: string) => {
  if (status === "authenticated") {
    return true;
  } else if (status === "unauthenticated") {
    return false;
  }
}

export const isAuthor = (currUserData: User | null | undefined, authorUserId: string) => {
  if ((currUserData !== null) && (currUserData !== undefined)) {
    if (currUserData.id === authorUserId)
      return true;
  }
  return false;
}

export const isAdmin = (currUserData: User | null | undefined) => {
  if ((currUserData !== null) && (currUserData !== undefined)) {
    if (currUserData.role === "ADMIN")
      return true;
  }
  return false;
}

export const shouldSeeActions = (status: string, currUserData: User | null | undefined, authorUserId: string) => {
  return ((isAuthed(status) && isAuthor(currUserData, authorUserId)) || (isAuthed(status) && isAdmin(currUserData)))
}