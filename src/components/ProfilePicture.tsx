/**
 * @prop size: Width/Height of the Profile Picture in REM 
 * @returns 
 */
interface ProfilePictureProps {
    size: number;
    imgUrl?: string | null;
}

export const ProfilePicture: React.FC<ProfilePictureProps> = ({ size, imgUrl }) => {
    return (
        <img src={imgUrl || "https://i.stack.imgur.com/34AD2.jpg"} alt="avatar" className="aspect-square rounded-full inline-block" style={{ width: `${size}rem` }} />
    )
}
