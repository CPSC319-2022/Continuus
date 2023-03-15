import { type NextPage } from "next";
import { signIn, signOut, useSession } from "next-auth/react";

import { api } from "../utils/api";
import { CreateBlogPostButton } from "~/components/CreateBlogPostButton";
import { Layout } from "../components/Layout";
import { BlogPost } from "../components/BlogPost";
import { Modal } from "../components/Modal";
import { useEffect, useState } from "react";

const Home: NextPage = () => {
  const [view, setView] = useState<string>("Recent");
  const blogPosts = api.blogPost.get.useQuery({});

  useEffect(() => {
    console.log(`Switched to ${view}`);
  }, [view]);

  return (
    <Layout>
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
                    lastUpdated={updatedAt.toISOString()}
                    imageUrl={image as string}
                    content={content}
                    comments={comments.length}
                  />
                </div>
                <Modal
                  id={id}
                  title={title}
                  comments={comments}
                  poster={name as string}
                  lastUpdated={updatedAt.toISOString()}
                  post={content}
                  posterAvatarUrl={image as string}
                />
              </>
            )
          )}
      {/* will use this later to map to the blog post cards */}
      {/* <div>{JSON.stringify(blogPosts.data)}</div> */}
      {/* <div className="flex flex-col items-center gap-2">
        <p className="text-2xl ">
          {hello.data ? hello.data.greeting : "Loading tRPC query..."}
        </p>
        <AuthShowcase />
      </div> */}
      <CreateBlogPostButton />
    </Layout>
  );
};

export default Home;

const AuthShowcase: React.FC = () => {
  const { data: sessionData } = useSession();

  const { data: secretMessage } = api.example.getSecretMessage.useQuery(
    undefined, // no input
    { enabled: sessionData?.user !== undefined }
  );

  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <p className="text-center text-2xl ">
        {sessionData && <span>Logged in as {sessionData.user?.name}</span>}
        {secretMessage && <span> - {secretMessage}</span>}
      </p>
      <button
        className="rounded-full bg-white/10 px-10 py-3 font-semibold  no-underline transition hover:bg-white/20"
        onClick={sessionData ? () => void signOut() : () => void signIn()}
      >
        {sessionData ? "Sign out" : "Sign in"}
      </button>
    </div>
  );
};
