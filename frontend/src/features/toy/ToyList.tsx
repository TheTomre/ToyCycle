/* eslint-disable no-underscore-dangle */
import { useEffect, useMemo, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { RootState } from "../../store/store";
import {
  fetchToys,
  resetToyList,
  resetToysFilter,
  setPage,
  setResultsPerPage
} from "./toySlice";
import ToyCard from "./ToyCard";
import Pagination from "../../components/Pagination";
import Loader from "../../components/Loader";
import ToyFilterList from "./Filter/ToyFilterList";
import Slider from "../../components/Slider";
import { Button } from "../../components/UI/button";

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

  const handlePageChange = (page: number) => {
    dispatch(setPage(page));
  };

  const handleResultsPerPageChange = (results: number) => {
    dispatch(setPage(1));
    dispatch(setResultsPerPage(results));
  };

  return (
    <>
      {loading && <Loader />}
      {error && !loading ? (
        <div className="max-w-6xl mx-auto p-6 mt-6 border-purple-50 h-[100vh]">
          <h2 className="mb-4 text-[#3a0e7b] font-mono text-xl">
            No toys found, please try again.
          </h2>
          <Button
            variant="outline"
            className="border-[#3a0e7b] text-[#3a0e7b] hover:bg-[#3a0e7b] hover:text-white transition duration-300"
            onClick={() => dispatch(resetToyList())}
          >
            Reset filters
          </Button>
        </div>
      ) : (
        <div className="min-h-screen py-5 bg-purple-50">
          <div className="container mx-auto px-4 sm:px-10">
            <div className="flex justify-between items-center">
              <button
                className="lg:hidden bg-[#3a0e7b] text-white px-4 py-2 rounded-lg"
                onClick={() => setFilterOpen(true)}
              >
                Filters
              </button>
            </div>
            <section className="flex flex-col lg:flex-row gap-5">
              <Slider
                isOpen={isFilterOpen}
                onClose={() => setFilterOpen(false)}
              >
                <ToyFilterList />
                <Button
                  variant="link"
                  onClick={() => dispatch(resetToysFilter())}
                  className="px-2  text-[#3a0e7b] uppercase font-bold font-mono tracking-tight"
                >
                  Clear filters
                </Button>
              </Slider>

              <div className="hidden lg:block lg:w-1/4 mt-[75px]">
                <Button
                  variant="link"
                  onClick={() => dispatch(resetToysFilter())}
                  className="px-2  text-[#3a0e7b] uppercase font-bold font-mono "
                >
                  Clear filters
                </Button>
                <ToyFilterList />
              </div>

              <section className="flex-1 min-h-[100vh]">
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={handlePageChange}
                  resultsPerPage={resultsPerPage}
                  onResultsPerPageChange={handleResultsPerPageChange}
                  totalResults={totalResults}
                />
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-6 justify-items-center">
                  {toys.map(toy => (
                    <ToyCard
                      key={toy._id}
                      id={toy._id}
                      name={toy.name}
                      description={toy.description}
                      images={
                        toy.images.length > 0 ? toy.images : ["../bear.webp"]
                      }
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
      )}
    </>
  );
}

export default ToyList;
