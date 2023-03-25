import {User} from "next-auth";
import { timeAgo } from "~/utils/time";
import {ProfileName} from "./ProfileName";
import { ProfilePicture } from "./ProfilePicture";

export interface CommentProps {
  dateAdded: Date;
  comment: string;
  commenterProfile: User;
}

export const Comment: React.FC<CommentProps> = ({
  dateAdded,
  comment,
  commenterProfile,
}) => {
  return (
    <>
      <div>
        <hr className="my-4 mx-[-20px] h-px border-gray-200" />
      </div>
      <div>
        <div className="flex">
          <div className="avatar self-center">
            <ProfilePicture size={2.5} user={commenterProfile} />
          </div>
          <div className="ml-3">
            <ProfileName user={commenterProfile}/>
            <p className="text-sm text-slate-400">{timeAgo(dateAdded)}</p>
          </div>
        </div>
        <p className="mt-4 w-full">{comment}</p>
      </div>
    </>
  );
};
