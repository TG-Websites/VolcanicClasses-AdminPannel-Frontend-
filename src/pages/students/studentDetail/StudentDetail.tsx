import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { studentById } from "../../../redux/slices/studentDetail";
import { AppDispatch, RootState } from "../../../redux/store";
import { useParams } from "react-router";
import { FiCreditCard, FiMail, FiPhone, FiUser } from "react-icons/fi";
import { MdDateRange } from "react-icons/md";

const StudentDetail = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { id } = useParams<{ id: string }>();
  const { loading, data, error } = useSelector(
    (state: RootState) => state.studentDetail
  );

  useEffect(() => {
    if (id) {
      dispatch(studentById(id));
    }
  }, [id, dispatch]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-red-500">{error}</p>;
  if (!data) return null;

  const { user, orders } = data;
  const createdAt = new Date(user.createdAt).toLocaleDateString();

  return (
    <div className="p-4 space-y-4">
      {/* user detail */}
      <div className="max-w-7xl mx-auto bg-white dark:bg-gray-900 shadow-lg rounded-xl p-4 sm:p-8 mt-8 transition-colors">
        {/* Header */}
        <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-gray-800 dark:text-white flex items-center gap-3">
          <FiCreditCard className="text-brand-500" /> Student Information
        </h2>
        <hr className="mb-6 border-gray-300 dark:border-gray-700" />

        {/* Grid layout */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
          {[
            { icon: <FiUser />, label: "Student Name", value: user.name },
            { icon: <FiPhone />, label: "Mobile", value: user.mobileNumber },
            { icon: <FiMail className="text-red-500" />, label: "Email", value: user.email },
            { icon: <MdDateRange />, label: "createdAt", value: createdAt },
          ].map((item, idx) => (
            <div
              key={idx}
              className="flex items-center gap-3 p-3 sm:p-4 border rounded-lg bg-gray-50 dark:bg-gray-800 border-gray-300 dark:border-gray-700 transition-colors"
            >
              <span className="text-brand-500 text-xl">{item.icon}</span>
              <span className="text-gray-800 dark:text-gray-100">
                <strong>{item.label}:</strong> {item.value}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Orders table */}
      <div className="overflow-x-auto bg-white dark:bg-gray-800 rounded-xl shadow-md">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
          <thead className="bg-gray-100 dark:bg-gray-700">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                Courses
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                Title
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                Mode
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                Class
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                Price
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                Status
              </th>
            </tr>
          </thead>

          <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
            {orders.map((order) => {
              // find the banner from user.courses
              const matchedCourse = user.courses.find(
                (c) => c.course._id === order.course._id
              );

              return (
                <tr key={order._id}>
                  {/* Banner */}
                  <td className="px-6 py-4 whitespace-nowrap">
                    {matchedCourse?.course.bannerImageUrl ? (
                      <img
                        src={matchedCourse.course.bannerImageUrl}
                        alt="banner"
                        className="w-16 h-16 object-cover rounded"
                      />
                    ) : (
                      <span className="text-gray-400">N/A</span>
                    )}
                  </td>

                  {/* Title */}
                  <td className="px-6 py-4 text-gray-800 dark:text-gray-100">
                    {order.course.title}
                  </td>

                  {/* Course Type */}
                  <td className="px-6 py-4 text-gray-800 dark:text-gray-100">
                    {order.courseType}
                  </td>

                  {/* Class */}
                  <td className="px-6 py-4 text-gray-800 dark:text-gray-100">
                    {order.className}
                  </td>

                  {/* Amount */}
                  <td className="px-6 py-4 text-gray-800 dark:text-gray-100">
                    ₹{order.amount}
                  </td>

                  {/* Payment Status */}
                  <td className="px-6 py-4 text-gray-800 dark:text-gray-100">
                    <span
                      className={`px-2 py-1 rounded text-xs font-semibold ${
                        order.paymentStatus === "completed"
                          ? "bg-green-100 text-green-700"
                          : "bg-yellow-100 text-yellow-700"
                      }`}
                    >
                      {order.paymentStatus}
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default StudentDetail;
