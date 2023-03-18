import React from "react";

export const DeleteBlogPostButton: React.FC<{ onClick?: () => void }> = ({ onClick }) => {
  return (
    <>
      <div onClick={onClick}>
        <span>
          Delete
        </span>
      </div>
    </>
  );
};