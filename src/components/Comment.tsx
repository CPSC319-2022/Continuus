import {userPathToProfile} from "~/utils/profile";
import { timeAgo } from "~/utils/time";
import {ProfileName} from "./ProfileName";
import { ProfilePicture } from "./ProfilePicture";

export interface CommentProps {
  dateAdded: Date;
  comment: string;
  name?: string | null;
  userId: string;
  imgUrl?: string | null;
}

export const Comment: React.FC<CommentProps> = ({
  dateAdded,
  comment,
  name,
  userId,
  imgUrl
}) => {
  return (
    <>
      <div>
        <hr className="my-4 mx-[-20px] h-px border-gray-200" />
      </div>
      <div>
        <div className="flex">
          <div className="avatar self-center">
              <ProfilePicture size={2.5}
                  redirectLink={userPathToProfile(userId)}
                  imgUrl={imgUrl} />
          </div>
          <div className="ml-3">
            <ProfileName name={name || ""} userId={userId}/>
            <p className="text-sm text-slate-400">{timeAgo(dateAdded)}</p>
          </div>
        </div>
        <p className="mt-4 w-full">{comment}</p>
      </div>
    </>
  );
};
