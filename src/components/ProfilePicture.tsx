/**
 * @prop size: Width/Height of the Profile Picture in REM 
 * @returns 
 */
interface ProfilePictureProps {
    size: number;
    imgUrl?: string | null;
    onClick: () => void;

}

export const ProfilePicture: React.FC<ProfilePictureProps> = ({ imgUrl, size }) => {
    return (
        <img src={imgUrl || "https://i.stack.imgur.com/34AD2.jpg"} alt="avatar" className="aspect-square rounded-full inline-block" style={{ width: `${size}rem` }} />

    )
}