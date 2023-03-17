import { type NextPage } from "next";
import { api } from "../utils/api";
import { Layout } from "../components/Layout";
import { BlogPost as BlogPostComponent } from "../components/BlogPost";
import { useEffect, useMemo, useState } from "react";
import type { User, Comment, BlogPost } from "@prisma/client";
import { CommentModal } from "~/components/CommentModal";
import { CreateBlogPostWidget } from "~/components/create-blog-post-widget";
import { useInView } from "react-intersection-observer";
import { Spinner } from "~/components/Spinner";

type Post = BlogPost & { user: User; comments: (Comment & { user: User })[] };

const Home: NextPage = () => {
  const [view, setView] = useState<string>("Recent");
  const { data: blogPosts, fetchNextPage } = api.blogPost.get.useInfiniteQuery(
    {
      take: 10,
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
    console.log(inView);
    if (inView) {
      void (async () => {
        await fetchNextPage();
      })();
    }
  }, [inView, fetchNextPage]);

  return (
    <Layout>
      <div className="mt-4 flex min-h-screen w-full flex-col content-center items-center px-2 md:px-0">
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
          <div className="my-5 flex w-full justify-center" ref={ref}>
            <Spinner size={2} />
          </div>
        </div>
      </div>
      <CreateBlogPostWidget />
    </Layout>
  );
};

export default Home;
