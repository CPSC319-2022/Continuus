import Link from "next/link";
import {userPathToProfile} from "~/utils/profile";

interface ProfileNameProps extends React.ComponentProps<"p"> {
    name: string,
    userId: string,
}

export const ProfileName: React.FC<ProfileNameProps> = ({
    name,
    userId,
    ...props
}) => {
    return (
        <Link href={userPathToProfile(userId)}>
            <p className="text-lg font-bold" {...props}>{name}</p>
        </Link>
    );
}
