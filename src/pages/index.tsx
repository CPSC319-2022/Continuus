import { type NextPage } from "next";

import { api } from "../utils/api";
import { BlogPost } from "../components/BlogPost";
import { CommentModal } from "../components/CommentModal";
import { CreateBlogPostWidget } from "~/components/create-blog-post-widget";
import { Layout } from "../components/Layout";
import { useEffect, useState } from "react";
import type { User, Comment } from "@prisma/client";

const Home: NextPage = () => {
  const [view, setView] = useState<string>("Recent");
  const blogPosts = api.blogPost.get.useQuery({});

  useEffect(() => {
    console.log(`Switched to ${view}`);
  }, [view]);

  return (
    <Layout>
      <div className="flex min-h-screen flex-col content-center items-center w-full px-2 md:px-0">
        <div className="w-full md:w-2/3 md:translate-x-[-15%]">
          <div className="mb-6 flex w-full justify-end">
            <select
              className="h-8 w-64 max-w-xs border-b-2 bg-white"
              onChange={(e) => setView(e.target.value)}
            >
              <option>Recent</option>
              <option>Popular</option>
            </select>
          </div>
          {blogPosts.data?.length === 0
            ? "Nothing to see here"
            : blogPosts.data?.map(
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
                    <BlogPost
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
