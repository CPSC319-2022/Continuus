import { SearchIcon } from "~/icons/Search";
import { ContributorRequestWidget } from "./contributor-request-widget/ContributorRequestWidget";
import { ProfileMenu } from "./ProfileMenu";

export const Navbar: React.FC = () => {
  return (
    <div className="flex h-full justify-between border-b border-b-gray-200 p-2">
      <p className="self-center text-xl font-bold">Continuus</p>
      <div className="flex items-center">
        <ContributorRequestWidget className="mr-2" />
        <SearchIcon className="mr-2" />
        <ProfileMenu />
      </div>
    </div>
  );
};
