import { Comment } from "./Comment";
import React, { useState } from "react";
import { MenuIcon } from "~/icons/Menu";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkSlug from "remark-slug";
import type { Comment as CommentType, User } from "@prisma/client";
import { timeAgo } from "~/utils/time";
import { ProfilePicture } from "./ProfilePicture";
import { api } from "~/utils/api";

type CommentEntry = CommentType & { user: User };

export interface CommentModalProps {
  id: string;
  title: string;
  poster: string;
  lastUpdated: Date;
  post: string;
  posterAvatarUrl: string;
  comments: CommentEntry[];
}

export const CommentModal: React.FC<CommentModalProps> = ({
  id,
  title,
  poster,
  lastUpdated,
  post,
  posterAvatarUrl,
  comments,
}) => {
  const [input, setInput] = useState<string>("");

  const utils = api.useContext();

  const currUser = api.user.currentUser.useQuery();

  const createCommentMutation = api.comment.create.useMutation({
    onSuccess() {
      return utils.blogPost.get.invalidate();
    },
  });

  const userId = currUser?.data?.id;

  const handleCommentChange = (event: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setInput(event.target.value);
  };

  const handlePostButtonClick = () => {
    createCommentMutation.mutate({
      data: {
        userId: userId!,
        blogPostId: id,
        content: input,
      },
    });

    setInput("");
  };

  return (
    <>
      <input type="checkbox" id={`modal-${id}`} className="modal-toggle" />
      <label htmlFor={`modal-${id}`} className="modal cursor-pointer">
        <label
          className="card-body modal-box relative m-[-10px] w-11/12 max-w-5xl rounded-md"
          htmlFor=""
        >
          <div className="mb-3 flex w-full justify-between">
            <div className="flex">
              <div className="avatar self-center">
                <ProfilePicture size={2.5} imgUrl={posterAvatarUrl} />
              </div>
              <div className="ml-3">
                <p className="text-lg font-bold">{poster}</p>
                <p className="text-sm text-slate-400">{timeAgo(lastUpdated)}</p>
              </div>
            </div>
            <div className="self-center">
              <div className="dropdown-left dropdown rounded-md shadow-slate-300">
                <button>
                  <MenuIcon />
                </button>
                <ul
                  tabIndex={0}
                  className="dropdown-content menu rounded-box w-52 bg-base-100 p-2 shadow"
                >
                  <li>
                    <a>Edit</a>
                  </li>
                  <li>
                    <a>Delete</a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <p className="mb-3 text-xl font-bold">{title}</p>
          <div className="prose max-w-none ">
            <ReactMarkdown remarkPlugins={[remarkGfm, remarkSlug]}>
              {post}
            </ReactMarkdown>
          </div>
          <div className="self-end">
            <p className="btn-link text-highlight-green no-underline hover:no-underline">
              {comments.length} Comments
            </p>
          </div>
          <div>
            {comments.map(
              ({
                id: commentId,
                content: comment,
                createdAt: dateAdded,
                user: { name, image },
              }) => (
                <Comment
                  key={`${commentId}`}
                  commenterName={name as string}
                  commenterAvatarUrl={image as string}
                  dateAdded={dateAdded}
                  comment={comment}
                />
              )
            )}
          </div>
          <div className="m-[2rem] mx-0 mb-0">
            <div
              className={`${userId ? "" : "tooltip tooltip-info"} w-full`}
              data-tip="Sign in to comment"
            >
              <input
                type="text"
                placeholder="Write a new comment"
                value={input}
                onChange={handleCommentChange}
                readOnly={userId ? false : true}
                disabled={userId ? false : true}
                className={`${
                  userId ? "" : "input-disabled cursor-not-allowed"
                }input-bordered mb-1 w-full rounded-sm border-[1px] p-2`}
              />
            </div>

            <div className="mb-[-10px] flex justify-end gap-2">
              <button
                className={`${
                  userId
                    ? " border-highlight-green bg-highlight-green "
                    : "input-disabled cursor-not-allowed bg-gray-400 text-black"
                } mt-[0.5rem] h-10 rounded-sm px-5`}
                onClick={handlePostButtonClick}
                disabled={userId ? false : true}
              >
                Post
              </button>
              <label
                className={`mt-[0.5rem] h-10 rounded-sm border-[2px] border-slate-200 bg-white px-5 pt-[0.38rem] text-center text-black hover:cursor-pointer`}
                htmlFor={`modal-${id}`}
              >
                Cancel
              </label>
            </div>
          </div>
        </label>
      </label>
    </>
  );
};
