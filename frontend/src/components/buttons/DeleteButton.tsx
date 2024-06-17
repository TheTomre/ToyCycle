import { useState } from "react";
import Modal from "../Modal";
import "./DeleteButton.css";
import "font-awesome/css/font-awesome.min.css";

type DeleteButtonProps = {
  onDelete: () => void;
};

function DeleteButton({ onDelete }: DeleteButtonProps) {
  const [showModal, setShowModal] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const confirmDelete = () => {
    onDelete();
    setIsSuccess(true);
    setTimeout(() => {
      setIsSuccess(false);
    }, 3000);
    closeModal();
  };

  return (
    <>
      <button
        className={`unique-delete-button ${isSuccess ? "success" : ""}`}
        onClick={openModal}
      >
        <span>Delete</span>
        <div className="icon">
          <i className="fa fa-remove" />
          <i className="fa fa-check" />
        </div>
      </button>
      {showModal && (
        <Modal onClose={closeModal}>
          <div className="px-6 pb-6 font-sans">
            <h2 className="text-xl font-semibold mb-4">Confirm Deletion</h2>
            <p className="mb-4 text-lg">
              Are you sure you want to delete this toy?
            </p>
            <div className="flex justify-end space-x-2">
              <button
                className="bg-green-500 text-gray-700 px-4 py-2 text-xl rounded-lg hover:bg-green-600 transition duration-300"
                onClick={closeModal}
              >
                Cancel
              </button>
              <button
                className="bg-red-500 text-white text-xl px-4 py-2 rounded-lg hover:bg-red-600 transition duration-300"
                onClick={confirmDelete}
              >
                Confirm
              </button>
            </div>
          </div>
        </Modal>
      )}
    </>
  );
}

export default DeleteButton;
