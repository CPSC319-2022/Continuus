import { type NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { Layout } from "~/components/Layout";
import { Spinner } from "~/components/Spinner";
import { api } from "../utils/api";

const AdminPanel: NextPage = () => {
  const currUser = api.user.currentUser.useQuery();
  const allUsers = api.user.allUsers.useQuery({
    orderBy: {
      createdAt: "desc"
    }
  }, {
    enabled: currUser.data?.role === "ADMIN"
  });
  const router = useRouter();

  useEffect(() => {
    if (!currUser.isLoading && currUser.data?.role !== "ADMIN") {
      router.push("/")
    }
  }, [currUser])

  if (currUser.isLoading) {
    return (
      <Layout>
        <div className="w-full flex justify-center">
          <Spinner size={24} />
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
    </Layout>
  );
};

export default AdminPanel;
