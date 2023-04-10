import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import { timeAgo } from "~/utils/time";
import { ProfilePicture } from "./ProfilePicture";
import { api } from "~/utils/api";
import { BlogPostActionsMenu } from "~/components/BlogPostActionsMenu";
import { useSession } from "next-auth/react";
import { shouldSeeActions, isAuthor } from "~/components/util";
import { ProfileName } from "./ProfileName";
import { userPathToProfile } from "~/utils/profile";
import { useAppDispatch } from "~/redux/hooks";
import { setSelectedPost } from "~/redux/slices/posts";

interface BlogPostProps extends React.ComponentProps<"div"> {
  id: string;
  authorId: string;
  lastUpdated: Date;
  createdAt: Date;
  title: string;
  content: string;
  comments: number;
  authorName: string;
  imgUrl?: string | null;
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
  const dispatch = useAppDispatch();

  return (
    <div className="relative">
      <div
        className="card w-full rounded-md shadow-md border hover:cursor-pointer hover:border-highlight-green transition-all"
        onClick={() => dispatch(setSelectedPost(id))}
        {...props}
      >
        <div className="card-body">
          <div className="mb-3 flex w-full justify-between">
            <div className="flex">
              <div className="avatar self-center hover:scale-110 transition-all">
                <ProfilePicture
                  size={2.5}
                  imgUrl={imgUrl}
                  redirectLink={userPathToProfile(authorId)}
                />
              </div>
              <div className="ml-3">
                <ProfileName name={authorName} userId={authorId}/>
                <p className="text-sm text-gray-400">{`${timeAgo(createdAt)}${
                  createdAt.getTime() !== lastUpdated.getTime()
                    ? ` (updated ${timeAgo(lastUpdated)})`
                    : ""
                }`}</p>
              </div>
            </div>
          </div>
          <div className="mb-3 w-fit text-2xl font-bold">
            {title}
          </div>
          <div className="prose relative">
            <ReactMarkdown>
              {content.length > 500
                ? `${content.slice(
                    0,
                    499
                  )}`
                : content}
            </ReactMarkdown>
          {content.length > 500
            ? <div className="bg-gradient-to-b from-transparent to-white w-full h-24 absolute bottom-6"></div>
            : <div></div>
            }
          </div>
          <div className="self-end">
            <p className="text-highlight-green no-underline">
              {comments} Comments
            </p>
          </div>
        </div>
      </div>
      <div className="absolute right-10 top-12">
        {shouldSeeActions(status, currUser.data, authorId) && (
                <BlogPostActionsMenu
                  id={id}
                  title={title}
                  content={content}
                  isAuthor={isAuthor(currUser.data, authorId)}
                />
              )}
      </div>
    </div>
  );
};
