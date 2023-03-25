import {User} from "next-auth";
import Link from "next/link";
import {userPathToProfile} from "~/utils/profile";

/**
 * @prop size: Width/Height of the Profile Picture in REM 
 * @returns 
 */
interface ProfilePictureProps {
    size: number;
    imgUrl?: string | null;
    user: User | null | undefined;
}

export const ProfilePicture: React.FC<ProfilePictureProps> = ({ size, imgUrl, user }) => {
    const linkTo: string = userPathToProfile(user?.id || '');

    return (
        <>
            <Link href={linkTo}>
                <img src={imgUrl || "https://i.stack.imgur.com/34AD2.jpg"} alt="avatar" className="aspect-square rounded-full inline-block" style={{ width: `${size}rem` }} />
            </Link>
        </>
    )
}
