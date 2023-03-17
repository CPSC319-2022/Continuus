import { type NextPage } from "next";
import { signIn, signOut, useSession } from "next-auth/react";
import { api } from "../utils/api";
import { Layout } from "../components/Layout";
import { BlogPost as BlogPostComponent } from "../components/BlogPost";
import { useEffect, useMemo, useRef, useState } from "react";
import type { User, Comment, BlogPost } from "@prisma/client";
import { CommentModal } from "~/components/CommentModal";
import { CreateBlogPostWidget } from "~/components/create-blog-post-widget";
import { useInView } from "react-intersection-observer";

const Home: NextPage = () => {
  const [view, setView] = useState<string>("Recent");
  const [page, setPage] = useState(0);
  const { data: blogPosts, fetchNextPage } = api.blogPost.get.useInfiniteQuery(
    {
      take: 10,
    },
    { getNextPageParam: (lastPage) => lastPage.nextCursor }
  );

  const posts = useMemo(() => {
    console.log(blogPosts);
    return blogPosts?.pages[page]?.items ?? [];
  }, [blogPosts, page]);

  const { ref, inView, entry } = useInView();

  useEffect(() => {
    if (inView) {
      void (async () => {
        await fetchNextPage();
      })();
    }
  }, [inView, fetchNextPage]);

  return (
    <Layout>
      <div className="flex min-h-screen flex-col content-center items-center w-full px-2 md:px-0 mt-4">
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
          {posts.length === 0
            ? "Nothing to see here"
            : posts.map(
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
        </div>
      </div>
      <CreateBlogPostWidget />
    </Layout>
  );
};

export default Home;
