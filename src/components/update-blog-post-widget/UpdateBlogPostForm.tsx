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
      <div className="border-b border-b-gray-200 pl-4 pr-4 py-6 flex flex-row items-start">
        <CurrUserProfilePicture size={2.5} />
        <div className="flex flex-col w-full ml-2">
          <input
            className="w-full bg-gray-100 rounded-md p-2 mb-4"
            placeholder="Write title here"
            type="text"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
          />
          <textarea
            className="w-full resize-none bg-gray-100 rounded-md h-96 p-2"
            placeholder="Write your blog post here"
            value={content}
            onChange={(event) => setContent(event.target.value)}
          />
        </div>
      </div>
      <input type="submit" value="Update"
             className="relative left-full -translate-x-full px-6 py-2 rounded-md bg-emerald-400 my-2 -ml-4 hover:text-white transition-colors cursor-pointer"
      />
    </form>
  );
};