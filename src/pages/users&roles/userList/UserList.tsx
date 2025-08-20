import { useSelector, useDispatch } from "react-redux";
import { FaUser, FaSearch } from "react-icons/fa";
import { AppDispatch, RootState } from "../../../redux/store";
import { deleteUser, getAllUsers } from "../../../redux/slices/users";
import { FiEdit, FiTrash2 } from "react-icons/fi";
import { useNavigate } from "react-router";
import FilterDropdown from "../components/FilterDropdown";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import Pagination from "../../../utils/Pagination";

const UserList = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const [limit] = useState(10);
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState<{ role?: string }>({});

  const { users, loading, error, pagination } = useSelector(
    (state: RootState) => state.user
  );

  const fetchUsers = (
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

    dispatch(getAllUsers(query));
  };

  useEffect(() => {
    fetchUsers(1, filters, searchTerm);
  }, []);

  const handleDelete = async (id: string) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this user?");
    if (confirmDelete) {
      const resultAction = await dispatch(deleteUser(id));
      if (deleteUser.fulfilled.match(resultAction)) {
        toast.success("User deleted successfully");
        fetchUsers(currentPage, filters, searchTerm);
      }
    }
  };

  const handleEdit = (id: string) => {
    navigate(`/admin/users/edit/${id}`);
  };

  const handleSearch = () => {
    setCurrentPage(1);
    fetchUsers(1, filters, searchTerm);
  };

  const handleApplyFilters = (appliedFilters: { role?: string }) => {
    const validFilters = Object.fromEntries(
      Object.entries(appliedFilters).filter(([, value]) => value)
    );

    setFilters(validFilters);
    setCurrentPage(1);
    fetchUsers(1, validFilters, searchTerm);
  };

  const handleReload = () => {
    setSearchTerm("");
    setFilters({});
    setCurrentPage(1);
    fetchUsers(1, {}, "");
  };

  return (
    <div className="p-4 sm:p-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
          Users
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

      {loading && <p className="text-gray-700 dark:text-gray-200">Loading users...</p>}
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
                <th className="p-4 whitespace-nowrap">Edit</th>
                <th className="p-4 whitespace-nowrap">Delete</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr
                  key={user._id}
                  className="border-t dark:border-gray-700 bg-white dark:bg-gray-800 transition-colors"
                >
                  <td className="p-4">
                    <div className="flex-shrink-0 h-10 w-10 flex items-center justify-center bg-brand-100 dark:bg-brand-500 rounded-full">
                      <FaUser className="text-brand-500 dark:text-white" />
                    </div>
                  </td>
                  <td className="p-4 text-gray-800 dark:text-gray-100">{user.name}</td>
                  <td className="p-4 text-gray-700 dark:text-gray-200">{user.email}</td>
                  <td className="p-4 capitalize text-gray-700 dark:text-gray-300">{user.role}</td>
                  <td className="p-4">
                    <FiEdit
                      className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 cursor-pointer"
                      onClick={() => handleEdit(user._id)}
                    />
                  </td>
                  <td className="p-4">
                    <FiTrash2
                      className="text-red-600 dark:text-red-400 hover:text-red-800 dark:hover:text-red-300 cursor-pointer"
                      onClick={() => handleDelete(user._id)}
                    />
                  </td>
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

export default UserList;
