import { type NextPage } from "next";
import { Layout } from "~/components/Layout";
import {ProfileTabbedView} from "~/components/ProfileTabbedView";

const Profile: NextPage = () => {
  return (
    <Layout>
      <div className="mt-4 flex min-h-screen w-full flex-col content-center items-center px-2 md:px-0">
        <ProfileTabbedView />
      </div>
    </Layout>
  );
};

export default Profile;
