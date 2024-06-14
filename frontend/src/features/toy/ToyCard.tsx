import { useState } from "react";
import { Link } from "react-router-dom";

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

  const handleMouseEnter = () => {
    if (images?.length > 1) {
      setCurrentImageIndex((currentImageIndex + 1) % images.length);
    }
  };

  const handleMouseLeave = () => {
    setCurrentImageIndex(0);
  };

  return (
    <Link
      to={`/toys/${id}`}
      className="max-w-md w-full bg-white rounded-2xl shadow-lg overflow-hidden m-4 border
       border-gray-200 transform transition-transform duration-300 hover:scale-105"
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
        {description && <p className="text-gray-600 mb-4">{description}</p>}
        <div className="flex items-center justify-between mt-4">
          <span className="text-purple-400 font-semibold">{tokens} Tokens</span>
          <button className="bg-purple-500 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition duration-300">
            Exchange Now
          </button>
        </div>
      </div>
    </Link>
  );
}

export default ToyCard;
