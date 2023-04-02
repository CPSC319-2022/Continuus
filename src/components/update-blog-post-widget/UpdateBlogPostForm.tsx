import type { FormEvent} from "react";
import React, { useState } from "react";
import { CurrUserProfilePicture } from "~/components/CurrUserProfilePicture";

export interface UpdateBlogPostFields {
  title: string;
  oldTitle?: string;
  content: string;
  oldContent?: string;
}

export const UpdateBlogPostForm: React.FC<{ oldTitle: string, oldContent: string, onSubmit: (fieldValues: UpdateBlogPostFields) => void, }> = ({
                                                                                                                                                 oldTitle,
                                                                                                                                                 oldContent,
                                                                                                                                                 onSubmit
                                                                                                                                               }) => {
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
      <input type="submit" value="Update"
             className="relative left-full -translate-x-full h-10 rounded-md border bg-highlight-green w-32 text-center text-gray-700 hover:cursor-pointer hover:bg-gray-700 hover:text-white transition-all"
      />
    </form>
  );
};