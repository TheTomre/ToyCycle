/* eslint-disable no-underscore-dangle */
import { Link } from "react-router-dom";
import { useState } from "react";
import { Toy } from "./toyTypes";
import { API_BASE_URL, ENDPOINT } from "../../lib/consts";

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

  const handleDelete = async (id: string) => {
    const response = await fetch(`${API_BASE_URL}${ENDPOINT.toys}/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`
      }
    });

    if (response.ok) {
      // Handle successful deletion (e.g., show a success message, remove the toy from the list, etc.)
    } else {
      // Handle error
    }
  };

  return (
    <div className="flex-col sm:flex-row flex w-full bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-200 transform transition-transform duration-300 hover:scale-[1.02]">
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
          <div className="flex space-x-2">
            <Link
              to={`/toys/edit/${toy._id}`}
              className="bg-[#3a0e7b] text-white px-4 py-2 rounded-lg hover:bg-[#280b5f] transition duration-300"
            >
              Edit
            </Link>
            <button
              className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition duration-300"
              onClick={() => handleDelete(toy._id)}
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserToyCard;
