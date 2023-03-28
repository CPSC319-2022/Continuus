import {
  type Dispatch,
  type SetStateAction,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { api } from "~/utils/api";
import { ProfilePicture } from "../ProfilePicture";
import ReactModal from "react-modal";
import { setSelectedPost } from "~/redux/slices/posts";
import { useAppDispatch } from "~/redux/hooks";

interface SearchModalProps {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  setIsOpen,
}) => {
  const [debouncedVal, setDebouncedVal] = useState("");
  const [searchVal, setSearchVal] = useState("");
  const dispatch = useAppDispatch();

  const posts = api.blogPost.search.useQuery({
    where: {
      OR: [
        { title: { contains: debouncedVal, mode: "insensitive" } },
        { content: { contains: debouncedVal, mode: "insensitive" } },
      ],
    },
  });

  useEffect(() => {
    const handler = setTimeout(() => {
      console.log(searchVal);
      setDebouncedVal(searchVal);
    }, 200);
    return () => {
      clearTimeout(handler);
    };
  }, [searchVal]);

  const highlighter = useCallback(
    (str: string) => {
      return debouncedVal
        ? str
            .replaceAll(
              new RegExp(
                debouncedVal.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"),
                "gi"
              ),
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
    },
    [debouncedVal]
  );

  return (
    <ReactModal
      isOpen={isOpen}
      overlayClassName="fixed inset-0 z-20 bg-black/60"
      className="absolute top-1/2 left-1/2 z-40 h-[40rem] w-11/12 -translate-x-1/2 -translate-y-1/2 overflow-y-auto rounded-md border-slate-500 bg-white md:w-1/2"
      shouldCloseOnEsc
      shouldCloseOnOverlayClick
      onRequestClose={() => setIsOpen(false)}
    >
      <div className="p-3">
        <input
          type="text"
          placeholder="Search for a blog post or user..."
          value={searchVal}
          onChange={(e) => setSearchVal(e.target.value)}
          className={`input-bordered sticky mb-1 w-full rounded-sm border-[1px] p-2`}
        />
        {debouncedVal ? (
          posts.data?.map(
            ({
              id,
              title,
              updatedAt,
              createdAt,
              content,
              user: { name, image },
            }) => (
              <div key={id} className="my-2">
                <label
                  htmlFor={`modal-${id}`}
                  className="flex hover:cursor-pointer"
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
                    <p className="font-bold">{highlighter(title)}</p>
                    <p className="text-xs">
                      {highlighter(
                        content.length > 200
                          ? `${content.slice(0, 199)}...`
                          : content
                      )}
                    </p>
                  </div>
                </label>
              </div>
            )
          )
        ) : (
          <div className="flex h-[35rem] flex-col justify-center align-middle">
            <p className="self-center">
              Start typing to search for a blog post!{" "}
            </p>
            <p className="self-center">
              Type @ at the beginning to search for a user.
            </p>
          </div>
        )}
      </div>
    </ReactModal>
  );
};
