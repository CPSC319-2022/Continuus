import type { PropsWithChildren } from 'react';
import React from 'react';
import Modal from 'react-modal';

{process.env.NODE_ENV !== 'test' ? Modal.setAppElement("#__next") : Modal.setAppElement("body")}

export const BlogPostInputModal: React.FC<PropsWithChildren<{
    action: string,
    isOpen: boolean,
    closeDisabled?: boolean,
    onRequestClose: () => void,
}>> = ({
    children,
    action,
    isOpen,
    closeDisabled,
    onRequestClose,
}) => {
        return (
            <Modal
                isOpen={isOpen}
                onRequestClose={() => closeDisabled || onRequestClose()}
                contentLabel="Blog Post Input"
                overlayClassName="fixed inset-0 z-20 bg-black/75"
                ariaHideApp={process.env.NODE_ENV !== 'test'}
                className="bg-white absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-11/12 rounded-md md:w-1/2 z-40"
            >
                <div className="w-full h-12 flex flex-row justify-between items-center border-b border-b-gray-200 pl-4 pr-4">
                    <div className="font-semibold">{action} Blog Post</div>
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