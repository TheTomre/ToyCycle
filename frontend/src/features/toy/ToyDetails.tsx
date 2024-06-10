import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { RootState } from "../../store/store";
import { fetchToyDetails } from "./toySlice";
import FullscreenImageSlider from "./FullscreenImageSlider";

function ToyDetails() {
  const { id } = useParams<{ id: string }>();
  const dispatch = useAppDispatch();
  const toy = useAppSelector((state: RootState) => state.toys.selectedToy);
  const loading = useAppSelector(
    (state: RootState) => state.toys.status === "loading"
  );
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);

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

  return (
    <div className="max-w-6xl mx-auto p-6 bg-white mt-6">
      <button
        onClick={() => window.history.back()}
        className="text-purple-600 mb-4"
      >
        ← Back
      </button>
      <div className="flex flex-col md:flex-row items-start">
        <div className="relative w-full md:w-1/2 bg-white p-4">
          <div className="w-full h-96 flex items-center justify-center overflow-hidden">
            <button
              onClick={handleImageClick}
              className="w-full h-full flex items-center justify-center bg-transparent border-none p-0 cursor-pointer"
              style={{ outline: "none" }}
            >
              <img
                className="max-h-full max-w-full object-contain cursor-pointer"
                src={toy.images[currentImageIndex] || "../bear.webp"}
                alt={toy.name}
              />
            </button>
          </div>
          <div className="flex justify-center mt-2">
            {toy.images.map((image, index) => (
              <button
                key={image}
                onClick={() => handleThumbnailClick(index)}
                className={`w-16 h-16 object-cover cursor-pointer rounded-lg m-1 border ${currentImageIndex === index ? "border-purple-600" : "border-transparent"}`}
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
        <div className="md:ml-10 mt-6 md:mt-0">
          <h1 className="text-3xl font-semibold text-gray-800">{toy.name}</h1>
          <p className="text-xl text-purple-600 mt-2">
            {toy.tokenValue} Tokens
          </p>
          <p className="mt-4 text-gray-600">{toy.description}</p>
          <p className="mt-2 text-gray-600">Condition: {toy.condition}</p>
          <p className="mt-2 text-gray-600">Made in: {toy.origin}</p>
          <p className="mt-2 text-gray-600">
            Available Quantity: {toy.quantity}
          </p>
          <button className="mt-6 bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition duration-300">
            Contact Owner
          </button>
        </div>
      </div>
      <div className="mt-6">
        <h2 className="text-2xl font-semibold text-gray-800">
          Full Description
        </h2>
        <p className="mt-4 text-gray-600">{toy.fullDescription}</p>
      </div>
      <div className="mt-6">
        <h2 className="text-2xl font-semibold text-gray-800">Reviews</h2>
      </div>

      {isFullscreen && (
        <FullscreenImageSlider
          images={toy.images}
          currentIndex={currentImageIndex}
          onClose={handleCloseFullscreen}
        />
      )}
    </div>
  );
}

export default ToyDetails;
