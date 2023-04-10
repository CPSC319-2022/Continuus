import type { FormEvent } from "react";
import React, { useState } from "react";
import { CurrUserProfilePicture } from "~/components/CurrUserProfilePicture";

export interface UpdateBlogPostFields {
  title: string;
  oldTitle?: string;
  content: string;
  oldContent?: string;
}

export const UpdateBlogPostForm: React.FC<{
  oldTitle: string;
  oldContent: string;
  onSubmit: (fieldValues: UpdateBlogPostFields) => void;
}> = ({ oldTitle, oldContent, onSubmit }) => {
  const [title, setTitle] = useState(oldTitle);
  const [content, setContent] = useState(oldContent);

  return (
    <form
      onSubmit={(event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        onSubmit({
          title,
          content,
        });
      }}
    >
      <div className="flex flex-row items-start py-4">
        <div className="ml-2 flex w-full flex-col">
          <input
            className="mb-4 w-full rounded-md p-2 text-2xl font-bold"
            placeholder="Write title here"
            type="text"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
          />
          <textarea
            className="h-96 w-full resize-none rounded-md p-2"
            placeholder="Write your blog post here"
            value={content}
            onChange={(event) => setContent(event.target.value)}
          />
        </div>
      </div>
      <input
        type="submit"
        value="Update"
        data-testid="submit-update-post"
        className="relative left-full h-10 w-32 -translate-x-full rounded-md border bg-highlight-green text-center text-gray-700 transition-all hover:cursor-pointer hover:bg-gray-700 hover:text-white"
      />
    </form>
  );
};
