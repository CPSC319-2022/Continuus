import { userPathToProfile } from "~/utils/profile";
import { timeAgo } from "~/utils/time";
import { ProfileName } from "./ProfileName";
import { ProfilePicture } from "./ProfilePicture";
import React, { useEffect, useState } from "react";
import { api } from "~/utils/api";
import { useSession } from "next-auth/react";
import { isAuthed, isAuthor } from "~/components/util";
import { Spinner } from "~/components/Spinner";

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
        <div className="m-3 rounded-md bg-slate-100 p-4">
          <h1>Are you sure you want to delete this comment?</h1>
          <button
            className="ml-2 mt-3 rounded bg-red-600 py-0.5 px-2 text-white hover:bg-red-800"
            onClick={() => handleCommentDelete()}
          >
            Delete
          </button>
          <button
            className="ml-2 mt-3 rounded bg-gray-300 py-0.5 px-2 text-gray-800 hover:bg-gray-400"
            onClick={(event) => {
              event.preventDefault();
              setIsDeletePending(false);
            }}
          >
            Cancel
          </button>
        </div>
      ) : (
        !isDeleted && (
          <div className="m-3 rounded-md border-b p-4">
            <div className="flex">
              <div className="avatar self-center">
                <ProfilePicture
                  size={2.5}
                  redirectLink={userPathToProfile(userId)}
                  imgUrl={imgUrl}
                />
              </div>
              <div className="ml-3">
                <ProfileName name={name || ""} userId={userId} />
                <p className="text-sm tex-gray-400">
                  {timeAgo(dateAdded)}
                  {dateAdded.getTime() !== dateUpdated.getTime()
                    ? ` (updated ${timeAgo(dateUpdated)})`
                    : ""}
                </p>
              </div>
              {shouldSeeCommentActions() && (
                <div className="ml-auto">
                  <button
                    className="rounded-xl bg-green-600 p-1.5 text-white transition-all duration-300 hover:rounded-3xl hover:bg-green-800"
                    onClick={() => {
                      setIsEditing(true);
                    }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      stroke-width="2"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                      />
                    </svg>
                  </button>
                  <button
                    className="ml-3 mr-2 rounded-xl bg-red-700 p-1.5 text-white transition-all duration-300 hover:rounded-3xl hover:bg-red-900"
                    onClick={() => setIsDeletePending(true)}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      className="bi bi-trash h-5 w-5"
                      viewBox="0 0 16 16"
                    >
                      <path
                        d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"
                        fill="white"
                      ></path>
                      <path
                        fill-rule="evenodd"
                        d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"
                        fill="white"
                      ></path>
                    </svg>
                  </button>
                </div>
              )}
            </div>
            {updateCommentMutation.isLoading ? (
              <div className="flex w-full items-center justify-center">
                <Spinner size={2} />
              </div>
            ) : isEditing ? (
              <div className="mt-3 p-2">
                <input
                  type="text"
                  value={editInput}
                  onChange={handleInputChange}
                  className="border-2 border-slate-500"
                />
                <button
                  className={`ml-2 rounded bg-gray-300 py-0.5 px-2 text-gray-800 ${
                    editInput ? "hover:bg-gray-400" : "cursor-not-allowed"
                  }`}
                  onClick={() => handleCommentUpdate()}
                >
                  Save
                </button>
                <button
                  className="ml-2 rounded bg-gray-300 py-0.5 px-2 text-gray-800 hover:bg-gray-400"
                  onClick={(event) => handleUpdateCancel(event)}
                >
                  Cancel
                </button>
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
