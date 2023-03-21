import { type NextPage } from "next";
import { Layout } from "~/components/Layout";
import {ProfileTabbedView} from "~/components/ProfileTabbedView";

const Profile: NextPage = () => {
  return (
    <Layout>
        <ProfileTabbedView />
    </Layout>
  );
};

export default Profile;
