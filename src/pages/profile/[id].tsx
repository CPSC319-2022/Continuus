import { type NextPage } from "next";
import {CreateBlogPostWidget} from "~/components/create-blog-post-widget";
import { Layout } from "~/components/Layout";
import {ProfileTabbedView} from "~/components/ProfileTabbedView";

const Profile: NextPage = () => {
  return (
    <Layout>
        <ProfileTabbedView />
        <CreateBlogPostWidget />
    </Layout>
  );
};

export default Profile;
