import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../redux/store";
import { getAllMedia, deleteMedia } from "../../../redux/slices/media";
import { FaSearch } from "react-icons/fa";
import { FiTrash2 } from "react-icons/fi";
import FilterDropdown from "../components/FilterDropdown";
import toast from 'react-hot-toast';
import Pagination from "../../../utils/Pagination";


const AllMedia = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { mediaList, pagination } = useSelector((state: RootState) => state.media);
  const [currentPage, setCurrentPage] = useState(1);
  const [limit] = useState(5); // fixed
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState<{ type?: string }>({});

  const fetchMedia = (page = currentPage, appliedFilters = filters, appliedSearch = searchTerm) => {
    setCurrentPage(page);

    const query = new URLSearchParams({
      ...appliedFilters,
      search: appliedSearch,
      page: String(page),
      limit: String(limit),
    }).toString();

    dispatch(getAllMedia(query));
  };

  useEffect(() => {
    fetchMedia(1, filters, searchTerm);
  }, []);

  const handleDelete = async (id: string) => {
    if (window.confirm("Are you sure you want to delete this item?")) {
      const resultAction = await dispatch(deleteMedia(id));
      if (deleteMedia.fulfilled.match(resultAction)) {
        toast.success("Media Delete Successfully")
        dispatch(getAllMedia());
      }
    }
  };

  const handleApplyFilters = (appliedFilters: { type?: string }) => {
    const validFilters = Object.fromEntries(
      Object.entries(appliedFilters).filter(([, value]) => value)
    );
    setFilters(validFilters);
    setCurrentPage(1); // ✅ reset page
    fetchMedia(1, validFilters, searchTerm);
  };

  const handleSearch = () => {
    setCurrentPage(1); // ✅ reset page
    fetchMedia(1, filters, searchTerm);
  };

  const handleReload = () => {
    setFilters({});
    setSearchTerm("");
    setCurrentPage(1);
    fetchMedia(1, {}, "");
  };



  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
          All Media
        </h1>

        <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 w-full sm:w-auto">
          {/* ✅ Search Input */}
          <div className="flex items-center border rounded-lg overflow-hidden w-full max-w-md">
            <input
              type="text"
              placeholder="Search Image,video..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="px-3 py-2 flex-1 min-w-0 outline-none dark:bg-gray-800 dark:text-white"
              onKeyDown={(e) => e.key === "Enter" && handleSearch()}
            />
            <button
              onClick={handleSearch}
              className="px-3 py-3 dark:text-white "
            >
              <FaSearch />
            </button>
          </div>
          <FilterDropdown onApply={handleApplyFilters} onCancel={handleReload} />
        </div>
      </div>

      {/* Media Grid */}
      {mediaList.length === 0 ? (
        <div className="flex flex-col items-center justify-center ">
          <p className="text-gray-500 mb-4">No Media found.</p>
          <button
            onClick={handleReload}
            className="px-4 py-2 bg-black text-white dark:bg-gray-300 dark:text-gray-700 rounded-lg shadow  transition"
          >
            Reload
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5">
          {mediaList.map((media) => (
            <div
              key={media._id}
              className="relative group rounded-xl overflow-hidden bg-white dark:bg-gray-900 shadow-md hover:shadow-lg transition-all duration-300"
            >
              {/* Type Badge */}
              <div className="absolute top-3 left-3 bg-brand-500 text-white text-xs px-3 py-1 rounded-full shadow-md">
                {media.type}
              </div>

              {/* Delete Button — always visible on mobile, hover-only on desktop */}
              <button
                className={`absolute top-3 right-3 bg-red-500 hover:bg-red-600 text-white rounded-full p-2 transition-opacity duration-200
                  opacity-100 md:opacity-0 md:group-hover:opacity-100`}
                onClick={() => handleDelete(media._id)}
              >
                <FiTrash2 />
              </button>

              {/* Media Preview */}
              <div className="aspect-square bg-gray-100 dark:bg-gray-800 flex items-center justify-center overflow-hidden">
                <img
                  src={media.url}
                  alt={media.title}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Info */}
              <div className="p-3 text-gray-900 dark:text-white">
                <p className="font-medium truncate">{media.title}</p>
                <div className="flex flex-wrap gap-1 mt-2">
                  {media.tags?.map((tag, index) => (
                    <span
                      key={index}
                      className="text-xs bg-blue-100 dark:bg-brand-500 text-black dark:text-blue-200 px-2 py-1 rounded-full"
                    >
                      #{tag.trim()}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {pagination?.total >= 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={pagination.total}
          onPageChange={(page) => fetchMedia(page, filters, searchTerm)} // ✅ keep search + filters
        />
      )}

    </div>
  );
};

export default AllMedia;
