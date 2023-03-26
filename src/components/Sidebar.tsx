import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useMemo, useState } from "react";
import { api } from "~/utils/api";
import {userPathToProfile} from "~/utils/profile";

interface NavItemFields {
  title: string;
  path: string;
  authenticated: boolean;
  adminOnly: boolean;
}



export const Sidebar: React.FC = () => {
  const [navItems, setNavItems] = useState<NavItemFields[]>([]);

  const { data: userData, isLoading: isUserLoading } = api.user.currentUser.useQuery();
  const { pathname } = useRouter();

  const navigationItems: NavItemFields[] = useMemo(() =>
      [{
        title: "Blog Feed",
        path: "/",
        authenticated: false,
        adminOnly: false,
      },
      {
        title: "Profile",
        path: (isUserLoading) ? pathname : userPathToProfile(userData?.id),
        authenticated: true,
        adminOnly: false,
      },
      {
        title: "Admin Panel",
        path: "/admin",
        authenticated: true,
        adminOnly: true,
      }], [pathname, isUserLoading, userData]);

  useEffect(() => {
    setNavItems(
      navigationItems.filter((e) => {
        if (!userData) return !e.authenticated;
        if (userData?.role !== "ADMIN") return !e.adminOnly;
        return true;
      })
    );
  }, [navigationItems, userData]);

  return (
    <div className="w-full flex flex-row h-full border-t border-t-gray-200 border-solid md:border-none md:h-auto md:flex-col md:p-6">
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
