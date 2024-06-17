/* eslint-disable no-underscore-dangle */
import { useState, KeyboardEvent } from "react";
import { useNavigate } from "react-router-dom";
import { Toy } from "./toyTypes";
import { API_BASE_URL, ENDPOINT } from "../../lib/consts";
import EditButton from "../../components/buttons/EditButton";
import DeleteButton from "../../components/buttons/DeleteButton";

type ToyProps = {
  toy: Toy;
  onDelete: () => void;
};

function UserToyCard({ toy, onDelete }: ToyProps) {
  const defaultImage = "../bear.webp";
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const navigate = useNavigate();

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

  const handleEdit = () => {
    navigate(`/toys/edit/${toy._id}`);
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "Enter" || event.key === " ") {
      navigate(`/toys/${toy._id}`);
    }
  };

  return (
    <div className="flex-col sm:flex-row flex w-full bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-200 transform transition-transform duration-300 hover:scale-[1.02]">
      <div
        className="relative h-64 overflow-hidden flex items-center justify-center flex-[4_1_0]"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={() => navigate(`/toys/${toy._id}`)}
        onKeyDown={handleKeyDown}
        tabIndex={0}
        role="button"
        style={{ cursor: "pointer" }}
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
            <EditButton onClick={handleEdit} />
            <DeleteButton onDelete={() => handleDelete(toy._id)} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserToyCard;
