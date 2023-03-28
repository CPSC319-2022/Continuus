interface ProfilePictureProps extends React.ComponentProps<"img"> {
  imgUrl?: string | null;
  size: number;
}
/**
 * @prop size: Width/Height of the Profile Picture in REM
 * @returns
 */
export const ProfilePicture: React.FC<ProfilePictureProps> = ({
  imgUrl,
  size,
  ...props
}) => {
  const { className, ...restProps } = props;
  return (
    <img
      src={imgUrl || "https://i.stack.imgur.com/34AD2.jpg"}
      alt="avatar"
      className={`inline-block aspect-square rounded-[50%] ${className ?? ""}`}
      style={{ width: `${size}rem`, height: `${size}rem` }}
      {...restProps}
    />
  );
};
