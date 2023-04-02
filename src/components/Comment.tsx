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
            className="absolute right-12 rounded-full transition-colors after:content-['\2715'] hover:text-highlight-red hover:scale-125 transition-all"
            onClick={(event) => {
              event.preventDefault();
              setIsDeletePending(false);
            }}>
          </button>
          <div className="flex h-20 w-full items-center justify-center">
            <div className="text-lg">Are you sure you want to delete this comment?</div>
          </div>
          <div className="flex justify-end border-b pb-3">
            <button
              className={"h-10 rounded-md border bg-highlight-red w-32 text-center text-white hover:cursor-pointer hover:bg-gray-700 transition-all"}
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
              <div className="avatar self-center hover:scale-110 transition-all">
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
              <div className="absolute right-4 self-center mt-[-12px]">
                <div className="dropdown-left dropdown rounded-md">
                  <button className="hover:scale-125 transition-all">
                    <MenuIcon/>
                  </button>
                  <ul
                    tabIndex={0}
                    className="dropdown-content menu rounded-md w-52 bg-white shadow border mt-8 mr-[-16px]"
                  >
                    <li
                      className="p-3 text-start hover:cursor-pointer hover:bg-gray-100 transition-all"
                      onClick={() => setIsEditing(true)}
                    >
                      Edit
                    </li>
                    <li
                      className="p-3 text-start hover:cursor-pointer hover:bg-gray-100 transition-all"
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
              <div className="mt-3 p-2">
                <input
                  type="text"
                  placeholder="Can't be empty!"
                  value={editInput}
                  onChange={handleInputChange}
                  className="input-bordered mb-3 w-full rounded-md border p-3"
                />
                <div className="flex justify-end gap-2">
                  <button
                    className={`h-10 rounded-md w-32 ${
                      !editInput 
                        ? "input-disabled cursor-not-allowed bg-gray-200 text-black"
                        : "border-highlight-green bg-highlight-green hover:bg-gray-700 hover:text-highlight-green transition-all"
                    }`}
                    onClick={() => handleCommentUpdate()}
                    disabled={!editInput ? true : false}
                  >
                    Save
                  </button>
                  <button
                    className="h-10 rounded-md border bg-white w-32 text-center text-black hover:cursor-pointer hover:text-white hover:bg-highlight-red transition-all"
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
