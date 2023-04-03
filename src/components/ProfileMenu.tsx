import { Menu, MenuButton, MenuItem } from "@szhsin/react-menu";
import { signOut } from "next-auth/react";
import { userPathToProfile } from "~/utils/profile";
import { api } from "~/utils/api";
import { useRouter } from "next/router";
import { CurrUserProfilePicture } from "./CurrUserProfilePicture";

export const ProfileMenu: React.FC = () => {
  const menuItemClassName = "w-full px-4 py-3 cursor-pointer text-center hover:bg-gray-200 transition-all";
  const router = useRouter();
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
      <MenuItem
        className={menuItemClassName}
        key="profile"
        onClick={() => void router.push(profile)}>
        Profile
      </MenuItem>
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

