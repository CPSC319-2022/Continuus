import { MenuIcon } from "~/icons/Menu";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import remarkGfm from "remark-gfm";
import remarkSlug from "remark-slug";
import { timeAgo } from "~/utils/time";
import { ProfilePicture } from "./ProfilePicture";

interface BlogPostProps extends React.ComponentProps<"div"> {
  id: string;
  name: string;
  lastUpdated: Date;
  title: string;
  content: string;
  imageUrl: string;
  comments: number;
}

export const BlogPost: React.FC<BlogPostProps> = ({
  id,
  name,
  lastUpdated,
  title,
  content,
  imageUrl,
  comments,
  ...props
}) => {
  return (
    <div
      className="bg-base-150 card w-full rounded-md shadow-md shadow-slate-300"
      {...props}
    >
      <div className="card-body m-[-15px]">
        <div className="mb-3 flex w-full justify-between">
          <div className="flex">
            <div className="avatar self-center">
              <ProfilePicture size={2.5} imgUrl={imageUrl} />
            </div>
            <div className="ml-3">
              <p className="text-lg font-bold">{name}</p>
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
