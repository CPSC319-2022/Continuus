import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect } from "react";

interface NavItemProps {
  path: string;
  currentPath: string;
  title: string;
}

const navigationItems: { title: string; path: string }[] = [
  {
    title: "Blog Feed",
    path: "/",
  },
  {
    title: "Profile",
    path: "/profile",
  },
  // if we want to add more pages, just add them like this
  // {
  //   title: "Settings",
  //   path: "/settings",
  // },
  // {
  //   title: "Admin Panel",
  //   path: "/admin",
  // },
];

const NavItem: React.FC<NavItemProps> = ({ path, currentPath, title }) => {
  return (
    <div className="my-2 flex h-12 rounded-md hover:cursor-pointer hover:bg-slate-200">
      {path === currentPath && (
        <div className="absolute mr-1 h-10 w-[5px] self-center rounded-md bg-highlight-green" />
      )}
      <p className={`ml-3 self-center`}>{title}</p>
    </div>
  );
};

export const Sidebar: React.FC = () => {
  // returns the path of the current page
  const { asPath } = useRouter();

  // logs the path of the current page whenever it changes
  useEffect(() => {
    console.log(`I'm on the ${asPath} route`);
  }, [asPath]);

  return (
    <div className="absolute z-0 ml-5 mt-5 w-40 flex-col">
      {navigationItems.map(({ title, path }) => (
        <Link href={path} key={path}>
          <NavItem path={path} currentPath={asPath} title={title} />
        </Link>
      ))}
    </div>
  );
};
