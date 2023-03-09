import { Menu, MenuButton, MenuItem } from "@szhsin/react-menu";
import { signIn, useSession } from "next-auth/react";
import { ReactNode } from "react";

export const ProfileMenu: React.FC = () => {
    const { status } = useSession();

    const _renderProfileImage = () => (
        <div
            className="rounded-full aspect-square w-12 border border-solid border-gray-400"
            style={{ backgroundImage: "url(https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQb1KzK9eXLao5CnsRObDT6gDyGG-u2HHyYoVBgvBnW&s)" }}
        />
    );

    const _renderMenuButton: React.FC<{ label: ReactNode, onClick?: () => void }> = ({ label, onClick }) => (
        <MenuItem
            onClick={onClick}
            className="w-full px-4 py-2 cursor-pointer text-center hover:bg-gray-200"
        >
            {label}
        </MenuItem>
    );

    return (
        <Menu
            menuButton={
                <MenuButton>{_renderProfileImage()}</MenuButton>
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
                                _renderMenuButton({ label: "Profile" }),
                                _renderMenuButton({ label: "Sign Out" })
                            ];
                        case "loading":
                            return _renderMenuButton({ label: "Loading..." });
                        case "unauthenticated":
                            return _renderMenuButton({
                                label: <div className="flex justify-center items-center">
                                    <img src="/btn_google.svg" className="mr-2" /> 
                                    <span>Sign-In/Up</span>
                                </div>,
                                onClick: () => void signIn("google")
                            });
                    }
                })()
            }
        </Menu>
    );
};

