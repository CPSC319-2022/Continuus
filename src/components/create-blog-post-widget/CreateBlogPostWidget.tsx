import { CreateBlogPostButton } from "./CreateBlogPostButton";
import { CreateBlogPostForm } from "./CreateBlogPostForm";
import { CreateBlogPostModal } from "./CreateBlogPostModal";
import { useState } from "react";


export const CreateBlogPostWidget: React.FC = () => {
    const [isModalOpen, setModalOpen] = useState(false);

    return (
        <>
            <CreateBlogPostButton onClick={() => setModalOpen(true)} />
            <CreateBlogPostModal isOpen={isModalOpen} onRequestClose={() => setModalOpen(false)}>
                <CreateBlogPostForm
                    onSubmit={(fieldValues) => console.log(fieldValues)}
                />
            </CreateBlogPostModal>
        </>
    );
}