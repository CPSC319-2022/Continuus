import { Tab, TabList, TabPanel, Tabs } from "react-tabs";
import {useState} from "react";
import {ProfileCard} from "./ProfileCard";
import {BlogPostViewer} from "./BlogPostViewer";

interface ProfileTabbedViewProps {
    userId: string
    createdAt: Date
    name: string
    imgUrl?: string | undefined | null
}

export const ProfileTabbedView: React.FC<ProfileTabbedViewProps> = ({
    userId,
    createdAt,
    name,
    imgUrl}) => {
    const [tabState, setTabState] = useState(0);

    const headers = [
    {
      label: "Blog Posts",
      value: "blog_posts",
      desc: <BlogPostViewer user={userId}/>,
    },
    {
      label: "Comments",
      value: "comments",
      desc: "Comment Placeholder",
    },
  ];
    
  return (
      <div className="flex flex-col w-full md:pr-12 md:ml-[15%] md:mr-[15%]">
          <ProfileCard 
              dateJoined={createdAt} 
              name={name}
              imgUrl={imgUrl}
              userId={userId}
          />
            <Tabs onSelect={(i: number) => { setTabState(i); }} className='mt-3'>
                <TabList className="flex flex-row justify-start">
                    <Tab className="w-32 text-center p-4 cursor-pointer border-b-4 border-solid border-white hover:border-b-emerald-400 hover:font-bold transition-all" selectedClassName="border-b-4 border-solid border-b-emerald-400 font-bold">{headers[0]?.label ?? ''}</Tab>
                    <Tab className="w-32 text-center p-4 cursor-pointer border-b-4 border-solid border-white hover:border-b-emerald-400 hover:font-bold transition-all" selectedClassName="border-b-4 border-solid border-b-emerald-400 font-bold">{headers[1]?.label ?? ''}</Tab>
                </TabList>
                <TabPanel>
                    {headers[0]?.desc ?? <></>}
                </TabPanel>
            </Tabs>
        </div>
  );
}
