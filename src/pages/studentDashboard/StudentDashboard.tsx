import React, { useEffect, useState } from "react";
import { fetchStudentDashboard } from "../../redux/slices/studentDashboard";
import { getCourseById } from "../../redux/slices/course";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store";
import { FaBullhorn } from "react-icons/fa";

interface Course {
  _id: string;
  title: string;
  programs: Array<{
    mode: string;
    price: number;
  }>;
  bannerImageUrl: string;
  category: string;
  duration: string;
}

const StudentDashboard: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { loading, data, error } = useSelector(
    (state: RootState) => state.studentDashboard
  );
  const [courses, setCourses] = useState<Course[]>([]);

  useEffect(() => {
    dispatch(fetchStudentDashboard());
  }, [dispatch]);

  useEffect(() => {
    const fetchCourses = async () => {
      if (data?.purchasedCourses) {
        const courseDetails: Course[] = [];
        for (const purchased of data.purchasedCourses) {
          const res = await dispatch(getCourseById(purchased._id));
          courseDetails.push(res.payload);
        }
        setCourses(courseDetails);
      }
    };
    fetchCourses();
  }, [data, dispatch]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-brand-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="bg-white p-6 rounded-lg shadow-md max-w-md w-full">
          <div className="text-red-500 text-center">
            <h3 className="text-lg font-medium mb-2">Error Loading Dashboard</h3>
            <p className="text-gray-600">{error}</p>
            <button
              onClick={() => dispatch(fetchStudentDashboard())}
              className="mt-4 px-4 py-2 bg-brand-500 text-white rounded-md hover:bg-brand-600 transition-colors"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h3 className="text-lg font-medium text-gray-700">
            No data available
          </h3>
          <p className="text-gray-500 mt-1">
            Your dashboard is empty at the moment.
          </p>
        </div>
      </div>
    );
  }

  const { announcements } = data;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-10">
      <div className="container mx-auto px-6 space-y-10">
        {/* Header */}
        <header>
          <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100">
            Student Dashboard
          </h1>
          <p className="text-gray-600 dark:text-gray-300 mt-2">
            Welcome back! Here's your learning overview.
          </p>
        </header>

        {/* Purchased Courses Table */}
        {courses.length > 0 && (
          <div className="overflow-x-auto bg-white dark:bg-gray-800 rounded-xl shadow-md">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead className="bg-gray-100 dark:bg-gray-700">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Course
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Title
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Category
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Duration
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Price
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                {courses.map((course) => (
                  <tr
                    key={course._id}
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <img
                        src={course.bannerImageUrl}
                        alt={course.title}
                        className="w-16 h-16 object-cover rounded "
                      />
                    </td>
                    <td className="px-6 py-4 text-gray-800 dark:text-gray-100">
                      {course.title}
                    </td>
                    <td className="px-6 py-4 text-gray-800 dark:text-gray-100">
                      {course.category}
                    </td>
                    <td className="px-6 py-4 text-gray-800 dark:text-gray-100">
                      {course.duration}
                    </td>
                    <td className="px-6 py-4 text-gray-800 dark:text-gray-100">
                      ₹{course.programs[0]?.price?.toFixed(2) ?? "N/A"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Announcements */}
        <div className="bg-white shadow p-6 dark:border-gray-800 dark:bg-white/[0.03] dark:text-gray-300 rounded-xl">
          <div className="flex items-center mb-6">
            <FaBullhorn className="text-brand-500 text-xl mr-2" />
            <h2 className="text-lg font-semibold dark:text-gray-300">
              Latest Announcements
            </h2>
          </div>

          {error ? (
            <div className="text-red-500 text-sm dark:text-gray-300">
              Failed to load announcements: {error}
            </div>
          ) : announcements.length > 0 ? (
            <div className="space-y-6">
              {announcements.slice(0, 6).map((announcement, index) => {
                const dateObj = new Date(announcement.createdAt);
                const day = dateObj.toLocaleDateString("en-US", { day: "2-digit" });
                const month = dateObj.toLocaleDateString("en-US", {
                  month: "short",
                });
                const year = dateObj.toLocaleDateString("en-US", { year: "numeric" });

                return (
                  <div key={index} className="flex">
                    {/* Date Section */}
                    <div className="w-24 text-sm text-gray-500 dark:text-gray-300 font-medium flex-shrink-0 text-right pr-4">
                      <div>
                        {month} {day}
                      </div>
                      <div>{year}</div>
                    </div>

                    {/* Content Section */}
                    <div className="border-l-2 border-gray-300 pl-4">
                      <h3 className="text-md font-semibold text-gray-800 dark:text-gray-300 mb-1">
                        {announcement.title}
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-300">
                        {announcement.content}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <p className="text-sm text-gray-500">No announcements available</p>
          )}
        </div>

        {/* Upcoming Live Classes */}
        {data.upcomingLiveClasses && data.upcomingLiveClasses.length > 0 && (
          <div className="w-full overflow-x-auto bg-white dark:bg-gray-800 rounded-xl shadow-md">
            <h2 className="text-xl font-semibold px-6 pt-6 pb-4 text-brand-600 dark:text-brand-400 border-b border-gray-200 dark:border-gray-700">
              Upcoming Live Classes
            </h2>
            <table className="w-full min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead className="bg-gray-100 dark:bg-gray-700">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 dark:text-gray-300 uppercase tracking-wider">
                    Course Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 dark:text-gray-300 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 dark:text-gray-300 uppercase tracking-wider">
                    Time
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 dark:text-gray-300 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 dark:text-gray-300 uppercase tracking-wider">
                    Teacher
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 dark:text-gray-300 uppercase tracking-wider">
                    Link
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                {data.upcomingLiveClasses.map((cls) =>
                  cls.schedules.map((s) => {
                    const dateObj = new Date(s.date);
                    const date = dateObj.toLocaleDateString("en-US", {
                      weekday: "short",
                      month: "short",
                      day: "2-digit",
                      year: "numeric",
                    });

                    return (
                      <tr key={s._id}>
                        <td className="px-6 py-4 text-gray-800 dark:text-gray-100">
                          {cls.course.title}
                        </td>
                        <td className="px-6 py-4 text-gray-800 dark:text-gray-100">
                          {date}
                        </td>
                        <td className="px-6 py-4 text-gray-800 dark:text-gray-100">
                          {s.time}
                        </td>
                        <td className="px-6 py-4">
                          <span
                            className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${s.isCancelled
                                ? "bg-red-100 text-red-800"
                                : "bg-green-100 text-green-800"
                              }`}
                          >
                            {s.isCancelled ? "Cancelled" : "Scheduled"}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-gray-800 dark:text-gray-100">
                          {s.instructor}
                        </td>
                        <td className="px-6 py-4">
                          {!s.isCancelled ? (
                            <a
                              href={s.link}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="px-3 py-1 text-sm bg-brand-500 text-white rounded-md hover:bg-brand-600 transition"
                            >
                              Join
                            </a>
                          ) : (
                            <span className="text-sm text-gray-400">No Link</span>
                          )}
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>



        )}
      </div>
    </div>
  );
};

export default StudentDashboard;
