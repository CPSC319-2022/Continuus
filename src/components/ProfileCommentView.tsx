import { api } from "~/utils/api";

interface ProfileCommentViewerProps {
    userId: string;
}

export const ProfileCommentViewer: React.FC<ProfileCommentViewerProps> = ({
    userId
    }) => {
    const {
        data: postx,
        fetchNextPage,
        hasNextPage,
    } =  api.comment.get.useInfiniteQuery(
        {
            take: 20,
            where: {
                userId: userId,
            },
        }
    );

    return <div>
        {postx ? postx.items.map(
             ({
                 id: commentId,
                 content: comment,
                 createdAt: dataAdded,
                 user: { name: authorName, id: commenterId, image },
             }) => {
                 <Comment
                    key={`${commentId}`}
                    dateAdded={dateAdded}
                    comment={comment}
                    name={authorName}
                    userId={commenterId}
                    imgUrl={image}
                    commentId={commentId}
                    />
            )
        )} :

    </div>
}
