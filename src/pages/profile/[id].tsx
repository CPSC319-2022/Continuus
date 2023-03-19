import { type NextPage } from "next";
import { Layout } from "~/components/Layout";
import { api } from "../../utils/api";
import { useRouter } from "next/router";
import {Spinner} from "~/components/Spinner";
import {ProfileTabbedView} from "~/components/ProfileTabbedView";

const Profile: NextPage = () => {
  // use this
  //const { data } = api.user.currentUser.useQuery();
  const router = useRouter();
  if (!router.isReady) {
      return (
          <>
              <Layout>
                <div className="items-center">
                    <Spinner size={6}/>
                </div>
              </Layout>
          </>
      );
  }

  const id = router.query.id as string;
  console.log('id' + id);
  const {data} = api.user.selectedUser.useQuery({ text: id }); 

  // add mutation if editing user profile

  return (
    <Layout>
      <div className="mt-4 flex min-h-screen w-full flex-col content-center items-center px-2 md:px-0">
        <ProfileTabbedView />
      </div>
    </Layout>
  );
};

export default Profile;
