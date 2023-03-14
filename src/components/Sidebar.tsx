import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { api } from "~/utils/api";

interface NavItemProps {
  path: string;
  currentPath: string;
  title: string;
}

interface NavItemFields {
  title: string;
  path: string;
  authenticated: boolean;
  adminOnly: boolean;
}

const navigationItems: NavItemFields[] = [
  {
    title: "Blog Feed",
    path: "/",
    authenticated: false,
    adminOnly: false,
  },
  {
    title: "Profile",
    path: "/profile",
    authenticated: true,
    adminOnly: false,
  },
  {
    title: "Admin Panel",
    path: "/admin",
    authenticated: true,
    adminOnly: true,
  },
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
  const [navItems, setNavItems] = useState<NavItemFields[]>([]);

  const { data: userData } = api.user.currentUser.useQuery();
  const { asPath } = useRouter();

  useEffect(() => {
    setNavItems(
      navigationItems.filter((e) => {
        if (!userData) return !e.authenticated;
        if (userData?.role !== "ADMIN") return !e.adminOnly;
        return true;
      })
    );
  }, [userData]);

  return (
    <div className="absolute z-0 ml-5 mt-5 w-40 flex-col">
      {navItems.map(({ title, path }) => (
        <Link href={path} key={path}>
          <NavItem path={path} currentPath={asPath} title={title} />
        </Link>
      ))}
    </div>
  );
};
