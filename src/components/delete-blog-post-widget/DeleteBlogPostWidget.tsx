import { api } from "~/utils/api";
import React, { FormEvent, useEffect, useState } from "react";
import { DeleteBlogPostButton } from "~/components/delete-blog-post-widget/DeleteBlogPostButton";
import { BlogPostInputModal } from "~/components/BlogPostInputModal";
import { Spinner } from "~/components/Spinner";
import { FiCheck } from "react-icons/fi";

interface DeleteBlogPostWidgetProps {
  id: string
}

export const DeleteBlogPostWidget: React.FC<DeleteBlogPostWidgetProps> = ({ id }) => {
  const utils = api.useContext();

  const deleteBlogPostMutation = api.blogPost.delete.useMutation({
    onSuccess(data, variables, context) {
      return utils.blogPost.get.invalidate();
    },
  });

  const [isModalOpen, setModalOpen] = useState(false);
  const [isSuccessful, setSuccessful] = useState(false);

  useEffect(() => {
    if (deleteBlogPostMutation.isSuccess) {
      setSuccessful(true);

      const timeoutId = setTimeout(() => {
        location.reload();
      }, 2000);

      return () => {
        setSuccessful(false);
        clearTimeout(timeoutId);
      };
    }
  }, [deleteBlogPostMutation.isSuccess]);

  return (
    <>
      <DeleteBlogPostButton onClick={() => setModalOpen(true)} />
      <BlogPostInputModal
        action="Delete"
        isOpen={isModalOpen}
        onRequestClose={() => {
          setModalOpen(false);
        }}
        closeDisabled={deleteBlogPostMutation.isLoading || isSuccessful}
      >
        {deleteBlogPostMutation.isLoading ? (
          <div className="flex h-96 w-full items-center justify-center">
            <Spinner size={12} />
          </div>
        ) : isSuccessful ? (
          <div className="flex h-96 w-full flex-col items-center justify-center">
            <FiCheck
              size={"12rem"}
              className="animate-pulse stroke-highlight-green"
            />
            <div className="text-lg">Successfully deleted the blog post</div>
          </div>
        ) : (
          <>
            <div className="flex h-96 items-center justify-center">
              <div className="text-lg">Are you sure you want to delete this post?</div>
            </div>
            <form
              onSubmit={(event: FormEvent<HTMLFormElement>) => {
                event.preventDefault();
                deleteBlogPostMutation.mutate({
                  where: {
                    id
                  },
                })
              }}
            >
              <input type="submit" value="Delete"
                     className="relative left-full -translate-x-full px-6 py-2 rounded-md bg-emerald-400 my-2 -ml-4 hover:text-white transition-colors cursor-pointer"
              />
            </form>
          </>
        )}
      </BlogPostInputModal>
    </>
  );
}