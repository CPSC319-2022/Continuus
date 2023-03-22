import { type Dispatch, type SetStateAction, useEffect, useRef } from "react";
import { CheckIcon } from "~/icons/Check";
import { CloseIcon } from "~/icons/Close";
import { api } from "~/utils/api";
import { timeAgo } from "~/utils/time";
import { ProfilePicture } from "../ProfilePicture";

interface ContributorRequestMenuProps {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}
export const ContributorRequestMenu: React.FC<ContributorRequestMenuProps> = ({
  isOpen,
  setIsOpen,
}) => {
  const { data: users } = api.user.paginatedUsers.useQuery({
    pageIndex: 0,
    pageSize: 10,
  });

  const ref = useRef<HTMLDivElement>(null);

  // https://stackoverflow.com/a/42234988
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    const handleEscapePreses = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };
    // Bind the event listener
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscapePreses);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscapePreses);
    };
  }, [ref, setIsOpen]);

  return isOpen ? (
    <div
      ref={ref}
      className="absolute right-5 top-10 max-h-[30rem] min-w-[18rem] rounded-md bg-white p-3 shadow-lg"
    >
      <div className="scrollbar-hide max-h-[28rem] overflow-scroll overflow-x-hidden">
        <div className="sticky top-0 bg-white">
          <p className="text-lg">Contributor Requests</p>
          <hr />
        </div>
        {users && users.length ? (
          users.map(({ id, name, createdAt, image }) => (
            <div className="my-2 flex justify-between" key={id}>
              <div className="flex">
                <ProfilePicture
                  className="self-center"
                  imgUrl={image}
                  size={2}
                />
                <div className="mx-2">
                  <p>{name}</p>
                  <p className="text-xs">{timeAgo(createdAt)}</p>
                </div>
              </div>
              <div className="mr-1 flex self-center">
                <p className="mx-1 rounded-md bg-highlight-green p-1 text-xs hover:cursor-pointer">
                  <CheckIcon />
                </p>
                <p className="mx-1 rounded-md bg-slate-200 p-1 text-xs hover:cursor-pointer">
                  <CloseIcon />
                </p>
              </div>
            </div>
          ))
        ) : (
          <div className="flex w-full justify-center">
            <p className="my-5 text-sm italic text-slate-500">
              No contributor requests
            </p>
          </div>
        )}
      </div>
    </div>
  ) : (
    <></>
  );
};
