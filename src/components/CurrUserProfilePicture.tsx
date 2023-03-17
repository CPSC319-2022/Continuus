import { api } from "~/utils/api";
import { Spinner } from "./Spinner";

/**
 * @prop size: Width/Height of the Profile Picture in REM 
 * @returns 
 */
export const CurrUserProfilePicture: React.FC<{ size: number }> = ({ size }) => {
    const currUser = api.user.currentUser.useQuery();

    if (currUser.isLoading) {
        return <div className="aspect-square rounded-full" style={{ width: `${size}rem` }}>
            <Spinner size={size} />
        </div>
    }

    return (
        <img src={currUser.data?.image || "https://i.stack.imgur.com/34AD2.jpg"} alt="avatar" className="aspect-square rounded-full" style={{ width: `${size}rem` }} />

    )
}