import {timeAgo} from "~/utils/time";
import {ProfilePicture} from "./ProfilePicture";

interface ProfileCardProps extends React.ComponentProps<"div"> {
    name: string,
    dateJoined?: Date,
    imgUrl?: string,
    numBlogPosts: number,
    numComments: number,
}

export const ProfileCard: React.FC<ProfileCardProps> = ({
    name,
    dateJoined,
    imgUrl,
    numBlogPosts,
    numComments,
}) => {
    return(
        <div className="p-8 bg-white mt-24">
            <div className="relative">
                <div className="w-36 h-36 mx-auto rounded-full shadow-md absolute inset-x-0 top-0 -mt-24 flex items-center justify-center">
                    <ProfilePicture size={40} imgUrl={imgUrl} />
                </div>
            </div>

            <div className="mt-20 text-center pb-8">
                <h1 className="text-4xl font-medium text-gray-700">{name}</h1>
                <p className="mt-3 font-medium text-gray-400">joined <span className="font-light text-grey-500">{(dateJoined)? timeAgo(dateJoined) : ''}</span></p>
            </div>

            <div className="px-64 grid grid-cols-3 text-center order-last md:order-first mt-20 md:mt-0">
              <div>
                <p className="font-bold text-gray-700 text-xl">{numBlogPosts}</p>
                <p className="text-gray-400">Blog Posts</p>
              </div>
              <div>
              </div>
              <div>
                <p className="font-bold text-gray-700 text-xl">{numComments}</p>
                <p className="text-gray-400">Comments</p>
              </div>
            </div>
        </div>);
};
