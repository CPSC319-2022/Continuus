import {User} from "next-auth";
import Link from "next/link";
import {userPathToProfile} from "~/utils/profile";

interface ProfileNameProps {
    user: User;
}

export const ProfileName: React.FC<ProfileNameProps> = ({
    user,
}) => {
    return (
        <Link href={userPathToProfile(user.id)}>
            <p className="text-lg font-bold">{user.name}</p>
        </Link>
    );
}
