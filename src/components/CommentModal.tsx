import { Comment } from "./Comment";
import React, { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkSlug from "remark-slug";
import { timeAgo } from "~/utils/time";
import { ProfilePicture } from "./ProfilePicture";
import { BlogPostActionsMenu } from "~/components/BlogPostActionsMenu";
import { api } from "~/utils/api";
import { useSession } from "next-auth/react";
import { shouldSeeActions, isAuthor } from "~/components/util";
import ReactModal from "react-modal";
import { useAppDispatch, useAppSelector } from "~/redux/hooks";
import { setSelectedPost } from "~/redux/slices/posts";
import { userPathToProfile } from "~/utils/profile";

export const CommentModal: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState<string>("");

  const {
    posts: { selectedPost },
  } = useAppSelector((state) => state);

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (selectedPost) {
      setIsOpen(true);
    } else {
      setIsOpen(false);
    }
  }, [selectedPost]);

  useEffect(() => {
    if (!isOpen) {
      dispatch(setSelectedPost(null));
    }
  }, [isOpen, dispatch]);

  const utils = api.useContext();

  const currUser = api.user.currentUser.useQuery();

  const { data: postx } = api.blogPost.getOne.useQuery({
    where: { id: selectedPost ?? "" },
  });

  const { status } = useSession();

  const createCommentMutation = api.comment.create.useMutation({
    onSuccess() {
      return Promise.all([
        utils.blogPost.getOne.invalidate(),
        utils.comment.count.invalidate(),
      ]);
    },
  });

  const userId = currUser?.data?.id;

  const handleCommentChange = (event: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setInput(event.target.value);
  };

  const handlePostButtonClick = () => {
    if (input) {
      createCommentMutation.mutate({
        data: {
          userId: currUser?.data?.id ?? "",
          blogPostId: postx?.id ?? "",
          content: input,
        },
      });

      setInput("");
    }
  };

  return (
    <>
      {postx && (
        <ReactModal
          closeTimeoutMS={100}
          isOpen={isOpen}
          overlayClassName="fixed inset-0 z-20 bg-black/30"
          className="absolute top-1/2 left-1/2 z-40 max-h-[95vh] w-11/12 max-w-5xl -translate-x-1/2 -translate-y-1/2 overflow-y-auto overflow-x-hidden rounded-md border-slate-500 bg-white p-5 outline-none md:w-1/2"
          shouldCloseOnEsc
          shouldCloseOnOverlayClick
          onRequestClose={() => setIsOpen(false)}
        >
          <div className="mb-3 flex w-full justify-between">
            <div className="flex">
              <div className="avatar self-center">
                <ProfilePicture
                  size={2.5}
                  imgUrl={postx.user.image}
                  redirectLink={userPathToProfile(postx.userId)}
                />
              </div>
              <div className="ml-3">
                <p className="text-lg font-bold">{postx.user.name}</p>
                <p className="text-sm text-slate-400">{`${timeAgo(
                  postx.createdAt
                )}${
                  postx.createdAt.getTime() !== postx.updatedAt.getTime()
                    ? ` (updated ${timeAgo(postx.updatedAt)})`
                    : ""
                }`}</p>
              </div>
            </div>
            {shouldSeeActions(status, currUser.data, postx.userId) && (
              <BlogPostActionsMenu
                id={postx.id}
                title={postx.title}
                content={postx.content}
                isAuthor={isAuthor(currUser.data, postx.userId)}
              />
            )}
          </div>
          <p className="mb-3 text-xl font-bold">{postx.title}</p>
          <div className="prose max-w-none ">
            <ReactMarkdown remarkPlugins={[remarkGfm, remarkSlug]}>
              {postx.content}
            </ReactMarkdown>
          </div>
          <div className="flex w-full justify-end">
            <p className="float-right text-highlight-green no-underline hover:no-underline">
              {postx.comments.length} Comments
            </p>
          </div>
          <div>
            {postx.comments.map(
              ({
                id: commentId,
                content: comment,
                createdAt: dateAdded,
                updatedAt: dateUpdated,
                user: { name: authorName, id: commenterId, image },
              }) => (
                <Comment
                  key={`${commentId}`}
                  dateAdded={dateAdded}
                  comment={comment}
                  name={authorName}
                  userId={commenterId}
                  imgUrl={image}
                  commentId={commentId}
                  dateUpdated={dateUpdated}
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
                readOnly={currUser?.data?.id ? false : true}
                disabled={currUser ? false : true}
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
              <button
                className={`mt-[0.5rem] h-10 rounded-sm border-2 border-slate-200 bg-white px-5 text-center text-black hover:cursor-pointer`}
                onClick={() => dispatch(setSelectedPost(null))}
              >
                Cancel
              </button>
            </div>
          </div>
        </ReactModal>
      )}
    </>
  );
};
