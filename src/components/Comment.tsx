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
      <div>
        <hr className="my-4 mx-[-20px] h-px border-gray-200" />
      </div>
      <div>
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
              <div>
                  <button onClick={() => {
                    setIsEditing(true);
                  }}>
                      Edit comment
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
