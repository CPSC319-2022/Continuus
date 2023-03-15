import { PropsWithChildren } from 'react';
import Modal from 'react-modal';

Modal.setAppElement("#__next")

export const CreateBlogPostModal: React.FC<PropsWithChildren<{
    isOpen: boolean,
    closeDisabled?: boolean,
    onRequestClose: () => void,
}>> = ({
    children,
    isOpen,
    closeDisabled,
    onRequestClose,
}) => {
        return (
            <Modal
                isOpen={isOpen}
                onRequestClose={() => closeDisabled || onRequestClose()}
                contentLabel="Create Blog Post"
                overlayClassName="fixed inset-0 z-20 bg-black/75"
                ariaHideApp={process.env.NODE_ENV !== 'test'}
                className="bg-white absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1/2 rounded-md"
            >
                <div className="w-full h-12 flex flex-row justify-between items-center border-b border-b-gray-200 pl-4 pr-4">
                    <div className="font-semibold">Create Blog Post</div>
                    {
                        closeDisabled || <button
                            className="rounded-full after:content-['\2715'] hover:text-emerald-400 transition-colors"
                            onClick={() => closeDisabled || onRequestClose()}
                        />
                    }
                </div>
                {children}
            </Modal>
        );
    }