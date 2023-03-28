import { type NextPage } from "next";
import { Layout } from "../components/Layout";

import { CreateBlogPostWidget } from "~/components/create-blog-post-widget";
import { BlogPostViewer } from "~/components/BlogPostViewer";
import { useAppSelector } from "~/redux/hooks";
import { CommentModal } from "~/components/CommentModal";
import { api } from "~/utils/api";
import { CommentModalNew } from "~/components/CommentModalNew";

const Home: NextPage = () => {
  const {
    posts: { selectedPost },
  } = useAppSelector((state) => state);

  const { data: post } = api.blogPost.getOne.useQuery({
    where: { id: selectedPost ?? "" },
  });

  return (
    <Layout>
      <div className="mt-4 flex min-h-screen w-full flex-col content-center items-center px-2 md:px-0">
        <BlogPostViewer />
        <CreateBlogPostWidget />
        <CommentModalNew />
      </div>
    </Layout>
  );
};

export default Home;
