import {
  type Dispatch,
  type SetStateAction,
  useCallback,
  useEffect,
  useState,
} from "react";
import { api } from "~/utils/api";
import { ProfilePicture } from "../ProfilePicture";
import ReactModal from "react-modal";
import { setSelectedPost } from "~/redux/slices/posts";
import { userPathToProfile } from "~/utils/profile";
import { useAppDispatch } from "~/redux/hooks";
import Link from "next/link";

interface SearchModalProps {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  setIsOpen,
}) => {
  const [debouncedPostsVal, setDebouncedPostsVal] = useState("");
  const [debouncedUsersVal, setDebouncedUsersVal] = useState("");
  const [searchVal, setSearchVal] = useState("");
  const dispatch = useAppDispatch();

  const posts = api.blogPost.search.useQuery({
    where: {
      OR: [
        { title: { contains: debouncedPostsVal, mode: "insensitive" } },
        { content: { contains: debouncedPostsVal, mode: "insensitive" } },
      ],
    },
  });

  const users = api.user.searchUsers.useQuery({
    where: {
      name: { contains: debouncedUsersVal, mode: "insensitive" },
    },
  });

  useEffect(() => {
    const handler = setTimeout(() => {
      if (searchVal.length > 0 && searchVal[0] === "@") {
        setDebouncedPostsVal("");
        setDebouncedUsersVal(searchVal.slice(1));
      } else if (searchVal.length === 0) {
        setDebouncedPostsVal("");
        setDebouncedUsersVal("");
      } else {
        setDebouncedUsersVal("");
        setDebouncedPostsVal(searchVal);
      }
    }, 300);
    return () => {
      clearTimeout(handler);
    };
  }, [searchVal]);

  const highlighter = useCallback((str: string, val: string) => {
    return val
      ? str
          .replaceAll(
            new RegExp(val.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "gi"),
            (substring) => `@@${substring}@@`
          )
          .split("@@")
          .map((str, i) =>
            i % 2 === 0 ? (
              str
            ) : (
              <mark key={i} className="bg-sky-200 dark:bg-amber-200">
                {str}
              </mark>
            )
          )
      : str;
  }, []);

  const hasNoResults = () => {
    if (posts.isLoading || users.isLoading) {
      return false;
    }
    if (debouncedPostsVal && posts.data?.length) {
      return false;
    }
    if (debouncedUsersVal && users.data?.length) {
      return false;
    }
    if (!debouncedPostsVal && !debouncedUsersVal) {
      return false;
    }
    return true;
  };

  return (
    <ReactModal
      closeTimeoutMS={100}
      isOpen={isOpen}
      overlayClassName="fixed inset-0 z-20 bg-black/75"
      className="absolute top-1/2 left-1/2 z-40 h-[40rem] w-11/12 -translate-x-1/2 -translate-y-1/2 overflow-y-auto rounded-md border-slate-500 bg-white outline-none md:w-1/2"
      shouldCloseOnEsc
      shouldCloseOnOverlayClick
      onRequestClose={() => setIsOpen(false)}
    >
      <div className="p-8" data-testid="search-modal">
        <input
          data-testid="search-input"
          type="text"
          placeholder="Search for a blog post or user..."
          value={searchVal}
          onChange={(e) => setSearchVal(e.target.value)}
          className={`input-bordered sticky mb-1 w-full rounded-sm border-[1px] p-2`}
        />
        {debouncedPostsVal &&
          posts.data &&
          posts.data.map(
            ({
              id,
              title,
              updatedAt,
              createdAt,
              content,
              user: { name, image },
            }) => (
              <div
                data-testid="search-posts"
                key={id}
                className="my-2 flex rounded-md border-b p-3 transition-all hover:cursor-pointer hover:bg-gray-200"
                onClick={() => {
                  dispatch(setSelectedPost(id));
                }}
              >
                <ProfilePicture
                  imgUrl={image}
                  size={2}
                  className="self-center"
                />
                <div className="ml-3">
                  <p className="font-bold">
                    {highlighter(title, debouncedPostsVal)}
                  </p>
                  <p className="text-xs">
                    {highlighter(
                      content.length > 200
                        ? `${content.slice(0, 199)}...`
                        : content,
                      debouncedPostsVal
                    )}
                  </p>
                </div>
              </div>
            )
          )}
        {debouncedUsersVal &&
          users.data &&
          users.data.map(({ id, name, image }) => (
            <Link
              data-testid="search-users"
              key={id}
              className="my-2 flex rounded-md border-b p-3 transition-all hover:cursor-pointer hover:bg-gray-200"
              href={userPathToProfile(id)}
              onClick={() => setIsOpen(false)}
            >
              <ProfilePicture imgUrl={image} size={2} className="self-center" />

              <div className="ml-3 flex">
                <p className="self-center">
                  {highlighter(name || "", debouncedUsersVal)}
                </p>
              </div>
            </Link>
          ))}
        {!debouncedPostsVal && !debouncedUsersVal && (
          <div className="flex h-[35rem] flex-col justify-center align-middle">
            <p className="self-center">
              Start typing to search for a blog post!{" "}
            </p>
            <p className="self-center">
              Type @ at the beginning to search for a user.
            </p>
          </div>
        )}
        {hasNoResults() && (
          <div className="flex h-[35rem] flex-col justify-center align-middle">
            <p className="self-center">No results found</p>
          </div>
        )}
      </div>
    </ReactModal>
  );
};
