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
  const { asPath } = useRouter();

  const navigationItems: NavItemFields[] = useMemo(
    () => [
      {
        title: "Blog Feed",
        path: "/",
        authenticated: false,
        adminOnly: false,
      },
      {
        title: "Profile",
        path: isUserLoading ? asPath : userPathToProfile(userData?.id),
        authenticated: true,
        adminOnly: false,
      },
      {
        title: "Admin Panel",
        path: "/admin",
        authenticated: true,
        adminOnly: true,
      },
    ],
    [asPath, isUserLoading, userData]
  );

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
    <div className="flex h-full w-full flex-row border-t border-solid border-t-gray-200 md:h-auto md:flex-col md:border-none md:p-6">
      {navItems.map(({ title, path }) => (
        <Link
          href={path}
          key={path}
          className={`
          ${path === asPath ? "border-highlight-green" : "border-transparent"} 
          flex 
          h-full 
          flex-1
          cursor-pointer
          items-center
          justify-center
          border-b-4
          border-solid
          hover:bg-slate-200
          md:my-2
          md:h-12
          md:flex-auto
          md:justify-start
          md:rounded-r-md 
          md:border-l-4 
          md:border-b-0 
          md:pl-2
          `}
        >
          {title}
        </Link>
      ))}
    </div>
  );
};
