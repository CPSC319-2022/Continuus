import { SearchIcon } from "~/icons/Search";
import { ContributorRequestWidget } from "./contributor-request-widget/ContributorRequestWidget";
import { RequestAccessButton } from "./contributor-request-widget/RequestAccessButton";
import { ProfileMenu } from "./ProfileMenu";
import Link from "next/link";

export const Navbar: React.FC = () => {
  return (
    <div className="flex h-full justify-between border-b border-b-gray-200 p-6">
      <Link href="/" className="self-center text-xl font-bold">
        Continuus
      </Link>
      <div className="flex items-center gap-6">
        <RequestAccessButton/>
        <div className="hover:fill-highlight-green transition-all">
          <ContributorRequestWidget/>
        </div>
        <div className="hover:fill-highlight-green transition-all">
          <SearchIcon/>
        </div>
        <ProfileMenu />
      </div>
    </div>
  );
};
