/* eslint-disable no-underscore-dangle */
import { Link } from "react-router-dom";
import { useState } from "react";
import { Toy } from "./toyTypes";
import { API_BASE_URL, ENDPOINT } from "../../lib/consts";
import Modal from "../../components/Modal";

type ToyProps = {
  toy: Toy;
  onDelete: () => void;
};

function UserToyCard({ toy, onDelete }: ToyProps) {
  const defaultImage = "../bear.webp";
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showModal, setShowModal] = useState(false);

  const handleMouseEnter = () => {
    if (toy.images?.length > 1) {
      setCurrentImageIndex((currentImageIndex + 1) % toy.images.length);
    }
  };

  const handleMouseLeave = () => {
    setCurrentImageIndex(0);
  };

  const handleDelete = async (id: string) => {
    const response = await fetch(`${API_BASE_URL}${ENDPOINT.toys}/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`
      }
    });

    if (response.ok) {
      onDelete();
    } else {
      // Handle error
    }
  };

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const confirmDelete = () => {
    handleDelete(toy._id);
    closeModal();
  };

  return (
    <div className="flex-col sm:flex-row flex w-full bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-200 transform transition-transform duration-300 hover:scale-[1.02]">
      <Link
        to={`/toys/${toy._id}`}
        className="relative h-64 overflow-hidden flex items-center justify-center flex-[4_1_0]"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <img
          className="object-center object-cover m-0 h-[150px] sm:h-full w-full transition-transform duration-300 transform hover:scale-110"
          src={
            toy.images?.length > 0
              ? toy.images[currentImageIndex]
              : defaultImage
          }
          alt={toy.name}
        />
      </Link>
      <div className="p-4 flex-[6_1_0]">
        <h3 className="text-xl font-semibold mb-2">{toy.name}</h3>
        {toy.description && (
          <p className="text-gray-600 mb-4">{toy.description}</p>
        )}
        <div className="flex items-center justify-between mt-4">
          <span className="text-[#3a0e7b] font-semibold">
            {toy.tokenValue} Tokens
          </span>
          <span className="text-[#3a0e7b] font-semibold">{toy.price}$</span>
          <div className="flex space-x-2">
            <Link
              to={`/toys/edit/${toy._id}`}
              className="bg-[#3a0e7b] text-white px-4 py-2 rounded-lg hover:bg-[#280b5f] transition duration-300"
            >
              Edit
            </Link>
            <button
              className="bg-[#ff4d4d] text-white px-4 py-2 rounded-lg hover:bg-red-600 transition duration-300"
              onClick={openModal}
            >
              Delete
            </button>
          </div>
        </div>
      </div>
      {showModal && (
        <Modal onClose={closeModal}>
          <div className="px-6 pb-6 font-sans">
            <h2 className="text-xl font-semibold mb-4">Confirm Deletion</h2>
            <p className="mb-4 text-lg">
              Are you sure you want to delete this toy?
            </p>
            <div className="flex justify-end space-x-2">
              <button
                className="bg-[#70e2d2] text-gray-700 px-4 py-2 text-xl rounded-lg hover:bg-[#58f6e1] transition duration-300"
                onClick={closeModal}
              >
                Cancel
              </button>
              <button
                className="bg-[#ff4d4d] text-white  text-xl px-4 py-2 rounded-lg hover:bg-red-600 transition duration-300"
                onClick={confirmDelete}
              >
                Confirm
              </button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}

export default UserToyCard;
