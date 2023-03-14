import { type NextPage } from "next";
import { signIn, signOut, useSession } from "next-auth/react";

import { api } from "../utils/api";
import { CreateBlogPostButton } from "~/components/CreateBlogPostButton";
import { Layout } from "../components/Layout";
import { BlogPost } from "../components/BlogPost";
import { Modal } from "../components/Modal";

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
        imageUrl: "https://i.pravatar.cc/150?img=20",
      },
      {
        name: "Jane Smith",
        comment: "I really enjoyed reading this.",
        dateAdded: "1 minute ago",
        imageUrl: "https://i.pravatar.cc/150?img=21",
      },
      {
        name: "Bob Johnson",
        comment: "Keep up the good work!",
        dateAdded: "3 minutes ago",
        imageUrl: "https://i.pravatar.cc/150?img=37",
      },
    ],
  },
  {
    id: 2,
    name: "Alice Lee",
    lastUpdated: "10 minutes ago",
    imageUrl: "https://i.pravatar.cc/150?img=2",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur id erat lacus. Praesent sodales semper libero nec rutrum. Ut varius augue ipsum, sit amet convallis neque mattis nec. Mauris imperdiet sem at libero dignissim pharetra. Curabitur ac volutpat ex. Vestibulum suscipit nisi vel tempor rhoncus. Proin convallis lectus ac tristique elementum. Ut in mauris eget dui hendrerit finibus luctus ac quam. Mauris consectetur urna vel augue tempus egestas. Nunc lobortis maximus risus a feugiat. Phasellus nec hendrerit justo, ut euismod turpis. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Cras at neque non arcu rhoncus luctus a at nulla. Vivamus egestas felis eu massa ultricies iaculis. Mauris imperdiet consequat nisi, ornare pulvinar mauris scelerisque a. Morbi semper mauris ex, ac hendrerit leo maximus a.",
    comments: [
      {
        name: "Bob Johnson",
        comment: "Great article!",
        dateAdded: "5 minutes ago",
        imageUrl: "https://i.pravatar.cc/150?img=23",
      },
      {
        name: "Sarah Williams",
        comment: "I learned something new from this.",
        dateAdded: "2 minutes ago",
        imageUrl: "https://i.pravatar.cc/150?img=24",
      },
    ],
  },
  {
    id: 3,
    name: "David Kim",
    lastUpdated: "15 minutes ago",
    imageUrl: `https://i.pravatar.cc/150?img=3`,
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur id erat lacus. Praesent sodales semper libero nec rutrum. Ut varius augue ipsum, sit amet convallis neque mattis nec. Mauris imperdiet sem at libero dignissim pharetra. Curabitur ac volutpat ex. Vestibulum suscipit nisi vel tempor rhoncus. Proin convallis lectus ac tristique elementum. Ut in mauris eget dui hendrerit finibus luctus ac quam. Mauris consectetur urna vel augue tempus egestas. Nunc lobortis maximus risus a feugiat. Phasellus nec hendrerit justo, ut euismod turpis. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Cras at neque non arcu rhoncus luctus a at nulla. Vivamus egestas felis eu massa ultricies iaculis. Mauris imperdiet consequat nisi, ornare pulvinar mauris scelerisque a. Morbi semper mauris ex, ac hendrerit leo maximus a. Donec pulvinar sodales nunc, scelerisque rhoncus est vestibulum eu. Fusce a consequat ipsum, lacinia dictum nisi. Pellentesque nec commodo metus. Ut congue feugiat cursus. Nam at leo semper, fringilla eros et, convallis turpis. Morbi elit diam, pulvinar sit amet mauris ut, pellentesque molestie augue. Vestibulum sed finibus elit, vel porttitor orci. Integer fermentum sed turpis eget vulputate. Pellentesque vehicula fermentum orci, in fermentum purus porta vitae. Nulla eu lectus elit. Sed consequat ullamcorper velit, non lacinia nisl consectetur semper. Aenean nec velit et justo sodales cursus aliquet id justo. Nam ac lectus purus. Curabitur sed eros interdum, ornare justo vitae, dapibus mi. Curabitur sit amet lobortis erat. Ut sit amet tincidunt tellus, a mattis ex. Praesent faucibus nisl a dolor tincidunt, sit amet sagittis orci ultricies. Cras eleifend justo in faucibus auctor. Suspendisse vel nulla porta, condimentum orci sed, volutpat turpis. Nunc id pellentesque felis. Aliquam nec magna et justo auctor volutpat eget id turpis. Quisque ac vehicula nibh. Fusce non arcu et dolor ultrices faucibus tempus molestie nunc. Aenean ultricies nisl vitae scelerisque rhoncus. Praesent cursus, massa vitae hendrerit consectetur, mi lectus auctor dolor, quis auctor elit libero eget dolor. Nam imperdiet congue tortor, non tempus eros ultrices eu. Cras sollicitudin, ligula eu pulvinar fringilla, turpis ligula auctor sem, ut tincidunt arcu elit ut ex. Nunc vitae ex malesuada, euismod leo vitae, aliquam mauris. Vestibulum aliquam convallis blandit. Ut non suscipit nulla. Etiam consequat dapibus nunc, in pellentesque urna pellentesque a. Sed suscipit scelerisque efficitur. Pellentesque malesuada, nisl eget elementum hendrerit, quam elit commodo tortor, in euismod nunc ligula sit amet tellus. Duis blandit purus ligula, vel fringilla neque hendrerit at. Curabitur molestie finibus pharetra. Aenean ut efficitur diam, at faucibus lectus. Praesent dictum fringilla erat, vitae dapibus magna ornare ac. Sed nec nisi sem. Phasellus finibus, augue vel ornare imperdiet, arcu risus faucibus libero, sit amet tincidunt est quam a leo. Suspendisse eu nulla auctor, ultrices velit a, porttitor quam. Cras leo nibh, fermentum ullamcorper venenatis at, elementum id mauris.",
    comments: [
      {
        name: "Emily Chen",
        comment: "Thanks for sharing!",
        dateAdded: "12 minutes ago",
        imageUrl: "https://i.pravatar.cc/150?img=25",
      },
      {
        name: "Michael Brown",
        comment: "I liked your perspective on this topic.",
        dateAdded: "8 minutes ago",
        imageUrl: "https://i.pravatar.cc/150?img=38",
      },
    ],
  },
  {
    id: 4,
    name: "Maria Rodriguez",
    lastUpdated: "just now",
    imageUrl: "https://i.pravatar.cc/150?img=4",
    content:
      "Nam ac lectus purus. Curabitur sed eros interdum, ornare justo vitae, dapibus mi. Curabitur sit amet lobortis erat. Ut sit amet tincidunt tellus, a mattis ex. Praesent faucibus nisl a dolor tincidunt, sit amet sagittis orci ultricies. Cras eleifend justo in faucibus auctor. Suspendisse vel nulla porta, condimentum orci sed, volutpat turpis. Nunc id pellentesque felis.",
    comments: [
      {
        name: "John Smith",
        comment: "Interesting post!",
        dateAdded: "2 minutes ago",
        imageUrl: "https://i.pravatar.cc/150?img=26",
      },
      {
        name: "Jane Doe",
        comment:
          "I have a different opinion on this, but good write-up nonetheless.",
        dateAdded: "just now",
        imageUrl: "https://i.pravatar.cc/150?img=27",
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
        imageUrl: "https://i.pravatar.cc/150?img=28",
      },
      {
        name: "Alex Johnson",
        comment: "I found this very informative.",
        dateAdded: "2 minutes ago",
        imageUrl: "https://i.pravatar.cc/150?img=29",
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
        imageUrl: "https://i.pravatar.cc/150?img=30",
      },
      {
        name: "Michael Brown",
        comment: "This gave me a new perspective on the topic.",
        dateAdded: "8 minutes ago",
        imageUrl: "https://i.pravatar.cc/150?img=31",
      },
    ],
  },
  {
    id: 7,
    name: "Karen Smith",
    lastUpdated: "5 minutes ago",
    imageUrl: "https://i.pravatar.cc/150?img=7",
    content:
      "Nunc vitae ex malesuada, euismod leo vitae, aliquam mauris. Vestibulum aliquam convallis blandit. Ut non suscipit nulla. Etiam consequat dapibus nunc, in pellentesque urna pellentesque a. Sed suscipit scelerisque efficitur. Pellentesque malesuada, nisl eget elementum hendrerit, quam elit commodo tortor, in euismod nunc ligula sit amet tellus. Duis blandit purus ligula, vel fringilla neque hendrerit at. Curabitur molestie finibus pharetra. Aenean ut efficitur diam, at faucibus lectus. Praesent dictum fringilla erat, vitae dapibus magna ornare ac. Sed nec nisi sem. Phasellus finibus, augue vel ornare imperdiet, arcu risus faucibus libero, sit amet tincidunt est quam a leo. Suspendisse eu nulla auctor, ultrices velit a, porttitor quam. Cras leo nibh, fermentum ullamcorper venenatis at, elementum id mauris.",
    comments: [
      {
        name: "David Kim",
        comment: "Great post, thanks for sharing!",
        dateAdded: "2 minutes ago",
        imageUrl: "https://i.pravatar.cc/150?img=32",
      },
      {
        name: "Alice Lee",
        comment: "I learned something new from this.",
        dateAdded: "1 minute ago",
        imageUrl: "https://i.pravatar.cc/150?img=33",
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
        imageUrl: "https://i.pravatar.cc/150?img=34",
      },
      {
        name: "Jane Smith",
        comment: "Thanks for sharing!",
        dateAdded: "2 minutes ago",
        imageUrl: "https://i.pravatar.cc/150?img=35",
      },
    ],
  },
  {
    id: 9,
    name: "William Johnson",
    lastUpdated: "15 minutes ago",
    imageUrl: "https://i.pravatar.cc/150?img=9",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur id erat lacus. Praesent sodales semper libero nec rutrum. Ut varius augue ipsum, sit amet convallis neque mattis nec. Mauris imperdiet sem at libero dignissim pharetra. Curabitur ac volutpat ex. Vestibulum suscipit nisi vel tempor rhoncus. Proin convallis lectus ac tristique elementum. Ut in mauris eget dui hendrerit finibus luctus ac quam. Mauris consectetur urna vel augue tempus egestas. Nunc lobortis maximus risus a feugiat. Phasellus nec hendrerit justo, ut euismod turpis. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Cras at neque non arcu rhoncus luctus a at nulla. Vivamus egestas felis eu massa ultricies iaculis. Mauris imperdiet consequat nisi, ornare pulvinar mauris scelerisque a. Morbi semper mauris ex, ac hendrerit leo maximus a.",
    comments: [
      {
        name: "Sarah Williams",
        comment: "I enjoyed reading this.",
        dateAdded: "12 minutes ago",
        imageUrl: "https://i.pravatar.cc/150?img=36",
      },
      {
        name: "Bob Johnson",
        comment: "Keep up the good work!",
        dateAdded: "8 minutes ago",
        imageUrl: "https://i.pravatar.cc/150?img=37",
      },
    ],
  },
];

const Home: NextPage = () => {
  const hello = api.example.hello.useQuery({ text: "from tRPC" });
  const blogPosts = api.blogPost.get.useQuery({});

  return (
    <Layout>
      <CreateBlogPostButton />
      <div className="flex min-h-screen flex-col content-center items-center">
        <div className="w-6/12">
          <div className="mb-6 w-full">
            <select className="select float-right w-full max-w-xs">
              <option>Recent</option>
              <option>Popular</option>
            </select>
          </div>
          {blogPostDummyData.map(
            ({ id, name, lastUpdated, imageUrl, content, comments }) => (
              <>
                <div key={id} className="mb-6">
                  <BlogPost
                    id={id}
                    name={name}
                    lastUpdated={lastUpdated}
                    imageUrl={imageUrl}
                    content={content}
                    comments={comments.length}
                  />
                </div>
                <Modal
                  id={id}
                  comments={comments}
                  poster={name}
                  lastUpdated={lastUpdated}
                  post={content}
                  posterAvatarUrl={imageUrl}
                />
              </>
            )
          )}
        </div>
        {/* will use this later to map to the blog post cards */}
        <div>{JSON.stringify(blogPosts.data)}</div>
        <div className="flex flex-col items-center gap-2">
          <p className="text-2xl ">
            {hello.data ? hello.data.greeting : "Loading tRPC query..."}
          </p>
          <AuthShowcase />
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
