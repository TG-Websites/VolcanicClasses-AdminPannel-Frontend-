// components/FilterDropdown.tsx
import { useState } from "react";
import { FiFilter } from "react-icons/fi";

interface FilterDropdownProps {
  courses?: string[];
  onApply: (filters: { role?: string;  }) => void;
}

const FilterDropdown: React.FC<FilterDropdownProps> = ({ onApply }) => {
  const [tempRole, setTempRole] = useState("");
  const [showFilter, setShowFilter] = useState(false);

  const handleApply = () => {
    onApply({
      role: tempRole || undefined,
    });
    setShowFilter(false);
  };

  return (
    <div className="relative inline-block">
      <button
        onClick={() => setShowFilter(!showFilter)}
        className="flex items-center gap-2 px-4 py-2 bg-gray-100 dark:bg-gray-800 dark:text-white rounded-md shadow hover:bg-gray-200 dark:hover:bg-gray-700 transition"
      >
        <FiFilter className="text-lg" />
        Filter
      </button>

      {showFilter && (
        <div className="absolute right-0 top-full mt-2 bg-white dark:bg-gray-800 text-black dark:text-white p-4 rounded-lg shadow border dark:border-gray-600 w-72 z-10 space-y-4">
          {/* Role */}
          <div>
            <label className="block text-sm font-medium mb-1">Role</label>
            <select
              value={tempRole}
              onChange={(e) => setTempRole(e.target.value)}
              className="w-full border rounded px-3 py-2 text-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            >
              <option value="">All</option>
              <option value="manager">Manager</option>
              <option value="telecaller">Telecaller</option>
              <option value="user">User</option>
            </select>
          </div>

          {/* Course */}


          {/* Buttons */}
          <div className="flex justify-end gap-2 pt-2">
            <button
              onClick={() => {
                setTempRole("");
                setShowFilter(false);
              }}
              className="px-4 py-1 text-sm rounded bg-gray-200 hover:bg-gray-300 dark:bg-gray-600 dark:hover:bg-gray-500"
            >
              Cancel
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
