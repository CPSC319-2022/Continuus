import { CreateBlogPostButton } from "./CreateBlogPostButton";
import { CreateBlogPostModal } from "./CreateBlogPostModal";
import { useState } from "react";


export const CreateBlogPostWidget: React.FC = () => {
    const [isModalOpen, setModalOpen] = useState(false);

    return (
        <>
            <CreateBlogPostButton onClick={() => setModalOpen(true)} />
            <CreateBlogPostModal isOpen={isModalOpen} onRequestClose={() => setModalOpen(false)}>
            </CreateBlogPostModal>
        </>
    );
}