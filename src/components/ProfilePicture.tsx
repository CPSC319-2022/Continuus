import {User} from "next-auth";
import Link from "next/link";
import {userPathToProfile} from "~/utils/profile";

interface ProfilePictureProps extends React.ComponentProps<"img"> {
  size: number;
  imgUrl?: string | null;
  userId?: string;
}
/**
 * @prop size: Width/Height of the Profile Picture in REM
 * @returns
 */

export const ProfilePicture: React.FC<ProfilePictureProps> = ({ size, imgUrl, userId, ...props }) => {
    const { className, ...restProps } = props;

    const linkTo: string = userPathToProfile(userId || '');
    let imageUrl = "https://i.stack.imgur.com/34AD2.jpg";

    if (imgUrl) {
        imageUrl = imgUrl;
    }

    const img = <img 
                    src={imageUrl} 
                    alt="avatar"
                    className={`inline-block aspect-square rounded-[50%] ${className ?? ""}`}
                    style={{ width: `${size}rem` }}
                    {...restProps}
/>;

    return (
        <> {(userId) ?
            <Link href={linkTo}> img </Link> :
            img}
        </>
    )
}
