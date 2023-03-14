import { Comment } from "./Comment";

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
  return (
    <>
      <input type="checkbox" id={`modal-${id}`} className="modal-toggle" />
      <label htmlFor={`modal-${id}`} className="modal cursor-pointer">
        <label
          className="card-body modal-box relative m-[-10px] w-11/12 max-w-5xl"
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
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="24"
                    width="24"
                  >
                    <path d="M12 20q-.825 0-1.412-.587Q10 18.825 10 18q0-.825.588-1.413Q11.175 16 12 16t1.413.587Q14 17.175 14 18q0 .825-.587 1.413Q12.825 20 12 20Zm0-6q-.825 0-1.412-.588Q10 12.825 10 12t.588-1.413Q11.175 10 12 10t1.413.587Q14 11.175 14 12q0 .825-.587 1.412Q12.825 14 12 14Zm0-6q-.825 0-1.412-.588Q10 6.825 10 6t.588-1.412Q11.175 4 12 4t1.413.588Q14 5.175 14 6t-.587 1.412Q12.825 8 12 8Z" />
                  </svg>
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
          <p>{post}</p>
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
              className="w-5xl input-bordered input w-full"
            />
            <div className="mb-[-10px] flex justify-end gap-2">
              <button
                className="mt-[0.5rem] h-10 rounded-sm border-highlight-green bg-highlight-green px-5 text-black"
                onClick={(event) => {
                  console.log("Add comment button clicked!");
                }}
              >
                Post
              </button>
              <button
                className="mt-[0.5rem] h-10 rounded-sm border-[2px] border-slate-200 bg-white px-5 text-black"
                onClick={(event) => {
                  console.log("Add comment button clicked!");
                }}
              >
                Cancel
              </button>
            </div>
          </div>
        </label>
      </label>
    </>
  );
};
