import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { AppDispatch, RootState } from "../../../redux/store";
import { getOrderById } from "../../../redux/slices/order";
import {
  FiUser,
  FiPhone,
  FiMail,
  FiBook,
  FiHash,
  FiType,
  FiCreditCard,
  FiCheckCircle,
  FiClock,
  FiXCircle,
  FiCalendar
} from "react-icons/fi";

const OrderDetail = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useDispatch<AppDispatch>();

  const { order, loading, error } = useSelector(
    (state: RootState) => state.order
  );

  useEffect(() => {
    if (id) {
      dispatch(getOrderById(id));
    }
  }, [dispatch, id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-brand-500"></div>
      </div>
    );
  }

  if (error) {
    return <p className="text-center text-red-500 dark:text-red-400 mt-6">{error}</p>;
  }

  if (!order) {
    return <p className="text-center text-gray-500 dark:text-gray-400 mt-6">Order not found</p>;
  }

  const statusStyles = {
    completed: "bg-green-100 text-green-700 border-green-300 dark:bg-green-900 dark:text-green-200 dark:border-green-700",
    pending: "bg-yellow-100 text-yellow-700 border-yellow-300 dark:bg-yellow-900 dark:text-yellow-200 dark:border-yellow-700",
    failed: "bg-red-100 text-red-700 border-red-300 dark:bg-red-900 dark:text-red-200 dark:border-red-700",
  };

  const statusIcon = {
    completed: <FiCheckCircle className="text-green-500" />,
    pending: <FiClock className="text-yellow-500" />,
    failed: <FiXCircle className="text-red-500" />,
  };

  return (
    <div className="max-w-4xl mx-auto bg-white dark:bg-gray-900 shadow-lg rounded-xl p-4 sm:p-8 mt-8 transition-colors">
      {/* Header */}
      <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-gray-800 dark:text-white flex items-center gap-3">
        <FiCreditCard className="text-brand-500" /> Order Details
      </h2>
      <hr className="mb-6 border-gray-300 dark:border-gray-700" />

      {/* Grid layout */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
        {[
          { icon: <FiUser />, label: "Student Name", value: order.user.name },
          { icon: <FiPhone />, label: "Mobile", value: order.user.mobileNumber },
          { icon: <FiMail className="text-red-500" />, label: "Email", value: order.user.email },
          { icon: <FiBook />, label: "Class", value: order.className },
          { icon: <FiHash />, label: "Course ID", value: order.course.title },
          { icon: <FiType />, label: "Course Type", value: order.courseType },
          { icon: <FiCreditCard />, label: "Amount", value: `₹${order.amount}` },
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

        {/* Payment Status */}
        <div className="flex items-center gap-3 p-3 sm:p-4 border rounded-lg bg-gray-50 dark:bg-gray-800 border-gray-300 dark:border-gray-700">
          {statusIcon[order.paymentStatus as keyof typeof statusIcon]}
          <span
            className={`px-3 py-1 rounded-lg border text-sm sm:text-base ${statusStyles[order.paymentStatus as keyof typeof statusStyles]}`}
          >
            {order.paymentStatus}
          </span>
        </div>

        {/* Payment ID */}
        <div className="flex items-center gap-3 p-3 sm:p-4 border rounded-lg bg-gray-50 dark:bg-gray-800 border-gray-300 dark:border-gray-700">
          <FiHash className="text-brand-500 text-xl" />
          <span className="text-gray-800 dark:text-gray-100">
            <strong>Payment ID:</strong> {String(order.paymentId)}
          </span>
        </div>


        {/* Created At */}
        <div className="flex items-center gap-3 p-3 sm:p-4 border rounded-lg bg-gray-50 dark:bg-gray-800 border-gray-300 dark:border-gray-700">
          <FiCalendar className="text-brand-500 text-xl" />
          <span className="text-gray-800 dark:text-gray-100">
            <strong>Created At:</strong> {new Date(order.createdAt).toLocaleString()}
          </span>
        </div>
      </div>
    </div>
  );
};

export default OrderDetail;
