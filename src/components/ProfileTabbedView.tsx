import { Tab, TabList, TabPanel, Tabs } from "react-tabs";
import { useState } from "react";
import { ProfileCard } from "./ProfileCard";
import { BlogPostViewer } from "./BlogPostViewer";
import { ProfileCommentViewer } from "./ProfileCommentViewer";

interface ProfileTabbedViewProps {
  userId: string;
  createdAt: Date;
  name: string;
  imgUrl?: string | undefined | null;
}

export const ProfileTabbedView: React.FC<ProfileTabbedViewProps> = ({
  userId,
  createdAt,
  name,
  imgUrl,
}) => {
  const [tabState, setTabState] = useState(0);

  const headers = [
    {
      label: "Blog Posts",
      value: "blog_posts",
      desc: <BlogPostViewer user={userId} />,
    },
    {
      label: "Comments",
      value: "comments",
      desc: <ProfileCommentViewer userId={userId}/>
    },
  ];

  return (
    <div className="mt-4 flex min-h-screen w-full flex-col content-center items-center px-2 md:px-0">
      <ProfileCard
        dateJoined={createdAt}
        name={name}
        imgUrl={imgUrl}
        userId={userId}
      />
      <Tabs
        onSelect={(i: number) => {
          setTabState(i);
        }}
      >
        <TabList className="mb-3 flex flex-row justify-start">
          <Tab
            className="w-32 cursor-pointer border-b-4 border-solid border-gray-200 p-4 text-center transition-all hover:border-b-highlight-green hover:font-bold"
            selectedClassName="border-b-4 border-solid border-b-highlight-green font-bold"
          >
            {headers[0]?.label ?? ""}
          </Tab>
          <Tab
            className="w-32 cursor-pointer border-b-4 border-solid border-gray-200 p-4 text-center transition-all hover:border-b-highlight-green hover:font-bold"
            selectedClassName="border-b-4 border-solid border-b-highlight-green font-bold"
          >
            {headers[1]?.label ?? ""}
          </Tab>
        </TabList>
        <TabPanel>{headers[0]?.desc ?? <></>}</TabPanel>
        <TabPanel>{headers[1]?.desc ?? <></>}</TabPanel>
      </Tabs>
    </div>
  );
};
