import React from "react";

export const UpdateBlogPostButton: React.FC<{ onClick?: () => void }> = ({
  onClick,
}) => {
  return (
    <>
      <div data-testid="update-blog-post-button" onClick={onClick}>
        <span>Edit</span>
      </div>
    </>
  );
};
