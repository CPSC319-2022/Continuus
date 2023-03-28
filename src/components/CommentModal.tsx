import { Comment } from "./Comment";
import React, { useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkSlug from "remark-slug";
import type { Comment as CommentType, User } from "@prisma/client";
import { timeAgo } from "~/utils/time";
import { ProfilePicture } from "./ProfilePicture";
import { BlogPostActionsMenu } from "~/components/BlogPostActionsMenu";
import { api } from "~/utils/api";
import { useSession } from "next-auth/react";
import { shouldSeeActions, isAuthor } from "~/components/util";
import {userPathToProfile} from "~/utils/profile";

type CommentEntry = CommentType & { user: User };

export interface CommentModalProps {
  id: string;
  title: string;
  poster: string;
  lastUpdated: Date;
  createdAt: Date;
  post: string;
  comments: CommentEntry[];
  content: string;
  authorId: string;
  imgUrl?: string | null;
}

export const CommentModal: React.FC<CommentModalProps> = ({
  id,
  title,
  poster,
  lastUpdated,
  createdAt,
  post,
  comments,
  content,
  authorId,
  imgUrl,
}) => {
  const [input, setInput] = useState<string>("");

  const utils = api.useContext();

  const currUser = api.user.currentUser.useQuery();

  const { status } = useSession();

  const createCommentMutation = api.comment.create.useMutation({
    onSuccess() {
        return Promise.all([utils.blogPost.get.invalidate(),
                            utils.comment.count.invalidate()]);
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
      <label htmlFor={`modal-${id}`} className="modal z-10 cursor-pointer">
        <label
          className="card-body modal-box relative m-[-10px] w-11/12 max-w-5xl rounded-md"
          htmlFor=""
        >
          <div className="mb-3 flex w-full justify-between">
            <div className="flex">
              <div className="avatar self-center">
                  <ProfilePicture 
                      size={2.5}
                      redirectLink={userPathToProfile(authorId)} 
                      imgUrl={imgUrl}
                  />
              </div>
              <div className="ml-3">
                <p className="text-lg font-bold">{poster}</p>
                <p className="text-sm text-slate-400">{`${timeAgo(createdAt)}${
                  createdAt.getTime() !== lastUpdated.getTime()
                    ? ` (updated ${timeAgo(lastUpdated)})`
                    : ""
                }`}</p>
              </div>
            </div>
            {
              shouldSeeActions(status, currUser.data, authorId) && (
              <BlogPostActionsMenu
                id={id}
                title={title}
                content={content}
                isAuthor={isAuthor(currUser.data, authorId)}
              />
            )}
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
                user: { name: authorName, id: commenterId, image},
              }) => (
                <Comment
                  key={`${commentId}`}
                  dateAdded={dateAdded}
                  comment={comment}
                  name={authorName}
                  userId={commenterId}
                  imgUrl={image}
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
