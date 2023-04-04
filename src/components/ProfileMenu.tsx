import { Menu, MenuButton, MenuItem } from "@szhsin/react-menu";
import { signOut } from "next-auth/react";
import { userPathToProfile } from "~/utils/profile";
import { api } from "~/utils/api";
import { CurrUserProfilePicture } from "./CurrUserProfilePicture";
import Link from "next/link";

export const ProfileMenu: React.FC = () => {
  const menuItemClassName = "w-full px-4 py-2 cursor-pointer text-center hover:bg-gray-200";
  const currUser = api.user.currentUser.useQuery();
  const profile: string = userPathToProfile(currUser.data?.id || '');

  return (
    <Menu
      menuButton={
        <MenuButton>
          <CurrUserProfilePicture size={2} />
        </MenuButton>
      }
      align="end"
      aria-label="Profile"
      offsetY={2}
      menuClassName="bg-white w-48 rounded-md border border-solid border-gray-400 py-2"
    >
      <Link href={profile}>
        <MenuItem
          className={menuItemClassName}
          key="profile"
        >
          Profile
        </MenuItem>
      </Link>
      <MenuItem
        className={menuItemClassName}
        key="sign-out"
        onClick={() => void signOut({ callbackUrl: "/" })}
      >
        Sign-Out
      </MenuItem>

    </Menu>
  );
};

