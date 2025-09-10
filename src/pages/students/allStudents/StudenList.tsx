import { useSelector, useDispatch } from "react-redux";
import { FaUser, FaSearch } from "react-icons/fa";
import { AppDispatch, RootState } from "../../../redux/store";
import { getAllUsers } from "../../../redux/slices/users";
import { useNavigate } from "react-router";
// import FilterDropdown from "../components/FilterDropdown";
import { useState, useEffect } from "react";
import Pagination from "../../../utils/Pagination";
import { format } from 'date-fns';

const StudentList = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const [limit] = useState(10);
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState<{ role?: string }>({ role: "user" });


  const { users, loading, error, pagination } = useSelector(
    (state: RootState) => state.user
  );

  const fetchUsers = (
    page = currentPage,
    appliedFilters = filters,
    appliedSearch = searchTerm
  ) => {
    setCurrentPage(page);

    // always force role=user
    const query = new URLSearchParams({
      role: "user",
      ...appliedFilters,
      search: appliedSearch,
      page: String(page),
      limit: String(limit),
    }).toString();

    dispatch(getAllUsers(query));
  };


  useEffect(() => {
    fetchUsers(1, filters, searchTerm);
  }, []);



  const handleSearch = () => {
    setCurrentPage(1);
    fetchUsers(1, filters, searchTerm);
  };

  //   const handleApplyFilters = (appliedFilters: { role?: string }) => {
  //     const validFilters = Object.fromEntries(
  //       Object.entries(appliedFilters).filter(([, value]) => value)
  //     );

  //     setFilters(validFilters);
  //     setCurrentPage(1);
  //     fetchUsers(1, validFilters, searchTerm);
  //   };

  const handleReload = () => {
    setSearchTerm("");
    setFilters({ role: "user" });
    setCurrentPage(1);
    fetchUsers(1, { role: "user" }, "");
  };

  const clickHandler = (id: string) => {
    navigate(`/admin/student/${id}`);
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
          Students
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

          {/* <FilterDropdown onApply={handleApplyFilters} onCancel={handleReload} /> */}
        </div>
      </div>


      {error && <p className="text-red-500">{error}</p>}

      {!loading && !error && users.length === 0 && (
        <div className="flex flex-col items-center justify-center">
          <p className="text-gray-500 mb-4">No User found.</p>
          <button
            onClick={handleReload}
            className="px-4 py-2 bg-black text-white dark:bg-gray-300 dark:text-gray-700 rounded-lg shadow transition"
          >
            Reload
          </button>
        </div>
      )}

      {!loading && !error && users.length > 0 && (
        <div className="w-full overflow-x-auto border rounded-lg dark:border-gray-700">
          <table className="min-w-full text-left border-collapse">
            <thead className="bg-gray-100 dark:bg-gray-700">
              <tr className="text-sm font-medium text-gray-700 dark:text-gray-300">
                <th className="p-4 whitespace-nowrap">User</th>
                <th className="p-4 whitespace-nowrap">Name</th>
                <th className="p-4 whitespace-nowrap">Email</th>
                <th className="p-4 whitespace-nowrap">Role</th>
                <th className="p-4 whitespace-nowrap">Mobile</th>
                <th className="p-4 whitespace-nowrap">Created at</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr
                  key={user._id}
                  onClick={() => clickHandler(user._id)}
                  className="border-t cursor-pointer dark:border-gray-700 hover:bg-gray-100 bg-white dark:bg-gray-800 transition-colors"
                >
                  <td className="p-4" >
                    <div className="flex-shrink-0 h-10 w-10 flex items-center cursor-pointer justify-center bg-brand-100 dark:bg-brand-500 rounded-full">
                      <FaUser className="text-brand-500 dark:text-white " />
                    </div>
                  </td>
                  <td className="p-4 text-gray-800 dark:text-gray-100">{user.name}</td>
                  <td className="p-4 text-gray-700 dark:text-gray-200">{user.email}</td>
                  <td className="p-4 capitalize text-gray-700 dark:text-gray-300">{user.role}</td>
                  <td className="p-4 capitalize text-gray-700 dark:text-gray-300">{user.mobileNumber}</td>
                  <td className="p-4 capitalize text-gray-700 dark:text-gray-300">{user.createdAt ? format(new Date(user.createdAt), 'MMM dd, yyyy') : 'N/A'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {pagination?.total >= 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={pagination.total}
          onPageChange={(page) => fetchUsers(page, filters, searchTerm)}
        />
      )}
    </div>
  );
};

export default StudentList;
