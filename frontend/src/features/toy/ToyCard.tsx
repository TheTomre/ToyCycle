/* eslint-disable jsx-a11y/label-has-associated-control */
import { useState, KeyboardEvent } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import Modal from "../../components/Modal";
import SlideButton from "../../components/buttons/SlideButton";

type ToyProps = {
  id: string;
  name: string;
  description?: string;
  images: string[];
  tokens: number;
};

function ToyCard({ id, name, description, images, tokens }: ToyProps) {
  const defaultImage = "../bear.webp";
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();
  const { isAuthenticated, loginWithRedirect } = useAuth0();

  const handleMouseEnter = () => {
    if (images?.length > 1) {
      setCurrentImageIndex((currentImageIndex + 1) % images.length);
    }
  };

  const handleMouseLeave = () => {
    setCurrentImageIndex(0);
  };

  const handleExchangeClick = (event: React.MouseEvent) => {
    event.stopPropagation();
    if (isAuthenticated) {
      setIsModalOpen(true);
    } else {
      loginWithRedirect({
        appState: { returnTo: `/toys/${id}` }
      });
    }
  };

  const handleCloseModal = (event: React.MouseEvent) => {
    event.stopPropagation();
    setIsModalOpen(false);
  };

  const handleCardClick = () => {
    navigate(`/toys/${id}`);
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "Enter" || event.key === " ") {
      handleCardClick();
    }
  };

  return (
    <div
      className="max-w-md w-full bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-200 transform transition-transform duration-300 hover:scale-105"
      onClick={handleCardClick}
      onKeyDown={handleKeyDown}
      tabIndex={0}
      role="button"
      style={{ cursor: "pointer" }}
    >
      <div
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className="relative h-64 overflow-hidden flex items-center justify-center"
      >
        <img
          className="w-full h-full object-cover transition-transform duration-300 transform hover:scale-110"
          src={images?.length > 0 ? images[currentImageIndex] : defaultImage}
          alt={name}
        />
      </div>
      <div className="p-6">
        <h3 className="text-xl font-semibold mb-2">{name}</h3>
        {description && (
          <p className="text-gray-600 mb-4 h-12 overflow-hidden text-ellipsis">
            {description}
          </p>
        )}
        <div className="flex items-center justify-between mt-4">
          <span className="text-[#3a0e7b] font-semibold">{tokens} Tokens</span>
          <SlideButton
            onClick={(event: React.MouseEvent) => handleExchangeClick(event)}
            label="Exchange Now"
          />
        </div>
      </div>

      {isModalOpen && (
        <Modal onClose={handleCloseModal}>
          <div className="p-6">
            <h2 className="text-2xl font-semibold text-gray-800 font-mono">
              Contact Owner
            </h2>
            <form className="mt-4 space-y-4">
              <div>
                <label className="block text-gray-600" htmlFor="yourName">
                  Your Name
                </label>
                <input
                  type="text"
                  id="yourName"
                  className="w-full mt-1 p-2 border rounded-lg"
                />
              </div>
              <div>
                <label className="block text-gray-600" htmlFor="yourEmail">
                  Your Email
                </label>
                <input
                  type="email"
                  id="yourEmail"
                  className="w-full mt-1 p-2 border rounded-lg"
                />
              </div>
              <div>
                <label className="block text-gray-600" htmlFor="message">
                  Message
                </label>
                <textarea
                  id="message"
                  className="w-full mt-1 p-2 border rounded-lg"
                  rows={4}
                />
              </div>
              <button
                type="submit"
                className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition duration-300"
              >
                Send
              </button>
            </form>
          </div>
        </Modal>
      )}
    </div>
  );
}

export default ToyCard;
