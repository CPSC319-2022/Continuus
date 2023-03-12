import { type NextPage } from "next";
import { signIn, signOut, useSession } from "next-auth/react";

import { api } from "../utils/api";
import { Layout } from "../components/Layout";
import { BlogPost } from "../components/BlogPost";

const blogPostDummyData = [
  {
    id: 1,
    name: "Jerry Jim",
    lastUpdated: "6 minutes ago",
    imageUrl:
      "https://media.licdn.com/dms/image/D5603AQFanf7t8wpKBg/profile-displayphoto-shrink_800_800/0/1667543356810?e=1684368000&v=beta&t=CMGwGsoUHQqwfIj_oRyGwMAKvzYtSVPbd_5IiESDLbg",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
  },
  {
    id: 2,
    name: "Bob Brown",
    lastUpdated: "7 minutes ago",
    imageUrl: "https://i.pravatar.cc/150?img=2",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium.",
  },
  {
    id: 3,
    name: "Charlie Chan",
    lastUpdated: "2 minutes ago",
    imageUrl: "https://i.pravatar.cc/150?img=3",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium.",
  },
  {
    id: 4,
    name: "David Davis",
    lastUpdated: "5 minutes ago",
    imageUrl: "https://i.pravatar.cc/150?img=4",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium.",
  },
  {
    id: 5,
    name: "Eve Evans",
    lastUpdated: "10 minutes ago",
    imageUrl: "https://i.pravatar.cc/150?img=5",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium.",
  },
  {
    id: 6,
    name: "Frank Ford",
    lastUpdated: "1 minute ago",
    imageUrl: "https://i.pravatar.cc/150?img=6",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium.",
  },
  {
    id: 7,
    name: "Grace Green",
    lastUpdated: "8 minutes ago",
    imageUrl: "https://i.pravatar.cc/150?img=7",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium.",
  },
  {
    id: 8,
    name: "Henry Harris",
    lastUpdated: "3 minutes ago",
    imageUrl: "https://i.pravatar.cc/150?img=8",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium.",
  },
];

const Home: NextPage = () => {
  const hello = api.example.hello.useQuery({ text: "from tRPC" });
  const blogPosts = api.blogPost.get.useQuery({});

  return (
    <Layout>
      <div className="flex min-h-screen flex-col content-center items-center">
        <div className="w-6/12">
          <div className="mb-6 w-full">
            <select className="select float-right w-full max-w-xs">
              <option>Recent</option>
              <option>Popular</option>
            </select>
          </div>
          {blogPostDummyData.map(
            ({ id, name, lastUpdated, imageUrl, content }) => (
              <div key={id} className="mb-6">
                <BlogPost
                  name={name}
                  lastUpdated={lastUpdated}
                  imageUrl={imageUrl}
                  content={content}
                />
              </div>
            )
          )}
          {/* will use this later to map to the blog post cards */}
          <div>{JSON.stringify(blogPosts.data)}</div>
          <div className="flex flex-col items-center gap-2">
            <p className="text-2xl ">
              {hello.data ? hello.data.greeting : "Loading tRPC query..."}
            </p>
            <AuthShowcase />
          </div>
        </div>
      </div>
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
