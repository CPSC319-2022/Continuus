import type { BlogPost, User, Comment } from "@prisma/client";
import { useState, useMemo, useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { api } from "~/utils/api";
import { CommentModal } from "./CommentModal";
import { Spinner } from "./Spinner";
import { BlogPost as BlogPostComponent } from "./BlogPost";

type Post = BlogPost & { user: User; comments: (Comment & { user: User })[] };

export const BlogPostViewer: React.FC = () => {
  const [view, setView] = useState<string>("Recent");
  const {
    data: blogPosts,
    fetchNextPage,
    hasNextPage,
  } = api.blogPost.get.useInfiniteQuery(
    {
      take: 20,
    },
    { getNextPageParam: (lastPage) => ({ id: lastPage.nextCursor }) }
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
    <div className="w-full md:w-1/2 ">
      <div className="mb-6 flex w-full justify-end">
        <select
          className="h-8 w-64 max-w-xs border-b-2 bg-white"
          onChange={(e) => setView(e.target.value)}
        >
          <option>Recent</option>
          <option>Popular</option>
        </select>
      </div>
      {posts?.length === 0
        ? "Nothing to see here"
        : posts?.map(
            ({
              id,
              title,
              updatedAt,
              content,
              comments,
              user: { name, image },
            }) => (
              <>
                <div key={id} className="mb-6">
                  <BlogPostComponent
                    id={id}
                    name={name as string}
                    title={title}
                    lastUpdated={updatedAt}
                    imageUrl={image as string}
                    content={content}
                    comments={(comments as Comment[]).length}
                  />
                </div>
                <CommentModal
                  id={id}
                  title={title}
                  comments={comments as (Comment & { user: User })[]}
                  poster={name as string}
                  lastUpdated={updatedAt}
                  post={content}
                  posterAvatarUrl={image as string}
                />
              </>
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
