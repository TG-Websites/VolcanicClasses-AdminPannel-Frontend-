import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { AppDispatch, RootState } from "../../../redux/store";
import { getAllOrders } from "../../../redux/slices/order";
import { FaSearch, FaUser } from "react-icons/fa";
import { useNavigate } from "react-router";
import FilterDropdown from "../components/FilterDropdown";
import Pagination from "../../../utils/Pagination";

const AllOrders = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const [currentPage, setCurrentPage] = useState(1);
  const [limit] = useState(10); // fixed page size
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState<{ paymentStatus?: string; course?: string; startDate?: string; endDate?: string; }>({});

  const { orders, loading, error, pagination } = useSelector(
    (state: RootState) => state.order
  );

  // ✅ Fetch Orders (with pagination + filters + search)
  const fetchOrders = (
    page = currentPage,
    appliedFilters = filters,
    appliedSearch = searchTerm
  ) => {
    setCurrentPage(page);

    const query = new URLSearchParams({
      ...appliedFilters,
      search: appliedSearch,
      page: String(page),
      limit: String(limit),
    }).toString();

    dispatch(getAllOrders(query));
  };

  useEffect(() => {
    fetchOrders(1, filters, searchTerm); // ✅ always load from page 1 initially
  }, []);

  // ✅ Apply Filters → Reset to page 1
  const handleApplyFilters = (appliedFilters: { paymentStatus?: string; course?: string; startDate?: string; endDate?: string; }) => {
    const validFilters = Object.fromEntries(
      Object.entries(appliedFilters).filter(([, value]) => value)
    );
    setFilters(validFilters);
    setCurrentPage(1);
    fetchOrders(1, validFilters, searchTerm);
  };

  // ✅ Search → Reset to page 1
  const handleSearch = () => {
    setCurrentPage(1);
    fetchOrders(1, filters, searchTerm);
  };

  // ✅ Reload → Clear filters + search
  const handleReload = () => {
    setSearchTerm("");
    setFilters({});
    setCurrentPage(1);
    fetchOrders(1, {}, "");
  };

  // ✅ Navigate to Order Details
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
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
          Orders
        </h1>

        <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 w-full sm:w-auto">
          {/* ✅ Search Input */}
          <div className="flex items-center border rounded-lg overflow-hidden w-full max-w-md">
            <input
              type="text"
              placeholder="Search name,email..."
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

      {/*Error States */}

      {error && <p className="text-red-500">{error}</p>}

      {/* No Orders Found */}
      {!loading && !error && orders.length === 0 && (
        <div className="flex flex-col items-center justify-center">
          <p className="text-gray-500 mb-4">No Orders found.</p>
          <button
            onClick={handleReload}
            className="px-4 py-2 bg-black text-white dark:bg-gray-300 dark:text-gray-700 rounded-lg shadow transition"
          >
            Reload
          </button>
        </div>
      )}

      {/* Orders Table */}
      {!loading && !error && orders.length > 0 && (
        <div className="w-full overflow-x-auto border rounded-lg dark:border-gray-700">
          <table className="min-w-full text-left border-collapse">
            <thead className="bg-gray-100 dark:bg-gray-700">
              <tr className="text-sm font-medium text-gray-700 dark:text-gray-300">
                <th className="p-4 whitespace-nowrap">Student Name</th>
                <th className="p-4 whitespace-nowrap">Course</th>
                <th className="p-4 whitespace-nowrap">Mobile</th>
                <th className="p-4 whitespace-nowrap">Email</th>
                <th className="p-4 whitespace-nowrap">Payment Status</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr
                  key={order._id}
                  className="border-t dark:border-gray-700 bg-white dark:bg-gray-800 transition-colors"
                >
                  <td className="flex items-center gap-1 p-4 text-gray-800 dark:text-gray-100">
                    <div
                      onClick={() => clickHandler(order._id)}
                      className="flex-shrink-0 cursor-pointer h-8 w-8 flex items-center justify-center bg-brand-100 dark:bg-brand-500 rounded-full"
                    >
                      <FaUser className="text-brand-500 dark:text-white cursor-pointer" />
                    </div>
                    <span
                      className="cursor-pointer"
                      onClick={() => clickHandler(order._id)}
                    >
                      {order?.user?.name}
                    </span>
                  </td>
                  <td className="p-4 text-gray-800 dark:text-gray-100">
                    {order?.course?.title}
                  </td>
                  <td className="p-4 text-gray-700 dark:text-gray-200">
                    {order?.user?.mobileNumber}
                  </td>
                  <td className="p-4 text-gray-700 dark:text-gray-300">
                    {order?.user?.email}
                  </td>
                  <td className="p-4 text-gray-700 dark:text-gray-200">
                    {order?.paymentStatus}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* ✅ Pagination with filters + search */}
      {pagination?.total >= 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={pagination.total}
          onPageChange={(page) => fetchOrders(page, filters, searchTerm)}
        />
      )}
    </div>
  );
};

export default AllOrders;
