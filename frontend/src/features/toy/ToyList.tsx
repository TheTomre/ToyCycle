/* eslint-disable no-underscore-dangle */
import { useEffect, useMemo, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { RootState } from "../../store/store";
import { fetchToys, setPage, setResultsPerPage } from "./toySlice";
import ToyCard from "./ToyCard";
import Pagination from "../../components/Pagination";
import Error from "../../components/Error";
import Loader from "../../components/Loader";
import ToyFilterList from "./Filter/ToyFilterList";
import Slider from "../../components/Slider";

function ToyList() {
  const dispatch = useAppDispatch();
  const [isFilterOpen, setFilterOpen] = useState(false);
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
    <div className="min-h-screen bg-gray-100 py-10">
      <div className="container mx-auto px-4 sm:px-10">
        <div className="flex justify-between items-center mb-4">
          <button
            className="lg:hidden bg-[#3a0e7b] text-white px-4 py-2 rounded-lg"
            onClick={() => setFilterOpen(true)}
          >
            Filters
          </button>
        </div>
        <section className="flex flex-col lg:flex-row gap-5">
          <div className="hidden lg:block lg:w-1/4">
            <ToyFilterList className="mt-10" />
          </div>
          <Slider isOpen={isFilterOpen} onClose={() => setFilterOpen(false)}>
            <ToyFilterList />
          </Slider>
          <section className="flex-1">
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
              resultsPerPage={resultsPerPage}
              onResultsPerPageChange={handleResultsPerPageChange}
              totalResults={totalResults}
            />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-6">
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
    </div>
  );
}

export default ToyList;
