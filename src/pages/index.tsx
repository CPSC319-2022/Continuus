import { type NextPage } from "next";
import { Layout } from "../components/Layout";

import { CreateBlogPostWidget } from "~/components/create-blog-post-widget";
import { BlogPostViewer } from "~/components/BlogPostViewer";
import { useAppSelector } from "~/redux/hooks";
import { CommentModal } from "~/components/CommentModal";

const Home: NextPage = () => {
  const {
    posts: { selectedPost },
  } = useAppSelector((state) => state);
  return (
    <Layout>
      <div className="mt-4 flex min-h-screen w-full flex-col content-center items-center px-2 md:px-0">
        <BlogPostViewer />
        <CreateBlogPostWidget />
        {selectedPost && <CommentModal {...selectedPost} />}
      </div>
    </Layout>
  );
};

export default Home;
