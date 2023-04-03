import { api } from "~/utils/api";
import {Spinner} from "./Spinner";
import { Comment } from "./Comment";
import {useInView} from "react-intersection-observer";
import {useEffect} from "react";
import { setSelectedPost } from "~/redux/slices/posts";
import {useAppDispatch} from "~/redux/hooks";

interface ProfileCommentViewerProps {
    userId: string;
}

export const ProfileCommentViewer: React.FC<ProfileCommentViewerProps> = ({
    userId
    }) => {
    const {
        data: commentsQueryResults,
        fetchNextPage,
        hasNextPage,
        status,
    } =  api.comment.get.useInfiniteQuery(
        {
            take: 20,
            where: {
                userId: userId,
            },
        },
        {
            getNextPageParam: (lastPage) =>
                lastPage.nextCursor ? { id: lastPage.nextCursor } : undefined,
        }
    );

    const { ref, inView } = useInView();
      useEffect(() => {
        if (inView) {
          void (async () => {
            await fetchNextPage();
          })();
        }
      }, [inView, fetchNextPage]);


    const dispatch = useAppDispatch();

    return (<>
        {status === 'loading' ? <Spinner size={2}/>
        : commentsQueryResults?.pages.map((page) => 
                                          page.items.map((comment) =>
                     <div className="w-full mb-6 p-6 border rounded-md shadow-md" key={`${comment.id}`}>
                        <div className="mb-2 flex border-b">
                            <div className="mb-2">Commented on</div>
                            <div className="mb-2 ml-1 font-bold cursor-pointer" 
                                 onClick={() => dispatch(setSelectedPost(comment.blogPost.id))}>{comment.blogPost.title}</div>
                        </div>
                        <Comment
                            key={`${comment.id}`}
                            dateAdded={comment.createdAt}
                            comment={comment.content}
                            name={comment.user.name}
                            userId={comment.userId}
                            imgUrl={comment.user.image}
                            commentId={comment.id}
                            dateUpdated={comment.updatedAt}
                        />
                    </div>
            ))}
        {hasNextPage && (
            <div className="my-5 flex justify-center" ref={ref}>
                <Spinner size={2}/>
            </div>
        )}
        </>
    );
};
