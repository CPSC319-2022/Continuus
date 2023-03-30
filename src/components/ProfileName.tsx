import Link from "next/link";
import { useAppDispatch } from "~/redux/hooks";
import { setSelectedPost } from "~/redux/slices/posts";
import { userPathToProfile } from "~/utils/profile";

interface ProfileNameProps {
  name: string;
  userId: string;
}

export const ProfileName: React.FC<ProfileNameProps> = ({ name, userId }) => {
  const dispatch = useAppDispatch();
  return (
    <Link
      href={userPathToProfile(userId)}
      onClick={() => dispatch(setSelectedPost(null))}
    >
      <p className="text-lg font-bold">{name}</p>
    </Link>
  );
};
