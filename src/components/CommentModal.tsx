import { Comment } from "./Comment";
import React, { useState } from "react";
import { MenuIcon } from "~/icons/Menu";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkSlug from "remark-slug";
import type { Comment as CommentType, User } from "@prisma/client";
import { timeAgo } from "~/utils/time";
import { ProfilePicture } from "./ProfilePicture";
import { BlogPostActionsMenu } from "~/components/BlogPostActionsMenu";
import { api } from "~/utils/api";
import { useSession } from "next-auth/react";
import { isAdmin, isAuthed, isAuthor } from "~/components/util";

type CommentEntry = CommentType & { user: User };

export interface CommentModalProps {
  id: string;
  title: string;
  poster: string;
  lastUpdated: Date;
  post: string;
  posterAvatarUrl: string;
  comments: CommentEntry[];
  content: string;
  author: string;
}

export const CommentModal: React.FC<CommentModalProps> = ({
  id,
  title,
  poster,
  lastUpdated,
  post,
  posterAvatarUrl,
  comments,
  author,
  content,
}) => {
  const [input, setInput] = useState<string>("");

  const handleCommentChange = (event: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setInput(event.target.value);
  };

  const handlePostButtonClick = () => {
    console.log(`User comment: ${input}`);
  };
  const currUser = api.user.currentUser.useQuery();
  const { status } = useSession();
  return (
    <>
      <input type="checkbox" id={`modal-${id}`} className="modal-toggle" />
      <label htmlFor={`modal-${id}`} className="modal cursor-pointer z-10">
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
            {
              ((currUser.data !== null) && (currUser.data !== undefined)) &&
              ((isAuthed(status) && isAuthor(currUser.data, author)) || (isAuthed(status) && isAdmin(currUser.data))) &&
                <BlogPostActionsMenu id={id} title={title} content={content} isAdmin={isAdmin(currUser.data)}/>
            }
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
                content: comment,
                createdAt: dateAdded,
                user: { name, image },
              }) => (
                <Comment
                  key={`${name as string}${comment}`}
                  commenterName={name as string}
                  commenterAvatarUrl={image as string}
                  dateAdded={dateAdded}
                  comment={comment}
                />
              )
            )}
          </div>
          <div className="m-[2rem] mx-0 mb-0">
            <input
              type="text"
              placeholder="Write a new comment"
              value={input}
              onChange={handleCommentChange}
              className="w-5xl input-bordered mb-1 w-full rounded-sm border-[1px] p-2"
            />
            <div className="mb-[-10px] flex justify-end gap-2">
              <button
                className="mt-[0.5rem] h-10 rounded-sm border-highlight-green bg-highlight-green px-5 text-black"
                onClick={handlePostButtonClick}
              >
                Post
              </button>
              <button
                className="mt-[0.5rem] h-10 rounded-sm border-[2px] border-slate-200 bg-white px-5 text-center text-black"
                onClick={() => {
                  console.log("Cancel comment button clicked!");
                }}
              >
                <label className="hover:cursor-pointer" htmlFor={`modal-${id}`}>
                  Cancel
                </label>
              </button>
            </div>
          </div>
        </label>
      </label>
    </>
  );
};
