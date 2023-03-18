import { MenuIcon } from "~/icons/Menu";
import { UpdateBlogPostWidget } from "~/components/update-blog-post-widget/UpdateBlogPostWidget";
import React from "react";

interface BlogPostActionsProps {
  id: string;
  author: string;
  title: string;
  content: string;
}

export const BlogPostActionsMenu: React.FC<BlogPostActionsProps> = ({id, author, title, content}) => {
  return (
    <div className="self-center">
      <div className="dropdown-left dropdown rounded-md shadow-slate-300">
        <button>
          <MenuIcon />
        </button>
        <ul
          tabIndex={0}
          className="dropdown-content menu rounded-box w-52 bg-base-100 p-2 shadow"
        >
          <li>
            <UpdateBlogPostWidget id={id} author={author} title={title} content={content}/>
          </li>
          <li>
            <a>Delete</a>
          </li>
        </ul>
      </div>
    </div>
  );
}