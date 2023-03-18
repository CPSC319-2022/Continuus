import { MenuIcon } from "~/icons/Menu";
import { UpdateBlogPostWidget } from "~/components/update-blog-post-widget/UpdateBlogPostWidget";
import React from "react";
import { DeleteBlogPostWidget } from "~/components/delete-blog-post-widget/DeleteBlogPostWidget";

interface BlogPostActionsProps {
  id: string;
  title: string;
  content: string;
  isAdmin: boolean;
}

export const BlogPostActionsMenu: React.FC<BlogPostActionsProps> = ({id, title, content, isAdmin}) => {
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
            {
              !isAdmin && <UpdateBlogPostWidget id={id} title={title} content={content}/>
            }
          </li>
          <li>
            <DeleteBlogPostWidget id={id} />
          </li>
        </ul>
      </div>
    </div>
  );
}