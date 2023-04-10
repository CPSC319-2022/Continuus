import type { PropsWithChildren } from "react";
import React from "react";
import Modal from "react-modal";

{process.env.NODE_ENV !== 'test' ? Modal.setAppElement("#__next") : Modal.setAppElement("body")}

export const BlogPostInputModal: React.FC<
  PropsWithChildren<{
    action: string;
    isOpen: boolean;
    closeDisabled?: boolean;
    onRequestClose: () => void;
  }>
> = ({ children, action, isOpen, closeDisabled, onRequestClose }) => {
  return (
    <Modal
      closeTimeoutMS={100}
      isOpen={isOpen}
      onRequestClose={() => closeDisabled || onRequestClose()}
      contentLabel="Blog Post Input"
      overlayClassName="fixed inset-0 z-20 bg-black/75"
      ariaHideApp={process.env.NODE_ENV !== "test"}
      className="absolute top-1/2 left-1/2 z-40 w-11/12 -translate-x-1/2 -translate-y-1/2 rounded-md bg-white md:w-1/2 p-4"
    >
      <div className="flex pb-3 w-full flex-row items-center justify-between border-b border-b-gray-200 pl-4 pr-4">
        <div className="font-semibold">{action} Blog Post</div>
        {closeDisabled || (
          <button
            className="rounded-full after:content-['\2715'] hover:text-highlight-red hover:scale-125 transition-all"
            onClick={() => closeDisabled || onRequestClose()}
          />
        )}
      </div>
      {children}
    </Modal>
  );
};
