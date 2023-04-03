import {api} from "~/utils/api";
import {timeAgo} from "~/utils/time";
import {ProfilePicture} from "./ProfilePicture";
import {Spinner} from "./Spinner";

interface ProfileCardProps {
    dateJoined?: Date,
    name: string
    imgUrl?: string | null,
    userId: string,
}

export const ProfileCard: React.FC<ProfileCardProps> = ({
    dateJoined,
    name,
    imgUrl,
    userId,
}) => {
    const nBlogPosts = api.blogPost.count.useQuery({
        userId: userId 
    });
    const nComments = api.comment.count.useQuery({
        userId: userId
    });

    return(
        <div className="p-8 mt-24">
            <div className="relative">
                <div className="w-36 h-36 mx-auto rounded-full shadow-md absolute inset-x-0 top-0 -mt-24 flex items-center justify-center">
                    {(nBlogPosts.isLoading || nComments.isLoading) ? 
                        <div className="rounded-full"
                            style={{ width: `${10}rem`}}>
                            <Spinner size={10}/> 
                        </div> :
                        <ProfilePicture size={40} imgUrl={imgUrl}/>}
                </div>
            </div>

            <div className="mt-20 text-center pb-8">
                <h1 className="text-4xl font-bold">{name}</h1>
                <p className="mt-3 text-gray-400">joined <span className="text-grey-400">{(dateJoined)? timeAgo(dateJoined) : ''}</span></p>
            </div>

            <div className="wx-1/2">
                <div className="grid grid-cols-2 gap-48 text-center grid-padding-64">
                <div>
                    {(nBlogPosts.isLoading) ? 
                        <Spinner size={2}/> : 
                        <p className="font-bold text-gray-700 text-xl">{nBlogPosts.data}</p>}
                    <p className="text-gray-400">Blog Posts</p>
                </div>
                <div>
                    {(nComments.isLoading) ?
                        <Spinner size={2}/> : 
                        <p className="font-bold text-gray-700 text-xl">{nComments.data}</p>}
                    <p className="text-gray-400">Comments</p>
                </div>
                </div>
            </div>
        </div>);
};
