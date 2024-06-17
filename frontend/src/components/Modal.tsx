import React from "react";
import ReactDOM from "react-dom";

interface ModalProps {
  onClose: (event: React.MouseEvent) => void;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ onClose, children }) => {
  return ReactDOM.createPortal(
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="rounded-2xl shadow-lg overflow-hidden max-w-md w-full bg-purple-50">
        <div className="flex justify-end p-4">
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 transition duration-300 text-3xl"
            aria-label="Close modal"
          >
            &times;
          </button>
        </div>
        <div className="px-6 pb-6">{children}</div>
      </div>
    </div>,
    document.body
  );
};

export default Modal;
