import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../../redux/store'; // adjust path if needed
import { getAllInQuiries } from '../../../redux/slices/admission';
import InquiriesList from './InquiriesList';
import FilterDropdown from '../components/FilterDropdown';
import Pagination from '../../../utils/Pagination';
import { FaSearch } from 'react-icons/fa';
import { useLocation, useNavigate } from 'react-router-dom';

const EnquiriesPage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const location = useLocation();
  const [currentPage, setCurrentPage] = useState(1);
  const [limit] = useState(10); // keep limit fixed
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState<{ status?: string; courseInterest?: string; startDate?: string; endDate?: string }>({});

  const { inquiries, loading, error, pagination } = useSelector(
    (state: RootState) => state.admission
  );

  const fetchInquiries = (page = currentPage, appliedFilters = filters, appliedSearch = searchTerm) => {
    setCurrentPage(page);

    const queryParams = new URLSearchParams({
      search: appliedSearch,
      page: String(page),
      limit: String(limit),
    });

    if (appliedFilters.status) {
        queryParams.set('status', appliedFilters.status);
    }
    if (appliedFilters.courseInterest) {
        queryParams.set('courseInterest', appliedFilters.courseInterest);
    }
    if (appliedFilters.startDate) {
        queryParams.set('startDate', appliedFilters.startDate);
    }
    if (appliedFilters.endDate) {
        queryParams.set('endDate', appliedFilters.endDate);
    }

    dispatch(getAllInQuiries(queryParams.toString()));
  };

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const status = params.get('status') || undefined;
    const courseInterest = params.get('courseInterest') || undefined;
    const startDate = params.get('startDate') || undefined;
    const endDate = params.get('endDate') || undefined;
    const search = params.get('search') || '';
    const page = parseInt(params.get('page') || '1', 10);

    const initialFilters = { status, courseInterest, startDate, endDate };
    setFilters(initialFilters);
    setSearchTerm(search);
    setCurrentPage(page);

    fetchInquiries(page, initialFilters, search);
  }, [location.search, dispatch]);


  const handleApplyFilters = (appliedFilters: { status?: string; courseInterest?: string; startDate?: string; endDate?: string }) => {
    const validFilters = Object.fromEntries(
      Object.entries(appliedFilters).filter(([, value]) => value)
    );

    setFilters(validFilters);
    setCurrentPage(1); // ✅ Reset to first page when filters change
    updateURL(1, validFilters, searchTerm);
  };

  const handleSearch = () => {
    setCurrentPage(1); // ✅ Reset to first page when search changes
    updateURL(1, filters, searchTerm);
  };

  const handleReload = () => {
    setFilters({});
    setSearchTerm("");
    setCurrentPage(1);
    updateURL(1, {}, "");
  };

  const updateURL = (page: number, appliedFilters: { status?: string; courseInterest?: string; startDate?: string; endDate?: string }, appliedSearch: string) => {
    const queryParams = new URLSearchParams();
    if (appliedFilters.status) queryParams.set('status', appliedFilters.status);
    if (appliedFilters.courseInterest) queryParams.set('courseInterest', appliedFilters.courseInterest);
    if (appliedFilters.startDate) queryParams.set('startDate', appliedFilters.startDate);
    if (appliedFilters.endDate) queryParams.set('endDate', appliedFilters.endDate);
    if (appliedSearch) queryParams.set('search', appliedSearch);
    queryParams.set('page', String(page));
    navigate(`${location.pathname}?${queryParams.toString()}`);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-brand-500"></div>
      </div>
    );
  }

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


          <FilterDropdown onApply={handleApplyFilters} onCancel={handleReload} />
        </div>
      </div>

      {/* ✅ Inquiries Display */}
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
          onPageChange={(page) => updateURL(page, filters, searchTerm)}
        />
      )}
    </div>
  );
};

export default EnquiriesPage;
