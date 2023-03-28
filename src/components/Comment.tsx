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
}

export const Comment: React.FC<CommentProps> = ({
                                                  dateAdded,
                                                  comment,
                                                  name,
                                                  userId,
                                                  imgUrl,
                                                  commentId,
                                                }) => {
  const utils = api.useContext();
  const { status } = useSession();
  const [editInput, setEditInput] = useState<string>(comment);
  const [isEditing, setIsEditing] = useState(false);
  const currUser = api.user.currentUser.useQuery();

  const updateCommentMutation = api.comment.update.useMutation({
    onSuccess(data, variables, context) {
      return utils.comment.invalidate();
    }
  });

  useEffect(() => {
    if (updateCommentMutation.isSuccess) {
      setIsEditing(false);
    }
  }, [updateCommentMutation.isSuccess]);

  const fetchedComment = api.comment.getUnique.useQuery({
    where: {
      id: commentId
    }
  });

  if (fetchedComment.data !== undefined)
    comment = fetchedComment.data.content;

  const shouldSeeEdit = () => {
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
    updateCommentMutation.mutate({
      where: {
        id: commentId
      },
      data: {
        content: editInput
      }
    });
  };

  return (
    <>
      <div className="bg-slate-100 p-3 m-3">
        <div className="flex">
          <div className="avatar self-center">
            <ProfilePicture size={2.5}
                            redirectLink={userPathToProfile(userId)}
                            imgUrl={imgUrl} />
          </div>
          <div className="ml-3">
            <ProfileName name={name || ""} userId={userId} />
            <p className="text-sm text-slate-400">{timeAgo(dateAdded)}</p>
          </div>
          {
            shouldSeeEdit() &&
              <div className="ml-auto">
                  <button className="p-1.5 bg-green-600 rounded-xl hover:rounded-3xl hover:bg-green-800 transition-all duration-300 text-white" onClick={() => {
                    setIsEditing(true);
                  }}>
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24"
                           stroke="currentColor" stroke-width="2">
                          <path stroke-linecap="round" stroke-linejoin="round"
                                d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                      </svg>
                  </button>
              </div>
          }
        </div>
        {
          updateCommentMutation.isLoading ?
            <div className="flex h-96 w-full items-center justify-center">
              <Spinner size={12} />
            </div> : isEditing ?
              <div>
                <input type="text" value={editInput} onChange={handleInputChange}
                       className="border-highlight-green bg-highlight-green" />
                <button onClick={() => handleCommentUpdate()}>Save</button>
                <button onClick={(event) => handleUpdateCancel(event)}>Cancel</button>
              </div> : <p className="mt-4 w-full">{comment}</p>
        }
      </div>
    </>
  );
};
