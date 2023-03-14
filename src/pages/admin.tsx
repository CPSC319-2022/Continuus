import { type NextPage } from "next";
import { Layout } from "~/components/Layout";
import { api } from "../utils/api";

const AdminPanel: NextPage = () => {
  // use this
  const { data } = api.user.allUsers.useQuery({});

  // add mutation if editing user profile

  return (
    <Layout>
      <div>
        <p className="text-3xl">Admin Panel</p>
        <pre className="my-4">{JSON.stringify(data, null, 2)}</pre>
      </div>
    </Layout>
  );
};

export default AdminPanel;
