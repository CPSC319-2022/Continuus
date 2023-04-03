import { type NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useSession } from "next-auth/react";
import { Tab, TabList, TabPanel, Tabs } from "react-tabs";
import { SignInForm } from "~/components/SignInForm";
import { SignUpForm } from "~/components/SignUpForm";


const tabClassName = "flex-1 w-32 cursor-pointer border-b-4 border-solid border-white p-4 text-center transition-all hover:border-b-emerald-400 hover:font-bold";
const selectedTabClassName = "border-b-4 border-solid border-b-emerald-400 font-bold";

const SignInUp: NextPage = () => {
  const { status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "authenticated") {
      void router.push("/")
    }
  }, [router, status])

  return (
    <main className="h-screen overflow-hidden flex items-center justify-center">
      <div className="max-w-full min-w-0 border border-solid border-gray-200 rounded-md">
        <Tabs>
          <TabList className="flex flex-row justify-start">
            <Tab className={tabClassName} selectedClassName={selectedTabClassName}>Sign In</Tab>
            <Tab className={tabClassName} selectedClassName={selectedTabClassName}>Sign Up</Tab>
          </TabList>

          <TabPanel>
            <SignInForm />
          </TabPanel>

          <TabPanel>
            <SignUpForm />
          </TabPanel>
        </Tabs>
      </div>
    </main>
  );
};

export default SignInUp;
