import { SearchIcon } from "~/icons/Search";
import { ContributorRequestWidget } from "./contributor-request-widget/ContributorRequestWidget";
import { RequestAccessButton } from "./contributor-request-widget/RequestAccessButton";
import { ProfileMenu } from "./ProfileMenu";

export const Navbar: React.FC = () => {
  return (
    <div className="flex h-full justify-between border-b border-b-gray-200 p-2">
      <p className="self-center text-xl font-bold">Continuus</p>
      <div className="flex items-center gap-2">
        <RequestAccessButton />
        <ContributorRequestWidget />
        <label htmlFor="search-modal" className="btn-link hover:cursor-pointer">
          <SearchIcon className="mr-3" />
        </label>
        <ProfileMenu />
      </div>
    </div>
  );
};
