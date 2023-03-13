import { Menu, MenuButton, MenuItem } from "@szhsin/react-menu";
import { signIn, useSession, signOut } from "next-auth/react";
import Image from 'next/image';
import btn_google from '../../public/btn_google.png'

export const ProfileMenu: React.FC = () => {
    const { status } = useSession();
    const menuItemClassName = "w-full px-4 py-2 cursor-pointer text-center hover:bg-gray-200";

    return (
        <Menu
            menuButton={
                <MenuButton>
                    <div
                        className="rounded-full aspect-square w-12 border border-solid border-gray-400"
                        style={{ backgroundImage: "url(https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQb1KzK9eXLao5CnsRObDT6gDyGG-u2HHyYoVBgvBnW&s)" }}
                    />
                </MenuButton>
            }
            align="end"
            aria-label="Profile"
            offsetY={2}
            menuClassName="bg-white w-48 rounded-md border border-solid border-gray-400 py-2"
        >
            {
                (() => {
                    switch (status) {
                        case "authenticated":
                            return [
                                <MenuItem className={menuItemClassName} key="profile">
                                    Profile
                                </MenuItem>,
                                <MenuItem
                                    className={menuItemClassName} key="sign-out"
                                    onClick={() => void signOut({ callbackUrl: '/' })}
                                >
                                    Sign-Out
                                </MenuItem>
                            ];
                        case "loading":
                            return <MenuItem className={menuItemClassName}>Loading...</MenuItem>;
                        case "unauthenticated":
                            return (
                                <MenuItem
                                    className={menuItemClassName}
                                    onClick={() => void signIn("google")}
                                >
                                    <div className="flex justify-center items-center relative">
                                        <Image src={btn_google} alt="Sign-In/Up With Google" className="mr-2" />
                                        <span>Sign-In/Up</span>
                                    </div>
                                </MenuItem>
                            );
                    }
                })()
            }
        </Menu>
    );
};

