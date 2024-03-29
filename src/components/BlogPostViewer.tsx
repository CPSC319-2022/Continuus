import type { BlogPost, User, Comment } from "@prisma/client";
import { useMemo, useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { api } from "~/utils/api";
import { Spinner } from "./Spinner";
import { BlogPost as BlogPostComponent } from "./BlogPost";

type Post = BlogPost & { user: User; comments: (Comment & { user: User })[] };

export interface BlogPostViewerProps {
  user?: string;
}

export const BlogPostViewer: React.FC<BlogPostViewerProps> = ({ user }) => {
  const {
    data: blogPosts,
    fetchNextPage,
    hasNextPage,
  } = user
    ? api.blogPost.get.useInfiniteQuery(
        {
          take: 20,
          where: {
            userId: user,
          },
        },
        {
          getNextPageParam: (lastPage) =>
            lastPage.nextCursor ? { id: lastPage.nextCursor } : undefined,
        }
      )
    : api.blogPost.get.useInfiniteQuery(
        {
          take: 20,
        },
        {
          getNextPageParam: (lastPage) =>
            lastPage.nextCursor ? { id: lastPage.nextCursor } : undefined,
        }
      );

  const posts = useMemo(
    () =>
      blogPosts?.pages.reduce(
        (result, curr) => [...result, ...curr.items],
        [] as Post[]
      ),
    [blogPosts]
  );
  const { ref, inView } = useInView();
  useEffect(() => {
    if (inView) {
      void (async () => {
        await fetchNextPage();
      })();
    }
  }, [inView, fetchNextPage]);
  return (
    <div className="w-full self-center">
      {posts?.length === 0
        ? "Nothing to see here"
        : posts?.map(
            ({
              id,
              userId,
              title,
              updatedAt,
              createdAt,
              content,
              comments,
              user,
            }) => (
              <div key={id} className="mb-6">
                <BlogPostComponent
                  id={id}
                  authorId={userId}
                  title={title}
                  lastUpdated={updatedAt}
                  createdAt={createdAt}
                  content={content}
                  comments={(comments as Comment[]).length}
                  authorName={user.name || ""}
                  imgUrl={user.image}
                />
              </div>
            )
          )}
      {hasNextPage && (
        <div className="my-5 flex justify-center" ref={ref}>
          <Spinner size={2} />
        </div>
      )}
    </div>
  );
};
