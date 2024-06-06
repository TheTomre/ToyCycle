import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { RootState } from "../../store/store";
import { fetchToys } from "./toySlice";
import ToyCard from "./ToyCard";

const ToyList: React.FC = () => {
  const dispatch = useAppDispatch();
  const toys = useAppSelector((state: RootState) => state.toys.toys);
  const status = useAppSelector((state: RootState) => state.toys.status);
  const error = useAppSelector((state: RootState) => state.toys.error);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchToys());
    }
  }, [status, dispatch]);

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  if (status === "failed") {
    console.error(error);
    return <div>Failed to load toys. Error: {error}</div>;
  }

  return (
    <div className="flex flex-wrap justify-center">
      {toys
        .slice()
        .reverse()
        .map(toy => (
          <ToyCard
            key={toy._id}
            id={toy._id}
            name={toy.name}
            description={toy.description}
            images={
              toy.images.length > 0 ? toy.images : ["../public/bear.webp"]
            }
            tokens={toy.tokenValue}
          />
        ))}
    </div>
  );
};

export default ToyList;
