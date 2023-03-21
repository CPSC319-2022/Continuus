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
        <div className="p-8 bg-white shadow mt-24">
            <div className="grid grid-cols-1 md:grid-cols-3">
            <div className="grid grid-cols-2 text-center order-last md:order-first mt-20 md:mt-0">
              <div>
                   <p className="font-bold text-gray-700 text-xl">{numBlogPosts}</p>
                <p className="text-gray-400">Blog Posts</p>
              </div>
                  <div>
                   <p className="font-bold text-gray-700 text-xl">{numComments}</p>
                <p className="text-gray-400">Comments</p>
              </div>
            </div>
                <div className="relative">
                  <div className="w-48 h-48 bg-indigo-100 mx-auto rounded-full shadow-2xl absolute inset-x-0 top-0 -mt-24 flex items-center justify-center text-indigo-500">
                      <ProfilePicture size={40} imgUrl={imgUrl} />
                  </div>
                </div>
            </div>

            <div className="mt-20 text-center border-b pb-12">
                <h1 className="text-4xl font-medium text-gray-700">{name}</h1>
                <p className="mt-3 font-medium text-gray-700">joined <span className="font-light text-grey-500">{(dateJoined)? timeAgo(dateJoined) : ''}</span></p>
                <p className="mt-8 text-gray-500">Solution Manager - Creative Tim Officer</p>
                <p className="mt-2 text-gray-500">University of Computer Science</p>
            </div>

            <div className="mt-12 flex flex-col justify-center">
            <p className="text-gray-600 text-center font-light lg:px-16">An artist of considerable range, Ryan — the name taken by Melbourne-raised, Brooklyn-based Nick Murphy — writes, performs and records all of his own music, giving it a warm, intimate feel with a solid groove structure. An artist of considerable range.</p>
            <button
            className="text-indigo-500 py-2 px-4  font-medium mt-4"
            >
            Show more
            </button>
            </div>
        </div>);
};
