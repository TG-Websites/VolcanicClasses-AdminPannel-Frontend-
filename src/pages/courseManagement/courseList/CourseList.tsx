import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../../redux/store';
import { getAllCourses, deleteCourse } from '../../../redux/slices/course';
import FilterDropdown from './components/FilterDropdown';
import { TbPencil, TbTrash } from 'react-icons/tb';
import { FaSearch } from 'react-icons/fa';
import { useLocation, useNavigate } from 'react-router';
import toast from 'react-hot-toast';
import Pagination from '../../../utils/Pagination';
import { IoReload } from "react-icons/io5";

const CourseList = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const dispatch = useDispatch<AppDispatch>();
    const { courses, loading, pagination } = useSelector(
        (state: RootState) => state.course
    );

    const [currentPage, setCurrentPage] = useState(1);
    const [limit] = useState(10);
    const [filters, setFilters] = useState<{ category?: string; mode?: string }>({});
    const [searchTerm, setSearchTerm] = useState(""); // ✅ search state

    // ✅ Fetch courses with filters + pagination + search
    const fetchCourses = (page = currentPage, appliedFilters = filters, appliedSearch = searchTerm) => {
        setCurrentPage(page);

        const queryParams = new URLSearchParams({
            search: appliedSearch,
            page: String(page),
            limit: String(limit),
        });

        if (appliedFilters.category) {
            queryParams.set('category', appliedFilters.category);
        }

        if (appliedFilters.mode) {
            queryParams.set('mode', appliedFilters.mode);
        }

        dispatch(getAllCourses(queryParams.toString()));
    };

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const category = params.get('category') || undefined;
        const mode = params.get('mode') || undefined;
        const search = params.get('search') || '';
        const page = parseInt(params.get('page') || '1', 10);

        const initialFilters = { category, mode };
        setFilters(initialFilters);
        setSearchTerm(search);
        setCurrentPage(page);

        fetchCourses(page, initialFilters, search);
    }, [location.search]);


    const handleDelete = async (id: string) => {
        const confirmDelete = window.confirm(
            'Are you sure you want to delete this course?'
        );
        if (confirmDelete) {
            const resultAction = await dispatch(deleteCourse(id));
            if (deleteCourse.fulfilled.match(resultAction)) {
                toast.success('Course deleted successfully');
                fetchCourses(currentPage);
            }
        }
    };

    const handleApplyFilters = (appliedFilters: { category?: string; mode?: string }) => {
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

    const updateURL = (page: number, appliedFilters: { category?: string; "programs.mode"?: string }, appliedSearch: string) => {
        const queryParams = new URLSearchParams();
        if (appliedFilters.category) queryParams.set('category', appliedFilters.category);
        if (appliedFilters["programs.mode"]) queryParams.set('programs.mode', appliedFilters["programs.mode"]);
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
        <div className="container mx-auto px-4 py-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
                <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
                    Courses
                </h1>

                <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 w-full sm:w-auto">
                    {/* ✅ Search Input */}
                    <div className="flex items-center border rounded-lg overflow-hidden w-full max-w-md">
                        <input
                            type="text"
                            placeholder="Search courses..."
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

            {/* Table */}
            <div className="overflow-x-auto">
                <table className="min-w-full bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-100">
                    <thead>
                        <tr className="border-b dark:border-gray-700">
                            <th className="py-3 px-4 font-semibold text-left">Course</th>
                            <th className="py-3 px-4 font-semibold text-left">Title</th>
                            <th className="py-3 px-4 font-semibold text-left">Price</th>
                            <th className="py-3 px-4 font-semibold text-left">Status</th>
                            <th className="py-3 px-4 font-semibold text-left">Edit</th>
                            <th className="py-3 px-4 font-semibold text-left">Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {loading ? (
                            <tr>
                                <td colSpan={5} className="py-6 text-center">
                                    Loading ...
                                </td>
                            </tr>
                        ) : courses.length === 0 ? (
                            <tr>
                                <td colSpan={5} className="py-6 text-center">
                                    <div className="flex flex-col items-center gap-3">
                                        <span className="text-gray-600 dark:text-gray-300">No courses found!</span>
                                        <button
                                            onClick={handleReload}
                                            className="flex items-center gap-2 px-3 py-1 rounded-lg bg-black text-white  dark:text-gray-700 dark:bg-gray-200 dark:text-black dark:hover:bg-gray-300 transition-colors">
                                            <IoReload className="text-sm" />
                                            Reload
                                        </button>
                                    </div>
                                </td>

                            </tr>
                        ) : (
                            courses.map((course) => (
                                <tr
                                    key={course._id}
                                    className="border-b hover:bg-gray-50 dark:hover:bg-gray-800"
                                >
                                    <td className="py-3 px-4">
                                        <img
                                            src={course.bannerImageUrl}
                                            alt={course.title}
                                            className="w-16 h-16 object-cover rounded cursor-pointer"
                                            onClick={() => navigate(`/course/${course._id}`)}
                                        />
                                    </td>
                                    <td className="py-3 px-4">{course.title}</td>
                                    <td className="py-3 px-4">
                                        ₹{course.programs[0]?.price?.toFixed(2) ?? 'N/A'}
                                    </td>
                                    <td className="py-3 px-4">
                                        {course.isPublished ? <span className='bg-green-400 rounded-md p-2 text-white'>published</span> : <span className='bg-red-400 rounded-md p-2 text-white'>unpublished</span>}
                                    </td>
                                    <td className="py-3 px-4">
                                        <TbPencil
                                            className="h-5 w-5 cursor-pointer hover:text-brand-500"
                                            onClick={() => navigate(`/editCourse/${course._id}`)}
                                        />
                                    </td>
                                    <td className="py-3 px-4">
                                        <TbTrash
                                            className="h-5 w-5 cursor-pointer hover:text-red-500"
                                            onClick={() => handleDelete(course._id)}
                                        />
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>

            {/* ✅ Pagination with filters + search */}
            {
                pagination.totalPages >= 1 &&
                <Pagination
                    currentPage={currentPage}
                    totalPages={pagination.totalPages}
                    onPageChange={(page) => updateURL(page, filters, searchTerm)} // ✅ keep filters + search
                />
            }

        </div>
    );
};

export default CourseList;
