import { FormEvent, useState } from "react";
import { CurrUserProfilePicture } from "../CurrUserProfilePicture";

export interface CreateBlogPostFields {
  title: string;
  content: string;
}

export const CreateBlogPostForm: React.FC<{
  onSubmit: (fieldValues: CreateBlogPostFields) => void;
}> = ({ onSubmit }) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  return (
    <form
      onSubmit={(event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        onSubmit({
          title,
          content,
        });
      }}
      aria-label="Create Blog Post Form"
    >
      <div className="flex flex-row items-start border-b border-b-gray-200 py-6 pl-4 pr-4">
        <CurrUserProfilePicture size={2.5} />
        <div className="ml-2 flex w-full flex-col">
          <input
            className="mb-4 w-full rounded-md bg-gray-100 p-2"
            placeholder="Write title here"
            type="text"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
          />
          <textarea
            className="h-96 w-full resize-none rounded-md bg-gray-100 p-2"
            placeholder="Write your blog post here"
            value={content}
            onChange={(event) => setContent(event.target.value)}
          />
        </div>
      </div>
      <input
        type="submit"
        value="Create"
        className={`relative left-full -translate-x-full rounded-md px-6 py-2 ${
          title && content
            ? "cursor-pointer bg-emerald-400 hover:text-white"
            : "disabled cursor-not-allowed bg-gray-400"
        }  my-2 -ml-4 transition-colors`}
      />
    </form>
  );
};
