import { Tab, TabList, TabPanel, Tabs } from "react-tabs";
import {useState} from "react";
import {api} from "~/utils/api";
import {useRouter} from "next/router";
import {ProfileCard} from "./ProfileCard";
import { Spinner } from "./Spinner";
import {BlogPostViewer} from "./BlogPostViewer";
import {Layout} from "./Layout";

export const ProfileTabbedView: React.FC = () => {
    const [_, setForceRerender] = useState(false);
    const forceRerender = () => setForceRerender(!_);
    const [tabState, setTabState] = useState(0);

    const router = useRouter();
    const { id } = router.query;
    if(!router.isReady) {
        return (<Spinner size={2} />);
    }
    const { data: userData } = api.user.selectedUser.useQuery({
        text: {id}.id as string,
    });
    if (!userData) {
        return(
            <Layout>
                <Spinner size={2}/>
            </Layout>
        );
    }

    const headers = [
    {
      label: "Blog Posts",
      value: "blog_posts",
      desc: <BlogPostViewer user={id as string}/>,
    },
    {
      label: "Comments",
      value: "comments",
      desc: "Comment Placeholder",
    },
  ];
    
  return (
    <>
      {router.isReady ?
      <div className="flex flex-col w-full md:pr-12 md:ml-[15%] md:mr-[15%]">
          <ProfileCard 
              dateJoined={userData?.createdAt} 
              user={userData}
          />
            <Tabs onSelect={(i: number) => { setTabState(i); forceRerender() }} className='mt-3'>
                <TabList className="flex flex-row justify-start">
                    <Tab className="w-32 text-center p-4 cursor-pointer border-b-4 border-solid border-white hover:border-b-emerald-400 hover:font-bold transition-all" selectedClassName="border-b-4 border-solid border-b-emerald-400 font-bold">{headers[0]?.label ?? ''}</Tab>
                    <Tab className="w-32 text-center p-4 cursor-pointer border-b-4 border-solid border-white hover:border-b-emerald-400 hover:font-bold transition-all" selectedClassName="border-b-4 border-solid border-b-emerald-400 font-bold">{headers[1]?.label ?? ''}</Tab>
                </TabList>
                <TabPanel>
                    {headers[0]?.desc ?? <></>}
                </TabPanel>
            </Tabs>
        </div>
        :
            <Spinner size={24} />}
     </>
  );
}
