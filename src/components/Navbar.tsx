import { ProfileMenu } from "./ProfileMenu";

export const Navbar: React.FC = () => {

  return (
    <div className="flex justify-between p-2">
      <div>Continuus</div>
      <ProfileMenu />
    </div>
  );
};

