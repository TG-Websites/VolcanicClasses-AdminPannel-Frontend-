import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { FiFilter } from "react-icons/fi";

interface FilterDropdownProps {
  onApply: (filters: {
    category?: string;
    "programs.mode"?: string; // dot-notation instead of nested object
  }) => void;
  onCancel?: () => void; // 👈 make onCancel optional
}

const FilterDropdown: React.FC<FilterDropdownProps> = ({ onApply, onCancel }) => {
  const location = useLocation();
  const [tempCategory, setTempCategory] = useState("");
  const [tempMode, setTempMode] = useState("");
  const [showFilter, setShowFilter] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const category = params.get('category') || '';
    const mode = params.get('programs.mode') || '';
    setTempCategory(category);
    setTempMode(mode);
  }, [location.search]);

  const handleApply = () => {
    onApply({
      category: tempCategory || undefined,
      "programs.mode": tempMode || undefined,
    });
    setShowFilter(false);
  };

  const handleCancel = () => {
    setTempCategory("");
    setTempMode("");
    setShowFilter(false);
    if (onCancel) onCancel(); // 👈 trigger parent onCancel if provided
  };

  return (
    <div className="relative inline-block">
      {/* Filter Button */}
      <button
        onClick={() => setShowFilter(!showFilter)}
        className="flex items-center gap-2 px-4 py-2 bg-gray-100 dark:bg-gray-800 dark:text-white rounded-md shadow hover:bg-gray-200 dark:hover:bg-gray-700 transition"
      >
        <FiFilter className="text-lg" />
        Filter
      </button>

      {/* Dropdown Content */}
      {showFilter && (
        <div className="absolute right-0 top-full mt-2 bg-white dark:bg-gray-800 text-black dark:text-white p-4 rounded-lg shadow border dark:border-gray-600 w-72 z-10 space-y-4">
          {/* Course Category */}
          <div>
            <label className="block text-sm font-medium mb-1">Course Category</label>
            <select
              value={tempCategory}
              onChange={(e) => setTempCategory(e.target.value)}
              className="w-full border rounded px-3 py-2 text-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            >
              <option value="">All</option>
              <option value="JEE">JEE</option>
              <option value="NEET">NEET</option>
              <option value="Boards">11 & 12 Board</option>
            </select>
          </div>

          {/* Mode */}
          <div>
            <label className="block text-sm font-medium mb-1">Mode</label>
            <select
              value={tempMode}
              onChange={(e) => setTempMode(e.target.value)}
              className="w-full border rounded px-3 py-2 text-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            >
              <option value="">All</option>
              <option value="online">Online</option>
              <option value="offline">Offline</option>
              <option value="hybrid">Hybrid</option>
            </select>
          </div>

          {/* Buttons */}
          <div className="flex justify-end gap-2 pt-2">
            <button
              onClick={handleCancel}
              className="px-4 py-1 text-sm rounded bg-gray-200 hover:bg-gray-300 dark:bg-gray-600 dark:hover:bg-gray-500"
            >
              Clear Filter
            </button>
            <button
              onClick={handleApply}
              className="px-4 py-1 text-sm rounded bg-brand-500 text-white hover:bg-brand-600"
            >
              Done
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default FilterDropdown;
