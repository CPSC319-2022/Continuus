import { ProfileMenu } from "./ProfileMenu";

export const Navbar: React.FC = () => {

  return (
    <div className="flex justify-between p-2">
      <p className="self-center text-xl font-bold">Continuus</p>
      <ProfileMenu />
    </div>
  );
};

