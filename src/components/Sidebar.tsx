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

export const Sidebar: React.FC = () => {
  const [navItems, setNavItems] = useState<NavItemFields[]>([]);

  const { data: userData } = api.user.currentUser.useQuery();
  const { pathname } = useRouter();

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
    <div className="w-full flex flex-row h-full md:h-auto md:flex-col md:p-6">
      {navItems.map(({ title, path }) => (
        <Link
          href={path}
          key={path}
          className={`
          ${path === pathname ? 'border-highlight-green' : 'border-transparent'} 
          border-b-4 
          border-solid 
          flex
          flex-1
          h-full
          items-center
          justify-center
          cursor-pointer
          hover:bg-slate-200
          md:pl-2
          md:justify-start
          md:h-12
          md:flex-auto
          md:rounded-r-md 
          md:my-2 
          md:border-l-4 
          md:border-b-0
          `}>
          {title}
        </Link>
      ))}
    </div>
  );
};
