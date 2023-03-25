import {User} from "next-auth";
import Link from "next/link";
import {userPathToProfile} from "~/utils/profile";

interface ProfilePictureProps extends React.ComponentProps<"img"> {
  size: number;
  user: User | null | undefined;
}
/**
 * @prop size: Width/Height of the Profile Picture in REM
 * @returns
 */

export const ProfilePicture: React.FC<ProfilePictureProps> = ({ size, user, ...props }) => {
    const { className, ...restProps } = props;

    const linkTo: string = userPathToProfile(user?.id || '');
    let imgUrl = "https://i.stack.imgur.com/34AD2.jpg";
    if (user && user.image) {
        imgUrl = user.image;
    }

    return (
        <>
            <Link href={linkTo}>
                <img src={imgUrl} alt="avatar"
                className={`inline-block aspect-square rounded-[50%] ${className ?? ""}`}
                style={{ width: `${size}rem` }}
                {...restProps}
                />
            </Link>
        </>
    )
}
