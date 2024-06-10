/* eslint-disable jsx-a11y/label-has-associated-control */
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

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

  return (
    <div className="flex flex-col items-center mt-4 space-y-2 pb-4">
      <span className="text-gray-700">{`${start}-${end} of ${totalResults}`}</span>
      <div className="flex items-center space-x-2">
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className={`flex items-center justify-center w-8 h-8 text-white transition-all duration-300 ${currentPage === 1 ? "bg-gray-200 cursor-not-allowed" : "bg-purple-500 hover:bg-purple-600"}`}
          aria-label="Previous Page"
        >
          <FaArrowLeft />
        </button>
        {pages.map(page => (
          <button
            key={page}
            onClick={() => onPageChange(page)}
            disabled={page === currentPage}
            className={`flex items-center justify-center w-8 h-8 text-white transition-all duration-300 ${page === currentPage ? "bg-[#70e2d2]" : "bg-purple-500 hover:bg-purple-600"}`}
            aria-label={`Page ${page}`}
          >
            {page}
          </button>
        ))}
        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className={`flex items-center justify-center w-8 h-8 text-white transition-all duration-300 ${currentPage === totalPages ? "bg-gray-200 cursor-not-allowed" : "bg-purple-500 hover:bg-purple-600"}`}
          aria-label="Next Page"
        >
          <FaArrowRight />
        </button>
      </div>
      <div className="flex items-center space-x-2">
        <label htmlFor="resultsPerPage" className="text-gray-700">
          Results per page
        </label>
        <select
          id="resultsPerPage"
          value={resultsPerPage}
          onChange={e => onResultsPerPageChange(Number(e.target.value))}
          className="border border-gray-300 rounded-md p-1"
        >
          <option value={10}>10</option>
          <option value={20}>20</option>
          <option value={50}>50</option>
          <option value={100}>100</option>
        </select>
      </div>
    </div>
  );
}

export default Pagination;
