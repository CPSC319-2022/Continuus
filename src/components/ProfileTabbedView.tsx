import {
  Tabs,
  TabsHeader,
  TabsBody,
  Tab,
  TabPanel,
} from "@material-tailwind/react";
import {api} from "~/utils/api";
import {BlogPostViewer} from "./BlogPostViewer";


export const ProfileTabbedView: React.FC = () => {
    const { data: userData } = api.user.currentUser.useQuery();

    console.log("ID: " + (userData?.id as string));
    const data = [
    {
      label: "Blog Posts",
      value: "blog_posts",
      desc: <BlogPostViewer userOption={true}/>,
    },
    {
      label: "Comments",
      value: "comments",
      desc: "Comment Placeholder",
    },
  ];
    
  return (
    <div className="w-full md:w-1/2 ">
        <Tabs value="html">
          <TabsHeader>
            {data.map(({ label, value }) => (
              <Tab 
                key={value} 
                value={value}
                color='border-highlight-green'
              >
                {label}
              </Tab>
            ))}
          </TabsHeader>
          <TabsBody
          >
            {data.map(({ value, desc }) => (
              <TabPanel key={value} value={value}>
                <div className="mt-4 flex min-h-screen w-full flex-col content-center items-center px-2 md:px-0">
                  <div className="mb-6 flex w-full justify-end">
                    {desc}
                  </div>
                </div>
              </TabPanel>
            ))}
          </TabsBody>
        </Tabs>
      </div>
  );
}
