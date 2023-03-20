import { Tab, TabList, TabPanel, Tabs } from "react-tabs";
import {useState} from "react";
import {api} from "~/utils/api";
import {BlogPostViewer} from "./BlogPostViewer";
import {useRouter} from "next/router";


export const ProfileTabbedView: React.FC = () => {
    const [_, setForceRerender] = useState(false);
    const forceRerender = () => setForceRerender(!_);
    const [tabState, setTabState] = useState(0);
    const { data: userData } = api.user.currentUser.useQuery();
    console.log("ID: " + (userData?.id as string));

    const data = [
    {
      label: "Blog Posts",
      value: "blog_posts",
      desc: <BlogPostViewer user={"clfdsmwqp006n0yi3hni8eyg0"}/>,
    },
    {
      label: "Comments",
      value: "comments",
      desc: "Comment Placeholder",
    },
  ];
    
  return (
    <>
      <div className="flex flex-col items-center w-1/2">
            <Tabs onSelect={(i: number) => { setTabState(i); forceRerender() }} className='mt-3'>
                <TabList className="flex flex-row items-center">
                    <Tab className="w-32 text-center p-4 cursor-pointer border-b-4 border-solid border-white hover:border-b-emerald-400 hover:font-bold transition-all" selectedClassName="border-b-4 border-solid border-b-emerald-400 font-bold">{data[0]?.label ?? ''}</Tab>
                    <Tab className="w-32 text-center p-4 cursor-pointer border-b-4 border-solid border-white hover:border-b-emerald-400 hover:font-bold transition-all" selectedClassName="border-b-4 border-solid border-b-emerald-400 font-bold">{data[1]?.label ?? ''}</Tab>
                </TabList>
                <TabPanel>
                    <div className="mt-4 flex min-h-screen w-full flex-col content-center items-center px-2 md:px-0">
                        <BlogPostViewer user={"clfdsmwqp006n0yi3hni8eyg0"}/>
                    </div>
                </TabPanel>
            </Tabs>
        </div>
     </>

        //     <Tabs value="html">
        //       <TabsHeader>
        //         {data.map(({ label, value }) => (
        //           <Tab 
        //             key={value} 
        //             value={value}
        //             color='border-highlight-green'
        //           >
        //             {label}
        //           </Tab>
        //         ))}
        //       </TabsHeader>
        //       <TabsBody
        //       >
        //         {data.map(({ value, desc }) => (
        //           <TabPanel key={value} value={value}>
        //             <div className="mt-4 flex min-h-screen w-full flex-col content-center items-center px-2 md:px-0">
        //               <div className="mb-6 flex w-full justify-end">
        //                 {desc}
        //               </div>
        //             </div>
        //           </TabPanel>
        //         ))}
        //       </TabsBody>
        //     </Tabs>
      ///     div>
  );
}
