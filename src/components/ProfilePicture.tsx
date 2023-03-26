import Link from "next/link";
import {useEffect, useState} from "react";

interface ProfilePictureProps extends React.ComponentProps<"img"> {
  size: number;
  imgUrl?: string | null;
  redirectLink?: string
}
/**
 * @prop size:          Width/Height of the Profile Picture in REM
 * @prop imgUrl:        the link to the image to render (optional)
 * @prop redirectLink:  the link to redirect to when clicking the ProfilePicture
 *
 * @returns a profile picture rendered in a circle. Renders a default image if imgUrl isn't specified and has no redirect ink if redirectLink isn't specified
 */

export const ProfilePicture: React.FC<ProfilePictureProps> = ({ size, imgUrl, redirectLink, ...props }) => {
    const { className, ...restProps } = props;
    const [imageUrl, setImageUrl] = useState<string>("https://i.stack.imgur.com/34AD2.jpg");

    useEffect(() => {
        if (imgUrl) {
            setImageUrl(imgUrl);
        }
    }, [imgUrl]);

    const img = <img 
                    src={imageUrl} 
                    alt="avatar"
                    className={`inline-block aspect-square rounded-[50%] ${className ?? ""}`}
                    style={{ width: `${size}rem` }}
                    {...restProps}
/>;

    return (
        <> {(redirectLink) ?
            <Link href={redirectLink}>{img}</Link> :
            img}
        </>
    )
}
