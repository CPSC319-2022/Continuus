import { timeAgo } from "~/utils/time";

export interface CommentProps {
  commenterName: string;
  commenterAvatarUrl: string;
  dateAdded: Date;
  comment: string;
}

export const Comment: React.FC<CommentProps> = ({
  commenterName,
  commenterAvatarUrl,
  dateAdded,
  comment,
}) => {
  return (
    <>
      <div>
        <hr className="my-4 mx-[-20px] h-px border-gray-200" />
      </div>
      <div>
        <div className="flex">
          <div className="avatar self-center">
            <div className="h-10 w-10 rounded-full">
              <img src={commenterAvatarUrl} alt="avatar" />
            </div>
          </div>
          <div className="ml-3">
            <p className="text-lg font-bold">{commenterName}</p>
            <p className="text-sm text-slate-400">{timeAgo(dateAdded)}</p>
          </div>
        </div>
        <p className="mt-4 w-full">{comment}</p>
      </div>
    </>
  );
};
