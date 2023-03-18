import { UpdateBlogPostButton } from "./UpdateBlogPostButton";
import { UpdateBlogPostForm } from "./UpdateBlogPostForm";
import { useEffect, useState } from "react";
import { api } from "~/utils/api";
import { Spinner } from "../Spinner";
import { FiCheck } from "react-icons/fi";
import { BlogPostInputModal } from "~/components/BlogPostInputModal";

interface UpdateBlogPostProps {
  id: string,
  author: string,
  title: string,
  content: string
}

export const UpdateBlogPostWidget: React.FC<UpdateBlogPostProps> = ({id, author, title, content}) => {
  const utils = api.useContext();

  const updateBlogPostMutation = api.blogPost.update.useMutation({
    onSuccess(data, variables, context) {
      return utils.blogPost.get.invalidate();
    },
  });
  const [isModalOpen, setModalOpen] = useState(false);
  const [isSuccessful, setSuccessful] = useState(false);

  useEffect(() => {
    if (updateBlogPostMutation.isSuccess) {
      setSuccessful(true);

      const timeoutId = setTimeout(() => {
        setModalOpen(false);
        setSuccessful(false);
      }, 2000);

      return () => {
        setSuccessful(false);
        clearTimeout(timeoutId);
      };
    }
  }, [updateBlogPostMutation.isSuccess]);

  return (
    <>
      <UpdateBlogPostButton onClick={() => setModalOpen(true)} />
      <BlogPostInputModal
        action="Update"
        isOpen={isModalOpen}
        onRequestClose={() => {
          setModalOpen(false);
        }}
        closeDisabled={updateBlogPostMutation.isLoading || isSuccessful}
      >
        {updateBlogPostMutation.isLoading ? (
          <div className="flex h-96 w-full items-center justify-center">
            <Spinner size={12} />
          </div>
        ) : isSuccessful ? (
          <div className="flex h-96 w-full flex-col items-center justify-center">
            <FiCheck
              size={"12rem"}
              className="animate-pulse stroke-highlight-green"
            />
            <div className="text-lg">Successfully updated the blog post</div>
          </div>
        ) : (
          <UpdateBlogPostForm oldTitle={title} oldContent={content}
            onSubmit={(fieldValues) =>
              updateBlogPostMutation.mutate({
                where: {
                  id
                },
                data: {
                  title: fieldValues.title,
                  content: fieldValues.content,
                },
              })
            }
          />
        )}
      </BlogPostInputModal>
    </>
  );
};
