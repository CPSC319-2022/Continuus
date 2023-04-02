import { SearchIcon } from "~/icons/Search";
import { ContributorRequestWidget } from "./contributor-request-widget/ContributorRequestWidget";
import { RequestAccessButton } from "./contributor-request-widget/RequestAccessButton";
import { ProfileMenu } from "./ProfileMenu";
import Link from "next/link";

export const Navbar: React.FC = () => {
  return (
    <div className="flex h-full justify-between border-b border-b-gray-200 p-2">
      <Link href="/" className="self-center text-xl font-bold">
        Continuus
      </Link>
      <div className="flex items-center gap-2">
        <RequestAccessButton />
        <ContributorRequestWidget />
        <SearchIcon />
        <ProfileMenu />
      </div>
    </div>
  );
};
