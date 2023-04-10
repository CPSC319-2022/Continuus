import { type NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { Layout } from "~/components/Layout";
import { Spinner } from "~/components/Spinner";
import { UserTable } from "~/components/UserTable";
import { api } from "../utils/api";

const AdminPanel: NextPage = () => {
  const currUser = api.user.currentUser.useQuery();
  const router = useRouter();

  useEffect(() => {
    if (!currUser.isLoading && currUser.data?.role !== "ADMIN") {
      void router.push("/")
    }
  }, [router, currUser])

  return (
    <Layout>
      <div className="w-full flex justify-center overflow-y-hidden mt-4">
        {currUser.isLoading ? <Spinner size={24} /> : <div className="w-full md:pr-12 md:ml-[15%] md:w-[85%]"><UserTable /></div>}
      </div>
    </Layout>
  );
};

export default AdminPanel;
