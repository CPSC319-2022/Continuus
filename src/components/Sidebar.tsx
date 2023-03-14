import { useState } from "react";

type Page = "blog" | "profile";

export const Sidebar: React.FC = () => {
  const [page, setPage] = useState<Page>("blog");

  return (
    <div className="absolute z-0 ml-5 mt-5 w-64 flex-col">
      <div
        className="my-7 flex hover:cursor-pointer"
        onClick={() => setPage("blog")}
      >
        {page === "blog" && (
          <div className="absolute mr-1 h-10 w-[5px] self-center rounded-md bg-highlight-green" />
        )}
        <p className={`ml-3 self-center`}>Blog Feed</p>
      </div>
      <div
        className="my-7 flex hover:cursor-pointer"
        onClick={() => setPage("profile")}
      >
        {page === "profile" && (
          <div className="absolute mr-1 h-10 w-[5px] self-center rounded-md bg-highlight-green" />
        )}
        <p className={`ml-3 self-center`}>Profile</p>
      </div>
    </div>
  );
};
