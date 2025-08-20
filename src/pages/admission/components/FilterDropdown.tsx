import { useState } from "react";
import { FiFilter } from "react-icons/fi";
import DatePicker from "react-datepicker";
import { format } from "date-fns";
import CourseDropdown from "./CourseDropdown";

interface Course {
  _id: string;
  title: string;
}

interface FilterDropdownProps {
  courses?: Course[]; // expect real course objects
  onApply: (filters: {
    status?: string;
    courseInterest?: string; // this will be courseId
    startDate?: string;
    endDate?: string;
  }) => void;

  onCancel?: () => void;
}
  

const FilterDropdown: React.FC<FilterDropdownProps> = ({ onApply , onCancel}) => {
  const [tempStatus, setTempStatus] = useState("");
  const [tempCourse, setTempCourse] = useState(""); // will store courseId
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [showFilter, setShowFilter] = useState(false);

  const handleApply = () => {
    onApply({
      status: tempStatus || undefined,
      courseInterest: tempCourse || undefined, // <-- real courseId
      startDate: startDate ? format(startDate, "yyyy-MM-dd") : undefined,
      endDate: endDate ? format(endDate, "yyyy-MM-dd") : undefined,
    });
    setShowFilter(false);
  };

  const handleCancel = () => {
    setTempStatus("");
    setTempCourse("");
    setShowFilter(false);
    if (onCancel) onCancel(); 
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
        <div className="absolute right-0 top-full mt-2 bg-white dark:bg-gray-800 text-black dark:text-white p-4 rounded-lg shadow border dark:border-gray-600 w-80 z-10 space-y-4">
          {/* Status */}
          <div>
            <label className="block text-sm font-medium mb-1">Status</label>
            <select
              value={tempStatus}
              onChange={(e) => setTempStatus(e.target.value)}
              className="w-full border rounded px-3 py-2 text-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            >
              <option value="">All</option>
              <option value="pending">Pending</option>
              <option value="approved">Approved</option>
              <option value="rejected">Rejected</option>
              <option value="waitlisted">Waitlisted</option>
            </select>
          </div>

          {/* Course */}
          <div>
            <label className="block text-sm font-medium mb-1">Course</label>
            <CourseDropdown
              name="course"
              value={tempCourse} // courseId string
              onChange={(e) => setTempCourse(e.target.value)}
              onBlur={() => { }} // not needed here
            />
          </div>

          {/* Date Range */}
         <div className="flex gap-2">
           <div>
            <label className="block text-sm font-medium mb-1">Start Date</label>
            <DatePicker
              selected={startDate}
              onChange={(date) => setStartDate(date)}
              dateFormat="yyyy-MM-dd"
              placeholderText="Select start date"
              className="w-full border rounded px-3 py-2 text-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">End Date</label>
            <DatePicker
              selected={endDate}
              onChange={(date) => setEndDate(date)}
              dateFormat="yyyy-MM-dd"
              placeholderText="Select end date"
              className="w-full border rounded px-3 py-2 text-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            />
          </div>
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
