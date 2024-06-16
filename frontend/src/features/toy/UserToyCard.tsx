/* eslint-disable no-underscore-dangle */
import { useState } from "react";
import { Link } from "react-router-dom";
import { Toy } from "./toyTypes";

type ToyProps = {
  toy: Toy;
};

function UserToyCard({ toy }: ToyProps) {
  const defaultImage = "../bear.webp";
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const handleMouseEnter = () => {
    if (toy.images?.length > 1) {
      setCurrentImageIndex((currentImageIndex + 1) % toy.images.length);
    }
  };

  const handleMouseLeave = () => {
    setCurrentImageIndex(0);
  };

  return (
    <Link
      to={`/toys/${toy._id}`}
      className="flex-col sm:flex-row flex w-full bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-200 transform transition-transform duration-300 hover:scale-[1.02]"
    >
      <div
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className="relative h-64 overflow-hidden flex items-center justify-center flex-[4_1_0]"
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
      </div>
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
          <button className="bg-[#3a0e7b] text-white px-4 py-2 rounded-lg hover:bg-[#280b5f] transition duration-300">
            Edit
          </button>
        </div>
      </div>
    </Link>
  );
}

export default UserToyCard;
