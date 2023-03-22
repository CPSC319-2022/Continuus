import { useCallback, useMemo, useState } from "react";
import type { BlogPost, User, Comment } from "@prisma/client";
import { api } from "~/utils/api";
import { ProfilePicture } from "./ProfilePicture";
import { CommentModal } from "./CommentModal";

export const SearchModal: React.FC = () => {
  const [searchVal, setSearchVal] = useState("");

  const posts = api.blogPost.search.useQuery({
    where: {
      OR: [
        { title: { contains: searchVal, mode: "insensitive" } },
        // { content: { contains: searchVal, mode: "insensitive" } },
      ],
    },
  });

  const highlighter = useCallback(
    (str: string) => {
      return searchVal
        ? str
            .replaceAll(
              new RegExp(
                searchVal.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"),
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
    [searchVal]
  );

  return (
    <>
      <input type="checkbox" id="search-modal" className="modal-toggle" />
      <label htmlFor="search-modal" className="modal cursor-pointer">
        <label
          className="card-body modal-box absolute m-[-10px] h-[75%] w-11/12 max-w-5xl rounded-md"
          htmlFor=""
        >
          <input
            type="text"
            placeholder="Search for a blog post..."
            value={searchVal}
            onChange={(e) => setSearchVal(e.target.value)}
            className={`input-bordered mb-1 w-full rounded-sm border-[1px] p-2`}
          />
          {posts.data?.map(
            ({
              id,
              userId,
              title,
              updatedAt,
              createdAt,
              content,
              comments,
              user: { name, image },
            }) => (
              <div key={id}>
                <div className="mb-2 flex">
                  <label
                    htmlFor={`modal-${id}`}
                    className="no-underline hover:cursor-pointer"
                  >
                    <div>
                      <ProfilePicture imgUrl={image} size={2} />
                    </div>
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
                <CommentModal
                  id={id}
                  title={title}
                  comments={comments as (Comment & { user: User })[]}
                  poster={name as string}
                  lastUpdated={updatedAt}
                  createdAt={createdAt}
                  post={content}
                  posterAvatarUrl={image as string}
                  content={content}
                  author={userId}
                />
              </div>
            )
          )}
        </label>
      </label>
    </>
  );
};
