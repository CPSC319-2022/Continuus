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
  const { data: users } = api.contributorRequest.getAll.useQuery({});
  const utils = api.useContext();

  const deleteRequest = api.contributorRequest.delete.useMutation({
    onSuccess: async () => {
      await utils.contributorRequest.invalidate();
    },
  });

  const updateUser = api.user.updateOne.useMutation();

  const ref = useRef<HTMLDivElement>(null);

  // https://stackoverflow.com/a/42234988
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    const handleEscapePress = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };
    // Bind the event listener
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscapePress);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscapePress);
    };
  }, [ref, setIsOpen]);

  const handleAcceptRequest = async (userId: string, requestId: string) => {
    await updateUser.mutateAsync({
      where: { id: userId },
      data: { role: "CONTRIBUTOR" },
    });
    await deleteRequest.mutateAsync({
      where: { id: requestId },
    });
  };

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
          users.map(({ id, createdAt, user: { id: userId, name, image }}) => (
            <div className="my-2 flex justify-between" key={id}>
              <div className="flex">
                <ProfilePicture
                  className="self-center"
                  size={2}
                  imgUrl={image}
                  userId={userId}
                />
                <div className="mx-2">
                  <p>{name}</p>
                  <p className="text-xs">{timeAgo(createdAt)}</p>
                </div>
              </div>
              <div className="mr-1 flex self-center">
                <div
                  className="mx-1 rounded-md bg-highlight-green p-1 hover:cursor-pointer hover:shadow-md"
                  onClick={() => void handleAcceptRequest(userId, id)}
                >
                  <CheckIcon />
                </div>
                <div
                  className="mx-1 rounded-md bg-slate-200 p-1 hover:cursor-pointer hover:shadow-md"
                  onClick={() => deleteRequest.mutate({ where: { id } })}
                >
                  <CloseIcon />
                </div>
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
