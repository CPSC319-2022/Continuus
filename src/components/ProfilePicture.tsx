import {User} from "next-auth";
import Link from "next/link";
import {userPathToProfile} from "~/utils/profile";

/**
 * @prop size: Width/Height of the Profile Picture in REM 
 * @returns 
 */
interface ProfilePictureProps {
    size: number;
    user: User | null | undefined;
}

export const ProfilePicture: React.FC<ProfilePictureProps> = ({ size, user }) => {
    const linkTo: string = userPathToProfile(user?.id || '');
    let imgUrl = "https://i.stack.imgur.com/34AD2.jpg";
    if (user && user.image) {
        imgUrl = user.image;
    }

    return (
        <>
            <Link href={linkTo}>
                <img src={imgUrl} alt="avatar" className="aspect-square rounded-full inline-block" style={{ width: `${size}rem` }} />
            </Link>
        </>
    )
}
