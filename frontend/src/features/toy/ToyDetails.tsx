/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable no-underscore-dangle */
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHeart,
  faShoppingCart,
  faBoxOpen,
  faGlobe,
  faArrowLeft,
  faStore,
  faChevronDown,
  faChevronUp
} from "@fortawesome/free-solid-svg-icons";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { RootState } from "../../store/store";
import { fetchToyDetails } from "./toySlice";
import FullscreenImageSlider from "./FullscreenImageSlider";
import Modal from "../../components/Modal";
import Reviews from "../../components/Reviews";

function ToyDetails() {
  const { id } = useParams<{ id: string }>();
  const dispatch = useAppDispatch();
  const toy = useAppSelector((state: RootState) => state.toys.selectedToy);
  const loading = useAppSelector(
    (state: RootState) => state.toys.status === "loading"
  );
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [isFullDescriptionOpen, setIsFullDescriptionOpen] = useState(false);
  const [isReviewsOpen, setIsReviewsOpen] = useState(false);

  useEffect(() => {
    if (id) {
      dispatch(fetchToyDetails(id));
    }
  }, [dispatch, id]);

  if (loading) {
    return <div className="text-center">Loading...</div>;
  }

  if (!toy) {
    return <div className="text-center">Toy not found</div>;
  }

  const handleThumbnailClick = (index: number) => {
    setCurrentImageIndex(index);
  };

  const handleImageClick = () => {
    setIsFullscreen(true);
  };

  const handleCloseFullscreen = () => {
    setIsFullscreen(false);
  };

  const handleContactClick = () => {
    setIsContactModalOpen(true);
  };

  const handleCloseContactModal = () => {
    setIsContactModalOpen(false);
  };

  const toggleFullDescription = () => {
    setIsFullDescriptionOpen(!isFullDescriptionOpen);
  };

  const toggleReviews = () => {
    setIsReviewsOpen(!isReviewsOpen);
  };

  return (
    <div className="max-w-6xl mx-auto p-6 bg-white mt-6">
      <nav className="mb-4 text-purple-700">
        <button onClick={() => window.history.back()} className="mr-2">
          <FontAwesomeIcon icon={faArrowLeft} /> Back
        </button>
      </nav>
      <h1 className="text-3xl font-bold text-gray-800 pb-4 font-mono tracking-tight">
        {toy.name}
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
        <div className="space-y-4">
          <div className="relative w-full h-98 overflow-hidden mb-4">
            <button
              className="relative w-full h-98 overflow-hidden mb-4"
              onClick={handleImageClick}
              aria-label="View larger image"
            >
              <img
                className="object-cover w-full h-[300px] sm:h-[350px] md:h-[554px] cursor-pointer"
                src={toy.images[currentImageIndex] || "../bear.webp"}
                alt={toy.name}
              />
            </button>
          </div>
          <div className="flex justify-center">
            {toy.images.map((image, index) => (
              <button
                key={image}
                onClick={() => handleThumbnailClick(index)}
                className={`w-16 h-16 object-cover cursor-pointer rounded-lg m-1 border ${
                  currentImageIndex === index
                    ? "border-purple-600"
                    : "border-transparent"
                }`}
                aria-label={`Thumbnail ${index}`}
              >
                <img
                  src={image}
                  alt={`Thumbnail ${index}`}
                  className="w-full h-full object-cover rounded-lg"
                />
              </button>
            ))}
          </div>
        </div>
        <div className="space-y-4">
          <div className="shadow-lg rounded-lg p-3 sm:p-6 bg-white">
            <div className="flex items-center mb-2">
              <FontAwesomeIcon
                icon={faHeart}
                className="text-purple-700 mr-2"
              />
              <h2
                className="text-xl
font-mono"
              >
                Description
              </h2>
            </div>
            <p className="text-gray-600 font-sans">{toy.description}</p>
          </div>
          <div className="shadow-lg rounded-lg p-3 sm:p-6 bg-white">
            <div className="flex items-center mb-2">
              <FontAwesomeIcon
                icon={faStore}
                className="text-purple-700 mr-2"
              />
              <h2 className="text-xl font-mono">Token Value</h2>
            </div>
            <p className="text-lg text-purple-700 font-bold">
              {toy.tokenValue} Tokens
            </p>
          </div>
          <div className="shadow-lg rounded-lg p-3 sm:p-6 bg-white">
            <div className="flex items-center mb-2">
              <FontAwesomeIcon
                icon={faBoxOpen}
                className="text-purple-700 mr-2"
              />
              <h2 className="text-xl font-mono">Condition</h2>
            </div>
            <p className="text-lg text-gray-800 font-bold">{toy.condition}</p>
          </div>
          <div className="shadow-lg rounded-lg p-3 sm:p-6 bg-white">
            <div className="flex items-center mb-2">
              <FontAwesomeIcon
                icon={faShoppingCart}
                className="text-purple-700 mr-2"
              />
              <h2 className="text-xl font-mono">Available Quantity</h2>
            </div>
            <p className="text-lg text-gray-800 font-bold">{toy.quantity}</p>
          </div>
          <div className="shadow-lg rounded-lg p-3 sm:p-6 bg-white">
            <div className="flex items-center mb-2">
              <FontAwesomeIcon
                icon={faGlobe}
                className="text-purple-700 mr-2"
              />
              <h2 className="text-xl font-mono">Origin</h2>
            </div>
            <p className="text-lg text-gray-800 font-bold">{toy.origin}</p>
          </div>
          <button
            className="mt-6 w-full bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 transition duration-300 text-lg font-bold"
            onClick={handleContactClick}
          >
            Contact Owner
          </button>
        </div>
      </div>
      <div className="mt-6">
        <div
          className="cursor-pointer bg-gray-100 p-4 flex justify-between items-center"
          onClick={toggleFullDescription}
          role="button"
          tabIndex={0}
          onKeyDown={e => {
            if (e.key === "Enter" || e.key === " ") {
              toggleFullDescription();
            }
          }}
        >
          <h2 className="text-xl font-mono text-gray-800">
            PRODUCT DESCRIPTION
          </h2>
          <FontAwesomeIcon
            icon={isFullDescriptionOpen ? faChevronUp : faChevronDown}
            className="text-gray-800"
          />
        </div>
        {isFullDescriptionOpen && (
          <div className="p-6 text-gray-600 font-sans bg-white mt-2">
            {toy.fullDescription}
          </div>
        )}
      </div>
      <div className="mt-6">
        <div
          className="cursor-pointer bg-gray-100 p-4 flex justify-between items-center"
          onClick={toggleReviews}
          role="button"
          tabIndex={0}
          onKeyDown={e => {
            if (e.key === "Enter" || e.key === " ") {
              toggleReviews();
            }
          }}
        >
          <h2 className="text-xl font-mono text-gray-800">REVIEWS</h2>
          <FontAwesomeIcon
            icon={isReviewsOpen ? faChevronUp : faChevronDown}
            className="text-gray-800"
          />
        </div>
        {isReviewsOpen && (
          <div className="p-6 text-gray-600 font-sans bg-white mt-2">
            <Reviews />
          </div>
        )}
      </div>
      {isFullscreen && (
        <FullscreenImageSlider
          images={toy.images}
          currentIndex={currentImageIndex}
          onClose={handleCloseFullscreen}
        />
      )}
      {isContactModalOpen && (
        <Modal onClose={handleCloseContactModal}>
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

export default ToyDetails;
