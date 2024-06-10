import { useState } from "react";

type FullscreenImageSliderProps = {
  images: string[];
  currentIndex: number;
  onClose: () => void;
};

function FullscreenImageSlider({
  images,
  currentIndex,
  onClose
}: FullscreenImageSliderProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(currentIndex);

  const handlePrevImage = () => {
    setCurrentImageIndex(prevIndex =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const handleNextImage = () => {
    setCurrentImageIndex(prevIndex =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-90 flex justify-center items-center z-50">
      <button
        onClick={onClose}
        className="absolute top-4 right-4 text-white text-3xl"
      >
        ✕
      </button>
      <button
        onClick={handlePrevImage}
        className="absolute left-4 text-white text-3xl"
      >
        ◀
      </button>
      <img
        className="w-auto h-3/4 object-contain rounded-lg"
        src={images?.length > 0 ? images[currentImageIndex] : "../bear.webp"}
        alt={`Fullscreen ${currentImageIndex}`}
      />
      <button
        onClick={handleNextImage}
        className="absolute right-4 text-white text-3xl"
      >
        ▶
      </button>
    </div>
  );
}

export default FullscreenImageSlider;
