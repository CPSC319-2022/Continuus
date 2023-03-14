import { useRouter } from "next/router";
import { Dispatch, SetStateAction, useEffect, useState } from "react";

interface NavItemProps {
  path: string;
  currentPath: string;
  title: string;
  callback: Dispatch<SetStateAction<string>>;
}

const NavItem: React.FC<NavItemProps> = ({
  path,
  currentPath,
  title,
  callback,
}) => {
  return (
    <div
      className="my-2 flex h-12 rounded-md hover:cursor-pointer hover:bg-slate-200"
      onClick={() => callback(path)}
    >
      {path === currentPath && (
        <div className="absolute mr-1 h-10 w-[5px] self-center rounded-md bg-highlight-green" />
      )}
      <p className={`ml-3 self-center`}>{title}</p>
    </div>
  );
};

const navigationItems: { title: string; path: string }[] = [
  {
    title: "Blog Feed",
    path: "/",
  },
  {
    title: "Profile",
    path: "/profile",
  },
  {
    title: "Settings",
    path: "/settings",
  },
  {
    title: "Admin Panel",
    path: "/admin",
  },
];

export const Sidebar: React.FC = () => {
  const [currentPath, setCurrentPath] = useState<string>("/");

  // returns the path of the current page
  const { asPath } = useRouter();

  // logs the path of the current page whenever it changes
  useEffect(() => {
    console.log(`I'm on the ${asPath} route`);
  }, [asPath]);

  return (
    <div className="absolute z-0 ml-5 mt-5 w-40 flex-col">
      {navigationItems.map(({ title, path }) => (
        <div key={path}>
          <NavItem
            path={path}
            currentPath={currentPath}
            title={title}
            callback={setCurrentPath}
          />
        </div>
      ))}
    </div>
  );
};
