// CourseDropdown.tsx
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../redux/store";
import { getAllCourses } from "../../../redux/slices/course";

interface CourseDropdownProps {
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  onBlur: (e: React.FocusEvent<HTMLSelectElement>) => void;
}

const CourseDropdown: React.FC<CourseDropdownProps> = ({
  name,
  value,
  onChange,
  onBlur,
}) => {
  const dispatch = useDispatch<AppDispatch>();
  const { courses, loading, error } = useSelector((state: RootState) => state.course);

  useEffect(() => {
    dispatch(getAllCourses());
  }, [dispatch]);

  if (loading) return <p className="text-sm text-gray-500">Loading courses...</p>;
  if (error) return <p className="text-sm text-red-500">Error: {error}</p>;

  return (
    <select
      name={name}
      value={value}
      onChange={onChange}
      onBlur={onBlur}
      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md 
        focus:outline-none focus:ring-2 focus:ring-brand-500 dark:focus:ring-brand-500 
        dark:bg-gray-700 dark:text-white"
    >
      <option value="">Select a course</option>
      {courses?.map((course) => (
        <option key={course._id} value={course._id}>
          {course.title}
        </option>
      ))}
    </select>
  );
};

export default CourseDropdown;
