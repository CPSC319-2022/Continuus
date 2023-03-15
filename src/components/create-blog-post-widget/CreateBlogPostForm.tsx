import Link from "next/link";
import { FormEvent, useState } from "react";

export interface CreateBlogPostFields {
    title: string;
    content: string;
}

export const CreateBlogPostForm: React.FC<{
    onSubmit: (fieldValues: CreateBlogPostFields) => void,
}> = ({
    onSubmit
}) => {
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
            >
                <div className="border-b border-b-gray-200 pl-4 pr-4 py-6 flex flex-row items-start">
                    <div>ProfileImage</div>
                    <div className="flex flex-col w-full">
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
                <input type="submit" value="Create"
                    className="relative left-full -translate-x-full px-6 py-2 rounded-md bg-emerald-400 my-2 -ml-4 hover:text-white transition-colors cursor-pointer"
                />
            </form>
        );
    }