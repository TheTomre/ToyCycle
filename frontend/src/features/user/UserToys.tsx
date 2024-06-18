import { useState, useEffect } from "react";
import { useGetUserToys } from "../auth/apiService/UserApi";
import UserToyCard from "../toy/UserToyCard";
import { Toy } from "../toy/toyTypes";

function UserToys() {
  const { data, error, refetch } = useGetUserToys();
  const [userToys, setUserToys] = useState<Toy[]>([]);

  useEffect(() => {
    if (data) {
      setUserToys(data);
    }
  }, [data]);

  const handleToyDeleted = () => {
    refetch();
  };

  if (error) {
    return (
      <div className="flex items-center h-full mt-16">
        <span className="text-[#3a0e7b] font-mono text-2xl">
          No toys found. Start to share 🧸
        </span>
      </div>
    );
  }

  return (
    <div className="p-4 w-full flex flex-col items-center pb-20 max-w-[1440px] justify-center justify-items-center">
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
