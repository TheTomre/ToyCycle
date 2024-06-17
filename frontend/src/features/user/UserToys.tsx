import { useGetUserToys } from "../auth/apiService/UserApi";
import UserToyCard from "../toy/UserToyCard";
import { Toy } from "../toy/toyTypes";

function UserToys() {
  const { data, error } = useGetUserToys();

  if (error) {
    return <span>Unable to load toys</span>;
  }

  const userToys: Toy[] = data || [];

  return (
    <div className="p-4 w-full flex flex-col items-center pb-20 max-w-[1440px] justify-center justify-items-center">
      <ul className=" w-full space-y-4">
        {userToys.map(toy => (
          <li className="w-full  " key={toy._id}>
            <UserToyCard toy={toy} />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default UserToys;
