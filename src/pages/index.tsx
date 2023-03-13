import { type NextPage } from "next";
import { signIn, signOut, useSession } from "next-auth/react";

import { api } from "../utils/api";
import { Layout } from "../components/Layout";
import { BlogPost } from "../components/BlogPost";
import { Modal } from "~/components/Modal";

const blogPostDummyData = [
  {
    id: 1,
    name: "Jerry Jim",
    lastUpdated: "6 minutes ago",
    imageUrl:
      "https://media.licdn.com/dms/image/D5603AQFanf7t8wpKBg/profile-displayphoto-shrink_800_800/0/1667543356810?e=1684368000&v=beta&t=CMGwGsoUHQqwfIj_oRyGwMAKvzYtSVPbd_5IiESDLbg",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    comments: [
      {
        name: "John Doe",
        comment: "Nice post!",
        dateAdded: "2 minutes ago",
      },
      {
        name: "Jane Smith",
        comment: "I really enjoyed reading this.",
        dateAdded: "1 minute ago",
      },
    ],
  },
  {
    id: 2,
    name: "Alice Lee",
    lastUpdated: "10 minutes ago",
    imageUrl: "https://i.pravatar.cc/150?img=2",
    content:
      "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam.",
    comments: [
      {
        name: "Bob Johnson",
        comment: "Great article!",
        dateAdded: "5 minutes ago",
      },
      {
        name: "Sarah Williams",
        comment: "I learned something new from this.",
        dateAdded: "2 minutes ago",
      },
    ],
  },
  {
    id: 3,
    name: "David Kim",
    lastUpdated: "15 minutes ago",
    imageUrl: `https://i.pravatar.cc/150?img=3`,
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    comments: [
      {
        name: "Emily Chen",
        comment: "Thanks for sharing!",
        dateAdded: "12 minutes ago",
      },
      {
        name: "Michael Brown",
        comment: "I liked your perspective on this topic.",
        dateAdded: "8 minutes ago",
      },
    ],
  },
  {
    id: 4,
    name: "Maria Rodriguez",
    lastUpdated: "just now",
    imageUrl: "https://i.pravatar.cc/150?img=4",
    content:
      "Suspendisse vel velit nulla. Sed egestas nulla ut purus semper, at dignissim elit maximus.",
    comments: [
      {
        name: "John Smith",
        comment: "Interesting post!",
        dateAdded: "2 minutes ago",
      },
      {
        name: "Jane Doe",
        comment:
          "I have a different opinion on this, but good write-up nonetheless.",
        dateAdded: "just now",
      },
    ],
  },
  {
    id: 5,
    name: "Jason Lee",
    lastUpdated: "10 minutes ago",
    imageUrl: "https://i.pravatar.cc/150?img=5",
    content:
      "Curabitur malesuada augue quis tellus cursus, nec malesuada velit eleifend. Suspendisse potenti. Aliquam fermentum pharetra leo, et tincidunt velit interdum eu.",
    comments: [
      {
        name: "Jennifer Brown",
        comment: "Thanks for sharing your thoughts!",
        dateAdded: "5 minutes ago",
      },
      {
        name: "Alex Johnson",
        comment: "I found this very informative.",
        dateAdded: "2 minutes ago",
      },
    ],
  },
  {
    id: 6,
    name: "Maximilian Schneider",
    lastUpdated: "20 minutes ago",
    imageUrl: "https://i.pravatar.cc/150?img=6",
    content:
      "Nulla nec interdum eros. Sed bibendum suscipit eros ac consectetur. Vestibulum ac felis nulla.",
    comments: [
      {
        name: "Emily Chen",
        comment: "I like your writing style!",
        dateAdded: "12 minutes ago",
      },
      {
        name: "Michael Brown",
        comment: "This gave me a new perspective on the topic.",
        dateAdded: "8 minutes ago",
      },
    ],
  },
  {
    id: 7,
    name: "Karen Smith",
    lastUpdated: "5 minutes ago",
    imageUrl: "https://i.pravatar.cc/150?img=7",
    content:
      "Vestibulum condimentum purus eu quam tempor, a lacinia justo aliquet. Nam tincidunt nisl at consectetur cursus.",
    comments: [
      {
        name: "David Kim",
        comment: "Great post, thanks for sharing!",
        dateAdded: "2 minutes ago",
      },
      {
        name: "Alice Lee",
        comment: "I learned something new from this.",
        dateAdded: "1 minute ago",
      },
    ],
  },
  {
    id: 8,
    name: "Alexandra Garcia",
    lastUpdated: "10 minutes ago",
    imageUrl: "https://i.pravatar.cc/150?img=8",
    content:
      "Fusce vel aliquam augue. Praesent rutrum eros in purus volutpat, a lacinia magna posuere. Sed aliquet semper arcu, at scelerisque nulla suscipit quis.",
    comments: [
      {
        name: "John Doe",
        comment: "Interesting perspective on this topic.",
        dateAdded: "5 minutes ago",
      },
      {
        name: "Jane Smith",
        comment: "Thanks for sharing!",
        dateAdded: "2 minutes ago",
      },
    ],
  },
  {
    id: 9,
    name: "William Johnson",
    lastUpdated: "15 minutes ago",
    imageUrl: "https://i.pravatar.cc/150?img=9",
    content:
      "Vestibulum at consequat nulla. Fusce scelerisque ullamcorper dui, eget egestas nisl faucibus sit amet.",
    comments: [
      {
        name: "Sarah Williams",
        comment: "I enjoyed reading this.",
        dateAdded: "12 minutes ago",
      },
      {
        name: "Bob Johnson",
        comment: "Keep up the good work!",
        dateAdded: "8 minutes ago",
      },
    ],
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
            ({ id, name, lastUpdated, imageUrl, content, comments}) => (
              <><div key={id} className="mb-6">
                <BlogPost
                  id={id}
                  name={name}
                  lastUpdated={lastUpdated}
                  imageUrl={imageUrl}
                  content={content}
                  comments={comments.length} />
              </div><Modal id={id} BlogPost={<BlogPost
                  id={id}
                  name={name}
                  lastUpdated={lastUpdated}
                  imageUrl={imageUrl}
                  content={content}
                  comments={comments.length} />} comments={comments}/></>
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
