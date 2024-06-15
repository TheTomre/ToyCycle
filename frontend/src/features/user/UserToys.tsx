/* eslint-disable no-underscore-dangle */
import { useGetUserToys } from "../auth/apiService/UserApi";
import { Toy } from "../toy/toyTypes";

function UserToys() {
  const { data, isLoading, error } = useGetUserToys();

  if (isLoading) {
    return <span>Loading...</span>;
  }

  if (error) {
    return <span>Unable to load toys</span>;
  }

  const userToys: Toy[] = data || [];

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">My Toys</h2>
      <ul>
        {userToys.map(toy => (
          <li key={toy._id} className="mb-2 p-2 border rounded">
            <h3 className="font-semibold">{toy.name}</h3>
            <p>{toy.description}</p>
            <span className="text-gray-500">{toy.price}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default UserToys;
