import { SearchIcon } from "~/icons/Search";
import { ProfileMenu } from "./ProfileMenu";

export const Navbar: React.FC = () => {
  return (
    <div className="h-full border-b border-b-gray-200 flex justify-between p-6">
      <p className="self-center text-xl font-bold">Continuus</p>
      <div className="flex items-center">
        <SearchIcon className="mr-4"/>
        <ProfileMenu/>
      </div>
    </div>
  );
};
