import { Comment } from "./Comment";
import React, { useState } from "react";
import { MenuIcon } from "~/icons/Menu";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkSlug from "remark-slug";

export interface ModalProps {
  id: number;
  poster: string;
  lastUpdated: string;
  post: string;
  posterAvatarUrl: string;
  comments: {
    name: string;
    comment: string;
    dateAdded: string;
    imageUrl: string;
  }[];
}

export const Modal: React.FC<ModalProps> = ({
  id,
  poster,
  lastUpdated,
  post,
  posterAvatarUrl,
  comments,
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
                <div className="h-10 w-10 rounded-full">
                  <img src={posterAvatarUrl} alt="avatar" />
                </div>
              </div>
              <div className="ml-3">
                <p className="text-lg font-bold">{poster}</p>
                <p className="text-sm text-slate-400">{lastUpdated}</p>
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
            {comments.map(({ name, comment, dateAdded, imageUrl }) => (
              <Comment
                key={`${name}${comment}`}
                commenterName={name}
                commenterAvatarUrl={imageUrl}
                dateAdded={dateAdded}
                comment={comment}
              />
            ))}
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
