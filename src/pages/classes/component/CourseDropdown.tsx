// CourseDropdown.tsx
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Field, ErrorMessage } from "formik";
import { AppDispatch, RootState } from "../../../redux/store";
import { getAllCourses } from "../../../redux/slices/course";

const CourseDropdown: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { courses, loading, error } = useSelector((state: RootState) => state.course);

  useEffect(() => {
    dispatch(getAllCourses());
  }, [dispatch]);

  return (
    <div>
      <label className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">
        Course*
      </label>

      {loading ? (
        <p className="text-sm text-gray-500">Loading courses...</p>
      ) : error ? (
        <p className="text-sm text-red-500">Error: {error}</p>
      ) : (
        <Field
          as="select"
          name="course"
          className="mt-1 block w-full border border-gray-300 dark:border-gray-600 outline-none 
            dark:bg-gray-700 rounded-md px-3 py-2 shadow-sm focus:ring-2 focus:ring-brand-500 
            focus:border-brand-500"
        >
          <option value="">Select a course</option>
          {courses?.map((course) => (
            <option key={course._id} value={course._id}>
              {course.title}
            </option>
          ))}
        </Field>
      )}

      <ErrorMessage name="course" component="div" className="text-red-500 text-sm mt-1" />
    </div>
  );
};

export default CourseDropdown;
