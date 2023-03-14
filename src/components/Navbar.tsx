import { SearchIcon } from "~/icons/Search";
import { ProfileMenu } from "./ProfileMenu";

export const Navbar: React.FC = () => {
  return (
    <>
      <div className="flex justify-between p-2">
        <p className="self-center text-xl font-bold">Continuus</p>
        <div className="flex">
          <div className="mr-2 self-center">
            <SearchIcon />
          </div>
          <ProfileMenu />
        </div>
      </div>
      <hr />
    </>
  );
};
