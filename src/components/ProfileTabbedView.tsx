import { Tab, TabList, TabPanel, Tabs } from "react-tabs";
import {useState} from "react";
import {api} from "~/utils/api";
import {useRouter} from "next/router";
import {ProfileCard} from "./ProfileCard";
import { Spinner } from "./Spinner";
import {BlogPostViewer} from "./BlogPostViewer";

export const ProfileTabbedView: React.FC = () => {
    const [tabState, setTabState] = useState(0);

    const router = useRouter();
    const id = router.query.id as string;
    const { data: userData, isLoading: isUserDataLoading } = api.user.selectedUser.useQuery({
        text: id,
    });

    const headers = [
    {
      label: "Blog Posts",
      value: "blog_posts",
      desc: <BlogPostViewer user={id}/>,
    },
    {
      label: "Comments",
      value: "comments",
      desc: "Comment Placeholder",
    },
  ];
    
  return (
    <>
      {(router.isReady && !isUserDataLoading) ?
          <div className="flex flex-col w-full md:pr-12 md:ml-[15%] md:mr-[15%]">
              <ProfileCard 
                  dateJoined={userData?.createdAt} 
                  name={userData?.name ?? ''}
                  imgUrl={userData?.image}
                  userId={userData?.id ?? ''}
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
        :
            <div className="mt-4 flex content-center justify-center w-full">
                <Spinner/>
            </div>
        }
     </>
  );
}
