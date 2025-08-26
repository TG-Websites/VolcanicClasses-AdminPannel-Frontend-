import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteAnnouncement, getAllAnnouncement } from '../../../redux/slices/announcement';
import { AppDispatch, RootState } from '../../../redux/store';
import { FiEdit, FiTrash2 } from 'react-icons/fi';
import { format } from 'date-fns';
import { useNavigate } from 'react-router';
import FilterDropdown from "../components/FilterDropdown";
import toast from 'react-hot-toast';
import Pagination from '../../../utils/Pagination';
import { FaSearch } from 'react-icons/fa';
import { IoReload } from 'react-icons/io5';

const Announcements = () => {
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();
    const [currentPage, setCurrentPage] = useState(1);
    const [limit] = useState(10); // fixed
    const { announcements, error, pagination,loading } = useSelector(
        (state: RootState) => state.announcement
    );

    const [filters, setFilters] = useState<{ startDate?: string; endDate?: string }>({});
    const [expandedIds, setExpandedIds] = useState<string[]>([]);
    const [searchTerm, setSearchTerm] = useState("");

    const fetchAnnouncement = (page = currentPage, appliedFilters = filters, appliedSearch = searchTerm) => {
        setCurrentPage(page);


        const query = new URLSearchParams({
            ...appliedFilters,
            search: appliedSearch,
            page: String(page),
            limit: String(limit),
        }).toString();

        dispatch(getAllAnnouncement(query));
    };

    // ✅ Initial fetch
    useEffect(() => {
        fetchAnnouncement(currentPage, filters);
    }, []);

    const toggleExpand = (id: string) => {
        setExpandedIds((prev) =>
            prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
        );
    };

    const handleDelete = async (id: string) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this announcement?");
        if (confirmDelete) {
            const resultAction = await dispatch(deleteAnnouncement(id));
            if (deleteAnnouncement.fulfilled.match(resultAction)) {
                toast.success("Announcement Delete Successfully")
                dispatch(getAllAnnouncement());
            }
        }
    }

    const handleEdit = (id: string) => {
        navigate(`/announcements/edit/${id}`)
    }


    const handleSearch = () => {
        setCurrentPage(1);
        fetchAnnouncement(1, filters, searchTerm);
    };



    const handleApplyFilters = (appliedFilters: { startDate?: string; endDate?: string; }) => {
        const validFilters = Object.fromEntries(
            Object.entries(appliedFilters).filter(([, value]) => value)
        );
        setFilters(validFilters);
        setCurrentPage(1);
        fetchAnnouncement(1, validFilters, searchTerm);
    };

     const handleReload = () => {
        setFilters({});
        setSearchTerm("");
        setCurrentPage(1);
        fetchAnnouncement(1, {}, "");
    };

     if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-brand-500"></div>
      </div>
    );
  }


    const renderTableContent = () => {
        return announcements.length > 0 ? (
            announcements.map((a, index) => {
                const isExpanded = expandedIds.includes(a._id);
                const shortContent = a.content.slice(0, 100);

                return (
                    <tr
                        key={a._id}
                        className={`border-b ${index % 2 === 0 ? 'bg-white dark:bg-gray-800' : 'bg-white dark:bg-gray-800'} hover:bg-gray-100 dark:hover:bg-gray-600`}
                    >
                        <td className="py-3 px-4 sm:px-6 font-medium text-gray-900 dark:text-white">{a.title}</td>
                        <td className="py-3 px-4 sm:px-6 text-gray-700 dark:text-gray-300">
                            {isExpanded ? a.content : `${shortContent}...`}
                            {a.content.length > 100 && (
                                <button
                                    onClick={() => toggleExpand(a._id)}
                                    className="ml-2 text-brand-600 dark:text-brand-400 underline text-xs"
                                >
                                    {isExpanded ? 'Show Less' : 'Show More'}
                                </button>
                            )}
                        </td>
                        <td className="py-3 px-4 sm:px-6 text-sm text-gray-500 dark:text-gray-300">
                            {a.createdAt ? format(new Date(a.createdAt), 'MMM dd, yyyy') : 'N/A'}
                        </td>
                        <td className="py-3 px-4 sm:px-6 text-center">
                            <button
                                onClick={() => handleEdit(a._id)}
                                className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 p-1"
                            >
                                <FiEdit className="w-4 h-4 sm:w-5 sm:h-5" />
                            </button>
                        </td>
                        <td className="py-3 px-4 sm:px-6 text-center">
                            <button
                                onClick={() => handleDelete(a._id)}
                                className="text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300 p-1"
                            >
                                <FiTrash2 className="w-4 h-4 sm:w-5 sm:h-5" />
                            </button>
                        </td>
                    </tr>
                );
            })
        ) : (
            <tr>
                <td colSpan={6} className="text-center py-6 text-gray-500 dark:text-gray-400">
                    <div className="flex flex-col items-center gap-3">
                        <span className="text-gray-600 dark:text-gray-300"> No announcements found!</span>
                        <button
                            onClick={handleReload}
                            className="flex items-center gap-2 px-3 py-1 rounded-lg bg-black text-white  dark:text-gray-700 dark:bg-gray-200 dark:text-black dark:hover:bg-gray-300 transition-colors">
                            <IoReload className="text-sm" />
                            Reload
                        </button>
                    </div>

                </td>
            </tr>
        );
    };

    return (
        <div className="max-w-6xl mx-auto py-4 sm:py-8 px-2 sm:px-4">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
                <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
                    📢 Announcements
                </h1>

                <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 w-full sm:w-auto">
                    {/* ✅ Search Input */}
                    <div className="flex items-center border rounded-lg overflow-hidden w-full max-w-md">
                        <input
                            type="text"
                            placeholder="Search Title,desc..."
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

                    <FilterDropdown onApply={handleApplyFilters} onCancel={handleReload}  />
                </div>
            </div>

            {error && (
                <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-3 sm:p-4 mb-4 sm:mb-6 rounded text-sm sm:text-base dark:bg-red-900 dark:border-red-700 dark:text-red-100">
                    <p>{error}</p>
                </div>
            )}

            <div className="overflow-x-auto bg-white shadow-md rounded-lg dark:bg-gray-800">
                {/* Table for medium+ screens */}
                <table className="hidden sm:table min-w-full text-left text-sm">
                    <thead className="bg-gray-100 font-semibold text-gray-700 dark:bg-gray-700 dark:text-gray-300">
                        <tr>
                            <th className="py-3 px-4 sm:px-6">Title</th>
                            <th className="py-3 px-4 sm:px-6">Content</th>
                            <th className="py-3 px-4 sm:px-6">Date</th>
                            <th className="py-3 px-4 sm:px-6 text-center">Edit</th>
                            <th className="py-3 px-4 sm:px-6 text-center">Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {renderTableContent()}
                    </tbody>
                </table>

                {/* Cards for small screens */}
                <div className="sm:hidden space-y-2 p-2">
                    {announcements.length > 0 ? (
                        announcements.map((a) => {
                            const isExpanded = expandedIds.includes(a._id);
                            const shortContent = a.content.slice(0, 60);

                            return (
                                <div key={a._id} className="border rounded-lg p-3 hover:bg-gray-50 dark:border-gray-600 dark:hover:bg-gray-700">
                                    <div className="flex justify-between items-start">
                                        <h3 className="font-medium text-gray-800 dark:text-white">{a.title}</h3>
                                        <div className="flex gap-2">
                                            <button
                                                onClick={() => handleEdit(a._id)}
                                                className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 p-1"
                                            >
                                                <FiEdit className="w-4 h-4" />
                                            </button>
                                            <button
                                                onClick={() => handleDelete(a._id)}
                                                className="text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300 p-1"
                                            >
                                                <FiTrash2 className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </div>

                                    <div className="mt-2 text-sm text-gray-600 dark:text-gray-300">
                                        {isExpanded ? a.content : `${shortContent}...`}
                                        {a.content.length > 60 && (
                                            <button
                                                onClick={() => toggleExpand(a._id)}
                                                className="ml-2 text-brand-600 dark:text-brand-400 underline text-xs"
                                            >
                                                {isExpanded ? 'Show Less' : 'Show More'}
                                            </button>
                                        )}
                                    </div>

                                    <div className="mt-2 text-xs text-gray-500 dark:text-gray-400">
                                        {a.createdAt ? format(new Date(a.createdAt), 'MMM dd, yyyy') : 'N/A'}
                                    </div>
                                </div>
                            );
                        })
                    ) : (
                        <div className="text-center py-4 text-gray-500 dark:text-gray-400">
                            No announcements found.
                        </div>
                    )}
                </div>
            </div>
            {pagination?.total >= 1 && (
                <Pagination
                    currentPage={currentPage}
                    totalPages={pagination.total}
                    onPageChange={(page) => fetchAnnouncement(page)} // keeps filters applied
                />
            )}
        </div>
    );
};

export default Announcements;