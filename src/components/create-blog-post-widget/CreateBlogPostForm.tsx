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
      <div className="py-4 flex flex-row items-start">
        <div className="flex flex-col w-full ml-2">
          <input
            className="w-full rounded-md p-2 mb-4 text-2xl font-bold"
            placeholder="Write title here"
            type="text"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
          />
          <textarea
            className="w-full resize-none rounded-md h-96 p-2"
            placeholder="Write your blog post here"
            value={content}
            onChange={(event) => setContent(event.target.value)}
          />
        </div>
      </div>
      <input
        type="submit"
        value="Create"
        className={`relative left-full -translate-x-full h-10 rounded-md border w-32 text-center text-gray-700 ${
          title && content
            ? "bg-highlight-green hover:cursor-pointer hover:bg-gray-700 hover:text-white transition-all"
            : "disabled cursor-not-allowed bg-gray-200"
        }`}
      />
    </form>
  );
};
