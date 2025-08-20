import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../../redux/store'; // adjust path if needed
import { getAllInQuiries } from '../../../redux/slices/admission';
import InquiriesList from './InquiriesList';
import FilterDropdown from '../components/FilterDropdown';
import Pagination from '../../../utils/Pagination';
import { FaSearch } from 'react-icons/fa';

const EnquiriesPage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [currentPage, setCurrentPage] = useState(1);
  const [limit] = useState(10); // keep limit fixed
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState<{ status?: string; courseInterest?: string ; startDate?: string; endDate?: string }>({});

  const { inquiries, loading, error, pagination } = useSelector(
    (state: RootState) => state.admission
  );

   const fetchInquiries = (page = currentPage, appliedFilters = filters, appliedSearch = searchTerm) => {
          setCurrentPage(page);
  
          const query = new URLSearchParams({
              ...appliedFilters,
              search: appliedSearch,

              page: String(page),
              limit: String(limit),
          }).toString();
  
          dispatch(getAllInQuiries(query));
      };

    useEffect(() => {
        fetchInquiries(1, filters, searchTerm); // ✅ always start fresh
    }, []);


   const handleApplyFilters = (appliedFilters: { status?: string; courseInterest?: string ; startDate?: string; endDate?: string }) => {
        const validFilters = Object.fromEntries(
            Object.entries(appliedFilters).filter(([, value]) => value)
        );

        setFilters(validFilters);
        setCurrentPage(1); // ✅ Reset to first page when filters change
        fetchInquiries(1, validFilters, searchTerm);
    };

    const handleSearch = () => {
        setCurrentPage(1); // ✅ Reset to first page when search changes
        fetchInquiries(1, filters, searchTerm);
    };

    const handleReload = () => {
        setFilters({});
        setSearchTerm("");
        setCurrentPage(1);
        fetchInquiries(1, {}, "");
    };


  return (
    <div className="p-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
          Inquiries
        </h1>

        <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 w-full sm:w-auto">
          {/* ✅ Search Input */}
          <div className="flex items-center border rounded-lg overflow-hidden w-full max-w-md">
            <input
              type="text"
              placeholder="Search student name..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="px-3 py-2 flex-1 min-w-0 outline-none dark:bg-gray-800 dark:text-white"
              onKeyDown={(e) => e.key === "Enter" && handleSearch()}
            />
            <button
              onClick={handleSearch}
              className="px-3 py-3 dark:text-white"
            >
              <FaSearch />
            </button>
          </div>


          <FilterDropdown onApply={handleApplyFilters} />
        </div>
      </div>

      {/* ✅ Inquiries Display */}
      {loading && <p>Loading inquiries...</p>}
      {error && <p className="text-red-500">Error: {error}</p>}
      {!loading && inquiries.length === 0 && (
        <div className="flex flex-col items-center justify-center ">
          <p className="text-gray-500 mb-4">No inquiries found.</p>
          <button
            onClick={handleReload}
            className="px-4 py-2 bg-black text-white dark:bg-gray-300 dark:text-gray-700 rounded-lg shadow  transition"
          >
            Reload
          </button>
        </div>

      )}
      {!loading && inquiries.length > 0 && (
        <InquiriesList inquiries={inquiries} />
      )}

      {/* ✅ Pagination */}
      {pagination?.total >= 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={pagination.total}
          onPageChange={(page) => fetchInquiries(page)}
        />
      )}
    </div>
  );
};

export default EnquiriesPage;
