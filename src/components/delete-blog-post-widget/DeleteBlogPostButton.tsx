import React from "react";

export const DeleteBlogPostButton: React.FC<{ onClick?: () => void }> = ({
  onClick,
}) => {
  return (
    <>
      <div data-testid="delete-blog-post-button" onClick={onClick}>
        <span>Delete</span>
      </div>
    </>
  );
};
