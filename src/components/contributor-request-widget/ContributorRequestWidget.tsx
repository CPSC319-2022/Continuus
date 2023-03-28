import { useState } from "react";
import { NotificationIcon } from "~/icons/Notification";
import { api } from "~/utils/api";
import { ContributorRequestMenu } from "./ContributorRequestMenu";

export const ContributorRequestWidget: React.FC<
  React.ComponentProps<"div">
> = ({ ...props }) => {
  const [open, setOpen] = useState(false);
  const { data: user } = api.user.currentUser.useQuery();

  return user?.role === "ADMIN" ? (
    <div {...props}>
      <NotificationIcon
        className="hover:cursor-pointer"
        onClick={() => setOpen(!open)}
      />
      <ContributorRequestMenu isOpen={open} setIsOpen={setOpen} />
    </div>
  ) : (
    <></>
  );
};
