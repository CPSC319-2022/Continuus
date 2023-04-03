import { userPathToProfile } from "~/utils/profile";
import { timeAgo } from "~/utils/time";
import { ProfileName } from "./ProfileName";
import { ProfilePicture } from "./ProfilePicture";
import React, { useEffect, useState } from "react";
import { api } from "~/utils/api";
import { useSession } from "next-auth/react";
import { isAuthed, isAuthor } from "~/components/util";
import { Spinner } from "~/components/Spinner";
import { MenuIcon } from "~/icons/Menu";

export interface CommentProps {
  dateAdded: Date;
  comment: string;
  name?: string | null;
  userId: string;
  imgUrl?: string | null;
  commentId: string;
  dateUpdated: Date;
}

export const Comment: React.FC<CommentProps> = ({
  dateAdded,
  comment,
  name,
  userId,
  imgUrl,
  commentId,
  dateUpdated,
}) => {
  const utils = api.useContext();
  const { status } = useSession();
  const [editInput, setEditInput] = useState<string>(comment);
  const [isEditing, setIsEditing] = useState(false);
  const [isDeletePending, setIsDeletePending] = useState(false);
  const [isDeleted, setIsDeleted] = useState(false);
  const currUser = api.user.currentUser.useQuery();

  const updateCommentMutation = api.comment.update.useMutation({
    onSuccess: () =>
      Promise.all([
        utils.comment.invalidate(),
        utils.blogPost.getOne.invalidate(),
        utils.blogPost.get.invalidate(),
      ]),
  });

  const deleteCommentMutation = api.comment.delete.useMutation({
    onSuccess: () =>
      Promise.all([
        utils.blogPost.getOne.invalidate(),
        utils.blogPost.get.invalidate(),
      ]),
  });

  useEffect(() => {
    if (updateCommentMutation.isSuccess) setIsEditing(false);
  }, [updateCommentMutation.isSuccess]);

  useEffect(() => {
    if (deleteCommentMutation.isSuccess) {
      setIsDeleted(true);
      setIsDeletePending(false);
    }
  }, [deleteCommentMutation.isSuccess]);

  const fetchedComment = api.comment.getUnique.useQuery({
    where: {
      id: commentId,
    },
  });

  if (fetchedComment.data !== undefined) comment = fetchedComment.data.content;

  const shouldSeeCommentActions = () => {
    return isAuthed(status) && isAuthor(currUser.data, userId);
  };

  const handleInputChange = (event: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setEditInput(event.target.value);
  };

  const handleUpdateCancel = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setIsEditing(false);
    setEditInput(comment);
  };

  const handleCommentUpdate = () => {
    if (editInput) {
      updateCommentMutation.mutate({
        where: {
          id: commentId,
        },
        data: {
          content: editInput,
        },
      });
    }
  };

  const handleCommentDelete = () => {
    deleteCommentMutation.mutate({
      where: {
        id: commentId,
      },
    });
  };

  return (
    <>
      {isDeletePending ? (
        <div className="mb-4">
          <button
            className="absolute right-12 rounded-full transition-colors transition-all after:content-['\2715'] hover:scale-125 hover:text-highlight-red"
            onClick={(event) => {
              event.preventDefault();
              setIsDeletePending(false);
            }}
          ></button>
          <div className="flex h-20 w-full items-center justify-center">
            <div className="text-lg">
              Are you sure you want to delete this comment?
            </div>
          </div>
          <div className="flex justify-end border-b pb-3">
            <button
              className={
                "h-10 w-32 rounded-md border bg-highlight-red text-center text-white transition-all hover:cursor-pointer hover:bg-gray-700"
              }
              onClick={() => handleCommentDelete()}
            >
              Delete
            </button>
          </div>
        </div>
      ) : (
        !isDeleted && (
          <div className="relative m-3 rounded-md border-b p-4">
            <div className="flex">
              <div className="avatar self-center transition-all hover:scale-110">
                <ProfilePicture
                  size={2.5}
                  redirectLink={userPathToProfile(userId)}
                  imgUrl={imgUrl}
                />
              </div>
              <div className="ml-3">
                <ProfileName name={name || ""} userId={userId} />
                <p className="tex-gray-400 text-sm">
                  {timeAgo(dateAdded)}
                  {dateAdded.getTime() !== dateUpdated.getTime()
                    ? ` (updated ${timeAgo(dateUpdated)})`
                    : ""}
                </p>
              </div>
              {shouldSeeCommentActions() && (
                <div className="absolute right-4 mt-[-12px] self-center">
                  <div className="dropdown-left dropdown rounded-md">
                    <button
                      className="transition-all hover:scale-125"
                      data-testid="comment-actions-button"
                    >
                      <MenuIcon />
                    </button>
                    <ul
                      tabIndex={0}
                      className="dropdown-content menu mt-8 mr-[-16px] w-52 rounded-md border bg-white shadow"
                    >
                      <li
                        data-testid="edit-comment"
                        className="p-3 text-start transition-all hover:cursor-pointer hover:bg-gray-100"
                        onClick={() => setIsEditing(true)}
                      >
                        Edit
                      </li>
                      <li
                        data-testid="delete-comment"
                        className="p-3 text-start transition-all hover:cursor-pointer hover:bg-gray-100"
                        onClick={() => setIsDeletePending(true)}
                      >
                        Delete
                      </li>
                    </ul>
                  </div>
                </div>
              )}
            </div>
            {updateCommentMutation.isLoading ? (
              <div className="flex w-full items-center justify-center">
                <Spinner size={2} />
              </div>
            ) : isEditing ? (
              <div className="mt-3 p-2" data-testid="edit-comment-div">
                <input
                  autoFocus
                  type="text"
                  placeholder="Can't be empty!"
                  value={editInput}
                  onChange={handleInputChange}
                  className="input-bordered mb-3 w-full rounded-md border p-3"
                />
                <div className="flex justify-end gap-2">
                  <button
                    className={`h-10 w-32 rounded-md ${
                      !editInput
                        ? "input-disabled cursor-not-allowed bg-gray-200 text-black"
                        : "border-highlight-green bg-highlight-green transition-all hover:bg-gray-700 hover:text-highlight-green"
                    }`}
                    onClick={() => handleCommentUpdate()}
                    disabled={!editInput ? true : false}
                  >
                    Save
                  </button>
                  <button
                    className="h-10 w-32 rounded-md border bg-white text-center text-black transition-all hover:cursor-pointer hover:bg-highlight-red hover:text-white"
                    onClick={(event) => handleUpdateCancel(event)}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <div className="break-words">
                <p className="mt-4 w-full">{comment}</p>
              </div>
            )}
          </div>
        )
      )}
    </>
  );
};
