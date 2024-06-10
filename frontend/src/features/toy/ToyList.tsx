/* eslint-disable no-underscore-dangle */
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { RootState } from "../../store/store";
import { fetchToys, setPage, setResultsPerPage } from "./toySlice";
import ToyCard from "./ToyCard";
import Pagination from "../../components/Pagination";

function ToyList() {
  const dispatch = useAppDispatch();
  const toys = useAppSelector((state: RootState) => state.toys.toys);
  const status = useAppSelector((state: RootState) => state.toys.status);
  const error = useAppSelector((state: RootState) => state.toys.error);
  const currentPage = useAppSelector(
    (state: RootState) => state.toys.currentPage
  );
  const totalPages = useAppSelector(
    (state: RootState) => state.toys.totalPages
  );
  const resultsPerPage = useAppSelector(
    (state: RootState) => state.toys.resultsPerPage
  );
  const totalResults = useAppSelector(
    (state: RootState) => state.toys.totalResults
  );

  useEffect(() => {
    dispatch(fetchToys({ page: currentPage, limit: resultsPerPage }));
  }, [dispatch, currentPage, resultsPerPage]);

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  if (status === "failed") {
    return <div>Failed to load toys. Error: {error}</div>;
  }

  return (
    <div>
      <div className="flex flex-wrap justify-center">
        {toys.map(toy => (
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
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={page => dispatch(setPage(page))}
        resultsPerPage={resultsPerPage}
        onResultsPerPageChange={results => dispatch(setResultsPerPage(results))}
        totalResults={totalResults}
      />
    </div>
  );
}

export default ToyList;
