import { type NextPage } from "next";
import {useRouter} from "next/router";
import {CreateBlogPostWidget} from "~/components/create-blog-post-widget";
import { Layout } from "~/components/Layout";
import {ProfileTabbedView} from "~/components/ProfileTabbedView";
import {Spinner} from "~/components/Spinner";
import {api} from "~/utils/api";

const Profile: NextPage = () => {
  const router = useRouter();
  const id = router.query.id as string;
  const { data: userData, isLoading: isUserDataLoading } = api.user.selectedUser.useQuery({
      userId: id,
  });

  return (
    <Layout>
        {(router.isReady && !isUserDataLoading) ? 
            <>
        <ProfileTabbedView 
            userId={userData!.id}
            createdAt={userData!.createdAt}
            name={userData?.name ?? "UNNAMED USER"}
            imgUrl={userData?.image}
        />
                <CreateBlogPostWidget />
            </>
            : 
                <div className="mt-4 flex content-center justify-center w-full">
                    <Spinner/>
                </div>}
    </Layout>
  );
};

export default Profile;
