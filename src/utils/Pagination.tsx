// components/Pagination.tsx
import React from "react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  return (
    <div className="flex  space-x-1 mt-4 flex-wrap">
      {/* Previous */}
      <button
        className="px-2 sm:px-3 py-1 border rounded-full text-brand-500 border-brand-500 hover:bg-brand-50 disabled:opacity-40 text-xs sm:text-sm md:text-base"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        Previous
      </button>

      {/* All page numbers */}
      {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
        <button
          key={page}
          className={`px-2 sm:px-3 py-1 border rounded-md text-xs sm:text-sm md:text-base ${
            page === currentPage
              ? "bg-gray-100 text-brand-500 font-semibold"
              : "hover:bg-brand-50 text-gray-700"
          }`}
          onClick={() => onPageChange(page)}
        >
          {page}
        </button>
      ))}

      {/* Next */}
      <button
        className="px-2 sm:px-3 py-1 border rounded-full text-brand-500 border-brand-500 hover:bg-brand-50 disabled:opacity-50 text-xs sm:text-sm md:text-base"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
