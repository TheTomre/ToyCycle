/* eslint-disable no-underscore-dangle */
import { useState, useEffect } from "react";
import Loader from "../../components/Loader";
import { useGetUserToys } from "../auth/apiService/UserApi";
import UserToyCard from "../toy/UserToyCard";
import { Toy } from "../toy/toyTypes";

function UserToys() {
  const { data, isLoading, error, refetch } = useGetUserToys();
  const [userToys, setUserToys] = useState<Toy[]>([]);

  useEffect(() => {
    if (data) {
      setUserToys(data);
    }
  }, [data]);

  const handleToyDeleted = () => {
    refetch();
  };

  if (isLoading) {
    return <Loader />;
  }

  if (error) {
    return <span>Unable to load toys</span>;
  }

  return (
    <div className="p-4 w-full flex flex-col items-center max-w-[1440px] justify-center justify-items-center">
      <ul className="w-full space-y-4">
        {userToys.map(toy => (
          <li className="w-full" key={toy._id}>
            <UserToyCard toy={toy} onDelete={handleToyDeleted} />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default UserToys;
