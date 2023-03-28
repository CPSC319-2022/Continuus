import Link from "next/link";
import {userPathToProfile} from "~/utils/profile";

interface ProfileNameProps {
    name: string,
    userId: string,
}

export const ProfileName: React.FC<ProfileNameProps> = ({
    name,
    userId
}) => {
    return (
        <Link href={userPathToProfile(userId)}>
            <p className="text-lg font-bold">{name}</p>
        </Link>
    );
}
