import { MenuIcon } from "~/icons/Menu";
import { UpdateBlogPostWidget } from "~/components/update-blog-post-widget/UpdateBlogPostWidget";
import React from "react";
import { DeleteBlogPostWidget } from "~/components/delete-blog-post-widget/DeleteBlogPostWidget";

interface BlogPostActionsProps {
  id: string;
  title: string;
  content: string;
  isAuthor: boolean;
}

export const BlogPostActionsMenu: React.FC<BlogPostActionsProps> = ({id, title, content, isAuthor}) => {
  return (
    <div className="self-center mt-[-12px]">
      <div className="dropdown-left dropdown rounded-md">
        <button className="hover:scale-125 transition-all">
          <MenuIcon/>
        </button>
        <ul
          tabIndex={0}
          className="dropdown-content menu rounded-md w-52 bg-white shadow border mt-8 mr-[-16px]"
        >
          {
            isAuthor &&
              <li>
                  <UpdateBlogPostWidget id={id} title={title} content={content} />
              </li>
          }

          <li>
            <DeleteBlogPostWidget id={id} />
          </li>
        </ul>
      </div>
    </div>
  );
}