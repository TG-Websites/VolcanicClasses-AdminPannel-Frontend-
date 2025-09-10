import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { AppDispatch, RootState } from "../../../redux/store";
import { getAllPayments } from "../../../redux/slices/payment";
import FilterDropdown from "../components/FilterDropdown";
import Pagination from "../../../utils/Pagination";
import { FaSearch } from "react-icons/fa";
import { IoReload } from "react-icons/io5";
import { useLocation, useNavigate } from "react-router-dom";

const AllPayments = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const location = useLocation();

  const { payments, loading, error, pagination } = useSelector(
    (state: RootState) => state.payment
  );

  const [currentPage, setCurrentPage] = useState(1);
  const [limit] = useState(10); // fixed
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState<{
    status?: string;
    method?: string;
    startDate?: string;
    endDate?: string;
  }>({});

  // ✅ Common fetch function (always includes filters + page)
  const fetchPayments = (
    page = currentPage,
    appliedFilters = filters,
    appliedSearch = searchTerm
  ) => {
    setCurrentPage(page);

    const queryParams = new URLSearchParams({
      search: appliedSearch,
      page: String(page),
      limit: String(limit),
    });

    if (appliedFilters.status) {
        queryParams.set('status', appliedFilters.status);
    }
    if (appliedFilters.method) {
        queryParams.set('method', appliedFilters.method);
    }
    if (appliedFilters.startDate) {
        queryParams.set('startDate', appliedFilters.startDate);
    }
    if (appliedFilters.endDate) {
        queryParams.set('endDate', appliedFilters.endDate);
    }

    dispatch(getAllPayments(queryParams.toString()));
  };

  // ✅ Initial fetch
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const status = params.get('status') || undefined;
    const method = params.get('method') || undefined;
    const startDate = params.get('startDate') || undefined;
    const endDate = params.get('endDate') || undefined;
    const search = params.get('search') || '';
    const page = parseInt(params.get('page') || '1', 10);

    const initialFilters = { status, method, startDate, endDate };
    setFilters(initialFilters);
    setSearchTerm(search);
    setCurrentPage(page);

    fetchPayments(page, initialFilters, search);
  }, [location.search, dispatch]);

  const handleSearch = () => {
    setCurrentPage(1); // Reset to first page when search changes
    updateURL(1, filters, searchTerm);
  };

  const handleApplyFilters = (appliedFilters: {
    status?: string;
    method?: string;
    startDate?: string;
    endDate?: string;
  }) => {
    const validFilters = Object.fromEntries(
      Object.entries(appliedFilters).filter(([, value]) => value)
    );

    setFilters(validFilters);
    setCurrentPage(1); // Reset to first page when filters change
    updateURL(1, validFilters, searchTerm);
  };

  const handleReload = () => {
    setFilters({});
    setSearchTerm("");
    setCurrentPage(1);
    updateURL(1, {}, "");
  };

  const updateURL = (page: number, appliedFilters: { status?: string; method?: string; startDate?: string; endDate?: string; }, appliedSearch: string) => {
    const queryParams = new URLSearchParams();
    if (appliedFilters.status) queryParams.set('status', appliedFilters.status);
    if (appliedFilters.method) queryParams.set('method', appliedFilters.method);
    if (appliedFilters.startDate) queryParams.set('startDate', appliedFilters.startDate);
    if (appliedFilters.endDate) queryParams.set('endDate', appliedFilters.endDate);
    if (appliedSearch) queryParams.set('search', appliedSearch);
    queryParams.set('page', String(page));
    navigate(`${location.pathname}?${queryParams.toString()}`);
  };

  const clickHandler = (id: string) => {
    navigate(`/order/${id}`);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-brand-500"></div>
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
          Payments
        </h1>

        <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 w-full sm:w-auto">
          {/* Search Input */}
          <div className="flex items-center border rounded-lg overflow-hidden w-full max-w-md">
            <input
              type="text"
              placeholder="Search txn_12345"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="px-3 py-2 flex-1 min-w-0 outline-none dark:bg-gray-800 dark:text-white"
              onKeyDown={(e) => e.key === "Enter" && handleSearch()}
            />
            <button onClick={handleSearch} className="px-3 py-3 dark:text-white">
              <FaSearch />
            </button>
          </div>

          <FilterDropdown onApply={handleApplyFilters} onCancel={handleReload} />
        </div>
      </div>

      {!loading && !error && payments.length === 0 && (
        <div className="flex flex-col items-center gap-3">
          <span className="text-gray-600 dark:text-gray-300">No payments found!</span>
          <button
            onClick={handleReload}
            className="flex items-center gap-2 px-3 py-1 rounded-lg bg-black text-white dark:text-gray-700 dark:bg-gray-200 dark:text-black dark:hover:bg-gray-300 transition-colors"
          >
            <IoReload className="text-sm" />
            Reload
          </button>
        </div>
      )}

      {!loading && !error && payments.length > 0 && (
        <div className="w-full overflow-x-auto border rounded-lg dark:border-gray-700">
          <table className="min-w-full text-left border-collapse ">
            <thead className="bg-gray-100 dark:bg-gray-700">
              <tr className="text-sm font-medium text-gray-700 dark:text-gray-300">
                <th className="p-4 whitespace-nowrap">Transaction ID</th>
                <th className="p-4 whitespace-nowrap">Order ID</th>
                <th className="p-4 whitespace-nowrap">Amount </th>
                <th className="p-4 whitespace-nowrap">Method</th>
                <th className="p-4 whitespace-nowrap">Status</th>
                <th className="p-4 whitespace-nowrap">Paid Date</th>
              </tr>
            </thead>
            <tbody>
              {payments.map((payment) => (
                <tr
                  key={payment._id}
                  className="border-t dark:border-gray-700 bg-white dark:bg-gray-800 transition-colors"
                >
                  <td
                    onClick={() => clickHandler(payment.order._id)}
                    className="p-4 hover:underline text-gray-800 dark:text-gray-100 cursor-pointer">
                    {payment.transactionId}
                  </td>
                  <td className="p-4  text-gray-800 dark:text-gray-100">
                    {payment.order?.razorpayOrderId}{" "}
                  </td>
                  <td className="p-4 text-gray-700 dark:text-gray-200">{payment.amount}</td>
                  <td className="p-4 text-gray-700 dark:text-gray-300">{payment.method}</td>
                  <td className="p-4 text-gray-700 dark:text-gray-200">{payment.status}</td>
                  <td className="p-4 text-gray-700 dark:text-gray-200">
                    {payment.paidAt ? payment.paidAt.split("T")[0] : "-"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {pagination?.total >= 1 && payments.length > 0 && (
        <Pagination
          currentPage={currentPage}
          totalPages={pagination.total}
          onPageChange={(page) => updateURL(page, filters, searchTerm)}
        />
      )}
    </div>
  );
};

export default AllPayments;
