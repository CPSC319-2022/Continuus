import React from "react";

export const UpdateBlogPostButton: React.FC<{ onClick?: () => void }> = ({ onClick }) => {
  return (
    <>
      <div onClick={onClick}>
        <span>
          Edit
        </span>
      </div>
    </>
  );
};