import { api } from "~/utils/api";
import {Spinner} from "./Spinner";
import { Comment } from "./Comment";
import {useInView} from "react-intersection-observer";
import {useEffect} from "react";

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

    return (<>
        {status === 'loading' ? <Spinner size={2}/>
        : commentsQueryResults?.pages.map((page) => 
                                          page.items.map((comment) =>
                     <div key={`${comment.id}`}>
                        <div className="card-body m-[-15px]">
                            <p>{comment.blogPost.title}</p>
                        </div>
                        <Comment
                            key={`${comment.id}`}
                            dateAdded={comment.createdAt}
                            comment={comment.content}
                            name={comment.user.name}
                            userId={comment.userId}
                            imgUrl={comment.user.image}
                            commentId={comment.id}
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
