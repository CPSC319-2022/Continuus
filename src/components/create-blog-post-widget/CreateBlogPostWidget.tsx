import { CreateBlogPostButton } from "./CreateBlogPostButton";
import { CreateBlogPostForm } from "./CreateBlogPostForm";
import { CreateBlogPostModal } from "./CreateBlogPostModal";
import { useEffect, useState } from "react";
import { api } from "~/utils/api";
import { Spinner } from "../Spinner";
import { FiCheck } from "react-icons/fi";

export const CreateBlogPostWidget: React.FC = () => {
  const utils = api.useContext();

  const createBlogPostMutation = api.blogPost.create.useMutation({
    onSuccess(data, variables, context) {
      return utils.blogPost.get.invalidate();
    },
  });
  const currUser = api.user.currentUser.useQuery();
  const [isModalOpen, setModalOpen] = useState(false);
  const [isSuccessful, setSuccessful] = useState(false);

  useEffect(() => {
    if (createBlogPostMutation.isSuccess) {
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
  }, [createBlogPostMutation.isSuccess]);

  if (currUser.isLoading) {
    return <CreateBlogPostButton loading />;
  }

  if (
    currUser.data === null ||
    !!!currUser.data ||
    !["CONTRIBUTOR", "ADMIN"].includes(currUser.data.role)
  ) {
    return <CreateBlogPostButton unauthorized />;
  }

  const userId = currUser.data.id;

  return (
    <>
      <CreateBlogPostButton onClick={() => setModalOpen(true)} />
      <CreateBlogPostModal
        isOpen={isModalOpen}
        onRequestClose={() => {
          setModalOpen(false);
        }}
        closeDisabled={createBlogPostMutation.isLoading || isSuccessful}
      >
        {createBlogPostMutation.isLoading ? (
          <div className="flex h-96 w-full items-center justify-center">
            <Spinner size={12} />
          </div>
        ) : isSuccessful ? (
          <div className="flex h-96 w-full flex-col items-center justify-center">
            <FiCheck
              size={"12rem"}
              className="animate-pulse stroke-highlight-green"
            />
            <div className="text-lg">Sucessfully Created the Blog Post</div>
          </div>
        ) : (
          <CreateBlogPostForm
            onSubmit={(fieldValues) =>
              createBlogPostMutation.mutate({
                data: {
                  title: fieldValues.title,
                  content: fieldValues.content,
                  userId: userId,
                },
              })
            }
          />
        )}
      </CreateBlogPostModal>
    </>
  );
};
