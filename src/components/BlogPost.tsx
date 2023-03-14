import { MenuIcon } from "~/icons/Menu";

interface BlogPostProps {
  id: number;
  name: string;
  lastUpdated: string;
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
}) => {
  return (
    <div className="bg-base-150 card w-full rounded-md shadow-md shadow-slate-300">
      <div className="card-body m-[-15px]">
        <div className="mb-3 flex w-full justify-between">
          <div className="flex">
            <div className="avatar self-center">
              <div className="h-10 w-10 rounded-full">
                <img src={imageUrl} alt="avatar" />
              </div>
            </div>
            <div className="ml-3">
              <p className="text-lg font-bold">{name}</p>
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
        <p className="mb-3 text-xl font-bold">{title}</p>
        <p>{content.length > 500 ? `${content.slice(0, 499)}...` : content}</p>
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
