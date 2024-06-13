/* eslint-disable no-underscore-dangle */
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { RootState } from "../../store/store";
import { fetchToys, setPage, setResultsPerPage } from "./toySlice";
import ToyCard from "./ToyCard";
import Pagination from "../../components/Pagination";
// import Error from "../../components/Error";
import Loader from "../../components/Loader";
import ToyFilterList from "./Filter/ToyFilterList";

function ToyList() {
  const dispatch = useAppDispatch();
  const toys = useAppSelector((state: RootState) => state.toys.toys);
  const {
    // error,
    loading,
    currentPage,
    totalPages,
    resultsPerPage,
    totalResults,
    ageCategory,
    brand,
    category
  } = useAppSelector((state: RootState) => state.toys);

  const convertToString = (arr: string[]) => {
    return arr.join(",");
  };

  useEffect(() => {
    const categoryStr = convertToString(category);
    const ageCategoryStr = convertToString(ageCategory);
    const brandStr = convertToString(brand);

    dispatch(
      fetchToys({
        page: currentPage,
        limit: resultsPerPage,
        category: categoryStr,
        ageCategory: ageCategoryStr,
        brand: brandStr
      })
    );
  }, [dispatch, currentPage, resultsPerPage, category, ageCategory, brand]);

  return (
    <div>
      <section className="flex gap-5">
        <ToyFilterList />
        <section>
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={page => dispatch(setPage(page))}
            resultsPerPage={resultsPerPage}
            onResultsPerPageChange={results => {
              dispatch(setPage(1));
              dispatch(setResultsPerPage(results));
            }}
            totalResults={totalResults}
          />
          <div className="flex flex-wrap justify-center">
            {/* {loading && <Loader />}
              {error ? (
                <Error />
              ) : (
                <> */}
            {loading && <Loader />}
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
            onResultsPerPageChange={results =>
              dispatch(setResultsPerPage(results))
            }
            totalResults={totalResults}
          />
          {/* </>
        )} */}
        </section>
      </section>
    </div>
  );
}

export default ToyList;
