import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import remarkGfm from "remark-gfm";
import remarkSlug from "remark-slug";
import { timeAgo } from "~/utils/time";
import { ProfilePicture } from "./ProfilePicture";
import { api } from "~/utils/api";
import { BlogPostActionsMenu } from "~/components/BlogPostActionsMenu";
import { useSession } from "next-auth/react";
import React from "react";
import { shouldSeeActions, isAuthor } from "~/components/util";
import {ProfileName} from "./ProfileName";
import {userPathToProfile} from "~/utils/profile";

interface BlogPostProps extends React.ComponentProps<"div"> {
  id: string;
  authorId: string;
  lastUpdated: Date;
  createdAt: Date;
  title: string;
  content: string;
  comments: number;
  authorName: string;
  imgUrl?: string | null
}

export const BlogPost: React.FC<BlogPostProps> = ({
  id,
  authorId,
  lastUpdated,
  createdAt,
  title,
  content,
  comments,
  authorName,
  imgUrl,
  ...props
}) => {
  const currUser = api.user.currentUser.useQuery();
  const { status } = useSession();

  return (
    <div
      className="bg-base-150 card w-full rounded-md shadow-md shadow-slate-300"
      {...props}
    >
      <div className="card-body m-[-15px]">
        <div className="mb-3 flex w-full justify-between">
          <div className="flex">
            <div className="avatar self-center">
                <ProfilePicture 
                    size={2.5} 
                    imgUrl={imgUrl} 
                    redirectLink={userPathToProfile(authorId)} />
            </div>
            <div className="ml-3">
              <ProfileName name={authorName} userId={authorId}/>
              <p className="text-sm text-slate-400">{`${timeAgo(createdAt)}${
                createdAt.getTime() !== lastUpdated.getTime()
                  ? ` (updated ${timeAgo(lastUpdated)})`
                  : ""
              }`}</p>
            </div>
          </div>
          {shouldSeeActions(status, currUser.data, authorId) && (
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
            {content.length > 500 ? `${content.slice(0, 499)}...` : content}
          </ReactMarkdown>
        </div>
        <div className="self-end ">
          <label
            htmlFor={`modal-${id}`}
            className="btn-link text-highlight-green no-underline hover:cursor-pointer"
          >
            {comments} Comments
          </label>
        </div>
      </div>
    </div>
  );
};
