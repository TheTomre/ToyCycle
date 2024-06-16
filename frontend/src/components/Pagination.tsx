import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { useAppDispatch, useAppSelector } from "../hooks/redux";
import { setSort } from "../features/toy/toySlice";

import { LIMITS_PER_PAGE, SORT_RESULTS } from "../lib/consts";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  resultsPerPage: number;
  onResultsPerPageChange: (results: number) => void;
  totalResults: number;
}

function Pagination({
  currentPage,
  totalPages,
  onPageChange,
  resultsPerPage,
  onResultsPerPageChange,
  totalResults
}: PaginationProps) {
  const pages = [...Array(totalPages).keys()].map(num => num + 1);
  const start = (currentPage - 1) * resultsPerPage + 1;
  const end = Math.min(currentPage * resultsPerPage, totalResults);
  const dispatch = useAppDispatch();

  const { sort } = useAppSelector(state => state.toys);

  return (
    <div className="flex flex-col items-center mt-4 space-y-6 pb-4">
      <div className="flex items-center relative gap-2 self-end">
        <span className="text-gray-700 text-sm">{`${start}-${end} of ${totalResults}`}</span>
        <div className="flex items-center space-x-2">
          <label
            htmlFor="resultsPerPage"
            className="text-gray-700 text-sm flex items-center"
          >
            <span className="hidden sm:block">Results per page</span>
            <select
              name="resultsPerPage"
              disabled={totalResults <= 10}
              id="resultsPerPage"
              value={resultsPerPage}
              onChange={e => onResultsPerPageChange(Number(e.target.value))}
              className="border-0 rounded-md p-1 text-gray-700 text-sm ml-1 focus-visible:outline-0  focus-visible:ring-1 focus-visible:ring-gray-300"
            >
              {LIMITS_PER_PAGE.map(limit => (
                <option key={limit} value={limit}>
                  {limit}
                </option>
              ))}
            </select>
          </label>
          <label htmlFor="sort" className="text-gray-700 text-sm">
            <select
              name="sort"
              disabled={totalResults <= 1}
              id="sort"
              value={sort}
              onChange={e => dispatch(setSort(e.target.value))}
              className="border-0 rounded-md p-1 text-gray-700 text-sm ml-1 focus-visible:outline-0  focus-visible:ring-1 focus-visible:ring-gray-300"
            >
              {Object.entries(SORT_RESULTS).map(sortEl => (
                <option key={sortEl[0]} value={sortEl[0]}>
                  {sortEl[1]}
                </option>
              ))}
            </select>
          </label>
        </div>
      </div>

      <div className="flex items-center space-x-2 ">
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className={`flex items-center justify-center w-8 h-8 text-white transition-all duration-300 ${currentPage === 1 ? "bg-gray-200 cursor-not-allowed" : "bg-[#3a0e7b] hover:bg-[#280b5f]"}`}
          aria-label="Previous Page"
        >
          <FaArrowLeft />
        </button>
        {pages.map(page => (
          <button
            key={page}
            onClick={() => onPageChange(page)}
            disabled={page === currentPage}
            className={`flex items-center justify-center w-8 h-8  transition-all duration-300 ${page === currentPage ? "bg-[#70e2d2] text-[#280b5f] font-bold w-9 h-9 " : "bg-[#3a0e7b] hover:bg-[#280b5f] text-white "}`}
            aria-label={`Page ${page}`}
          >
            {page}
          </button>
        ))}
        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className={`flex items-center justify-center w-8 h-8 text-white transition-all duration-300 ${currentPage === totalPages ? "bg-gray-200 cursor-not-allowed" : "bg-[#3a0e7b] hover:bg-[#280b5f]"}`}
          aria-label="Next Page"
        >
          <FaArrowRight />
        </button>
      </div>
    </div>
  );
}

export default Pagination;
