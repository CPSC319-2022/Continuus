import { Tab, TabList, TabPanel, Tabs } from "react-tabs";
import {useState} from "react";
import {api} from "~/utils/api";
import {BlogPostViewer} from "./BlogPostViewer";
import {useRouter} from "next/router";
import {ProfileCard} from "./ProfileCard";
import { Spinner } from "./Spinner";

export const ProfileTabbedView: React.FC = () => {
    const [_, setForceRerender] = useState(false);
    const forceRerender = () => setForceRerender(!_);
    const [tabState, setTabState] = useState(0);

    const router = useRouter();
    const { id } = router.query;
    if(!router.isReady) {
        return (<Spinner size={24} />);
    }
    const authorId: string = {id}.id as string;
    const { data: userData } = api.user.selectedUser.useQuery({
        text: {id}.id as string,
    });
    const nBlogPosts: number = api.blogPost.aggregate({
        userId: {id}.id as string
    });

    const data = [
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
              name={userData?.name as string}
              dateJoined={userData?.createdAt as Date} 
              imgUrl={userData?.image as string}
              numBlogPosts={userData?.blogPosts}
          />
            <Tabs onSelect={(i: number) => { setTabState(i); forceRerender() }} className='mt-3'>
                <TabList className="flex flex-row justify-start">
                    <Tab className="w-32 text-center p-4 cursor-pointer border-b-4 border-solid border-white hover:border-b-emerald-400 hover:font-bold transition-all" selectedClassName="border-b-4 border-solid border-b-emerald-400 font-bold">{data[0]?.label ?? ''}</Tab>
                    <Tab className="w-32 text-center p-4 cursor-pointer border-b-4 border-solid border-white hover:border-b-emerald-400 hover:font-bold transition-all" selectedClassName="border-b-4 border-solid border-b-emerald-400 font-bold">{data[1]?.label ?? ''}</Tab>
                </TabList>
                <TabPanel>
                    {data[0]?.desc ?? <></>}
                </TabPanel>
            </Tabs>
        </div>
        :
            <Spinner size={24} />}
     </>
  );
}
