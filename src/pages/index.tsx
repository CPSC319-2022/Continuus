import { type NextPage } from "next";
import { Layout } from "../components/Layout";

import { CreateBlogPostWidget } from "~/components/create-blog-post-widget";
import { BlogPostViewer } from "~/components/BlogPostViewer";

const Home: NextPage = () => {
  return (
    <Layout>
      <div className="mt-4 flex min-h-screen w-full flex-col content-center items-center px-2 md:px-0">
        <BlogPostViewer />
        <CreateBlogPostWidget />
      </div>
    </Layout>
  );
};

export default Home;
