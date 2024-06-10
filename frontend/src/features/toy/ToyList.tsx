/* eslint-disable no-underscore-dangle */
import { ChangeEvent, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { RootState } from "../../store/store";
import { fetchToys, setCategory, setPage, setResultsPerPage } from "./toySlice";
import ToyCard from "./ToyCard";
import Pagination from "../../components/Pagination";
import { CATEGORIES } from "../../lib/consts";

function ToyList() {
  const dispatch = useAppDispatch();
  const toys = useAppSelector((state: RootState) => state.toys.toys);
  const { error, loading } = useAppSelector((state: RootState) => state.toys);
  const { category, ageCategory, brand } = useAppSelector(
    (state: RootState) => state.toys
  );
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
    dispatch(
      fetchToys({
        page: currentPage,
        limit: resultsPerPage,
        category,
        ageCategory,
        brand
      })
    );
  }, [dispatch, currentPage, resultsPerPage, category, ageCategory, brand]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Failed to load toys. Error: {error}</div>;
  }

  return (
    <div>
      <div>
        <span>category</span>
        <select
          name="category"
          id="category"
          onChange={(event: ChangeEvent<HTMLSelectElement>) =>
            dispatch(setCategory(event.target.value))
          }
        >
          {CATEGORIES.map(cat => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>

      <div className="flex flex-wrap justify-center">
        {toys.map(toy => (
          <ToyCard
            key={toy._id}
            id={toy._id}
            name={toy.name}
            description={toy.description}
            images={toy.images.length > 0 ? toy.images : ["../bear.webp"]}
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
