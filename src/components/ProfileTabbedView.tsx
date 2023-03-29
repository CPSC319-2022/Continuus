import { Tab, TabList, TabPanel, Tabs } from "react-tabs";
import { useState } from "react";
import { ProfileCard } from "./ProfileCard";
import { BlogPostViewer } from "./BlogPostViewer";

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
      desc: "Comment Placeholder",
    },
  ];

  return (
    <div className="flex w-full flex-col justify-center align-middle">
      <div className="w-full self-center md:w-8/12">
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
          className="mt-3"
        >
          <TabList className="flex flex-row justify-start">
            <Tab
              className="w-32 cursor-pointer border-b-4 border-solid border-white p-4 text-center transition-all hover:border-b-emerald-400 hover:font-bold"
              selectedClassName="border-b-4 border-solid border-b-emerald-400 font-bold"
            >
              {headers[0]?.label ?? ""}
            </Tab>
            <Tab
              className="w-32 cursor-pointer border-b-4 border-solid border-white p-4 text-center transition-all hover:border-b-emerald-400 hover:font-bold"
              selectedClassName="border-b-4 border-solid border-b-emerald-400 font-bold"
            >
              {headers[1]?.label ?? ""}
            </Tab>
          </TabList>
          <TabPanel>{headers[0]?.desc ?? <></>}</TabPanel>
        </Tabs>
      </div>
    </div>
  );
};
