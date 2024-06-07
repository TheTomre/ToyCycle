import { useState } from "react";

type ToyProps = {
  id: string;
  name: string;
  description?: string;
  images: string[];
  tokens: number;
};

function ToyCard({ id, name, description, images, tokens }: ToyProps) {
  const defaultImage = "../public/bear.webp";
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const handleMouseEnter = () => {
    if (images?.length > 1) {
      setCurrentImageIndex((currentImageIndex + 1) % images.length);
    }
  };

  const handleMouseLeave = () => {
    setCurrentImageIndex(0);
  };

  return (
    <div
      className="max-w-md w-full bg-white rounded-2xl shadow-lg overflow-hidden m-4 border border-gray-200 transform transition-transform duration-300 hover:scale-105"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="relative h-64 overflow-hidden flex items-center justify-center">
        <img
          className="w-full h-full object-contain transition-transform duration-300 transform hover:scale-110"
          src={images?.length > 0 ? images[currentImageIndex] : defaultImage}
          alt={name}
        />
      </div>
      <div className="p-6">
        <h3 className="text-xl font-semibold mb-2">{name}</h3>
        {description && <p className="text-gray-600 mb-4">{description}</p>}
        <div className="flex items-center justify-between mt-4">
          <span className="text-purple-500 font-semibold">{tokens} Tokens</span>
          <button className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition duration-300">
            Exchange Now
          </button>
        </div>
      </div>
    </div>
  );
}

export default ToyCard;
