/* eslint-disable no-underscore-dangle */
import { useEffect, useMemo } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { RootState } from "../../store/store";
import { fetchToys, setPage, setResultsPerPage } from "./toySlice";
import ToyCard from "./ToyCard";
import Pagination from "../../components/Pagination";
import Error from "../../components/Error";
import Loader from "../../components/Loader";
import ToyFilterList from "./Filter/ToyFilterList";

function ToyList() {
  const dispatch = useAppDispatch();
  const {
    toys,
    error,
    loading,
    currentPage,
    totalPages,
    resultsPerPage,
    totalResults,
    ageCategory,
    brand,
    category,
    sort,
    search
  } = useAppSelector((state: RootState) => state.toys);

  const categoryStr = useMemo(() => category.join(","), [category]);
  const ageCategoryStr = useMemo(() => ageCategory.join(","), [ageCategory]);
  const brandStr = useMemo(() => brand.join(","), [brand]);

  useEffect(() => {
    const fetchToysData = () => {
      const params = {
        page: currentPage,
        limit: resultsPerPage,
        category: categoryStr,
        ageCategory: ageCategoryStr,
        brand: brandStr,
        sort,
        search
      };
      dispatch(fetchToys(params));
    };

    fetchToysData();
  }, [
    dispatch,
    currentPage,
    resultsPerPage,
    categoryStr,
    ageCategoryStr,
    brandStr,
    sort,
    search
  ]);

  if (loading) return <Loader />;
  if (error) return <Error errorMessage={error ?? "Something went wrong..."} />;

  const handlePageChange = (page: number) => {
    dispatch(setPage(page));
  };

  const handleResultsPerPageChange = (results: number) => {
    dispatch(setPage(1));
    dispatch(setResultsPerPage(results));
  };

  return (
    <div className="min-h-[100%] relative">
      <section className="flex gap-5 px-4 sm:px-10">
        <ToyFilterList />
        <section>
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
            resultsPerPage={resultsPerPage}
            onResultsPerPageChange={handleResultsPerPageChange}
            totalResults={totalResults}
          />
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
            onPageChange={handlePageChange}
            resultsPerPage={resultsPerPage}
            onResultsPerPageChange={handleResultsPerPageChange}
            totalResults={totalResults}
          />
        </section>
      </section>
    </div>
  );
}

export default ToyList;
