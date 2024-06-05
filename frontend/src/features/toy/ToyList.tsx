import { useEffect, useState } from "react";
import { BASE_URL } from "../../utils/consts";
import ToyCard from "./ToyCard";
import { Toy } from "./toyTypes";

function ToyList() {
  const [toys, setToys] = useState<Toy[]>([]);
  useEffect(() => {
    async function fetchToys() {
      try {
        const response = await fetch(`${BASE_URL}/toys`);
        const data = await response.json();
        const toysArr: Toy[] = data.data;

        setToys(toysArr);
      } catch (error) {
        throw new Error((error as Error).message);
      }
    }
    fetchToys();
  }, []);

  return (
    <div>
      <h2>List of Toys</h2>
      <ul>
        {toys.map(toy => (
          <ToyCard
            key={toy.id}
            toy={{
              name: toy.name,
              description: toy.description,
              image:
                "https://gratisography.com/wp-content/uploads/2024/03/gratisography-funflower-800x525.jpg"
            }}
          />
        ))}
      </ul>
    </div>
  );
}

export default ToyList;
