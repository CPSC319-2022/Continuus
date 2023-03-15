import { type NextPage } from "next";
import { Layout } from "~/components/Layout";
import { api } from "../../utils/api";
import { useRouter } from "next/router";

const Profile: NextPage = () => {
  // use this
  //const { data } = api.user.currentUser.useQuery();
  const router = useRouter();
  const id = router.query.id as string;


  // add mutation if editing user profile

  return (
    <Layout>
      <div>
        <p className="text-3xl">Profile</p>
        <pre className="my-4">{JSON.stringify(data, null, 2)}</pre>
      </div>
    </Layout>
  );
};

export default Profile;
