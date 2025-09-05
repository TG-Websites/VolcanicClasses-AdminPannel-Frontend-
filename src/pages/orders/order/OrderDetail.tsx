import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { AppDispatch, RootState } from "../../../redux/store";
import { getOrderById, updateOrder } from "../../../redux/slices/order";
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
  FiCalendar,
} from "react-icons/fi";
import { FaEdit } from "react-icons/fa";
import { PDFDownloadLink } from "@react-pdf/renderer";
import ReceiptPDF from "../../../utils/ReceiptPDF"; // adjust path

const OrderDetail = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useDispatch<AppDispatch>();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [paidAmount, setPaidAmount] = useState("");
  const [showReceipt, setShowReceipt] = useState(false);

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
    return (
      <p className="text-center text-red-500 dark:text-red-400 mt-6">{error}</p>
    );
  }

  if (!order) {
    return (
      <p className="text-center text-gray-500 dark:text-gray-400 mt-6">
        Order not found
      </p>
    );
  }

  const statusStyles = {
    completed:
      "bg-green-100 text-green-700 border-green-300 dark:bg-green-900 dark:text-green-200 dark:border-green-700",
    pending:
      "bg-yellow-100 text-yellow-700 border-yellow-300 dark:bg-yellow-900 dark:text-yellow-200 dark:border-yellow-700",
    failed:
      "bg-red-100 text-red-700 border-red-300 dark:bg-red-900 dark:text-red-200 dark:border-red-700",
  };

  const statusIcon = {
    completed: <FiCheckCircle className="text-green-500" />,
    pending: <FiClock className="text-yellow-500" />,
    failed: <FiXCircle className="text-red-500" />,
  };

const handleSubmitAmount = async () => {
  await dispatch(
    updateOrder({
      id: id as string,
      orderData: { paidAmount },
    })
  );

  // re-fetch updated order
  await dispatch(getOrderById(id as string));

  setIsModalOpen(false);
  setShowReceipt(true);
};

  return (
    <div className="max-w-4xl mx-auto bg-white dark:bg-gray-900 shadow-lg rounded-xl p-4 sm:p-8 mt-8 transition-colors">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-gray-800 dark:text-white flex items-center gap-3">
          <FiCreditCard className="text-brand-500" /> Order Details
        </h2>
        <div>
          {order.paymentMode === "offline" ? <FaEdit className="h-10 w-7 text-brand-500 cursor-pointer" onClick={() => setIsModalOpen(true)} /> : <></>}
        </div>
      </div>
      <hr className="mb-6 border-gray-300 dark:border-gray-700" />

      {/* Grid layout */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
        {[
          { icon: <FiUser />, label: "Student Name", value: order.user.name },
          { icon: <FiPhone />, label: "Mobile", value: order.user.mobileNumber },
          { icon: <FiMail className="text-red-500" />, label: "Email", value: order.user.email },
          { icon: <FiBook />, label: "Class Name", value: order.className },
          { icon: <FiHash />, label: "Course ", value: order.course.title },
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
          <strong className="text-gray-800 dark:text-gray-100">Status :</strong>
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
            {
              order.paymentMode === "offline" ? (
                <>
                  <strong>DueAmount:</strong> {String(order.dueAmount)}
                </>
              ) : (
                <>
                  <strong>Payment ID:</strong> {String(order.paymentId)}
                </>
              )
            }
          </span>
        </div>


        {/* Created At */}
        <div className="flex items-center gap-3 p-3 sm:p-4 border rounded-lg bg-gray-50 dark:bg-gray-800 border-gray-300 dark:border-gray-700">
          <FiCalendar className="text-brand-500 text-xl" />
          <span className="text-gray-800 dark:text-gray-100">
            <strong>Created At:</strong> {new Date(order.createdAt).toLocaleDateString()}
          </span>
        </div>
      </div>
      {/* Previous Due Amount Track */}
      {order.dueAmountTrack && order.dueAmountTrack.length > 0 && (
        <div className="mt-8">
          <h3 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white flex items-center gap-2">
            <FiHash className="text-brand-500" /> Previous Due Amounts
          </h3>

          <div className="overflow-x-auto">
            <table className="min-w-full border border-gray-300 dark:border-gray-700 rounded-lg">
              <thead className="bg-gray-100 dark:bg-gray-800">
                <tr>
                  <th className="px-4 py-2 text-left text-gray-700 dark:text-gray-200 border-b border-gray-300 dark:border-gray-700">
                    #
                  </th>
                  <th className="px-4 py-2 text-left text-gray-700 dark:text-gray-200 border-b border-gray-300 dark:border-gray-700">
                    Amount
                  </th>
                  <th className="px-4 py-2 text-left text-gray-700 dark:text-gray-200 border-b border-gray-300 dark:border-gray-700">
                    Submitted At
                  </th>
                </tr>
              </thead>
              <tbody>
                {order.dueAmountTrack.map(
                  (track: { _id: string; amount: number; submitted: string }, index: number) => (
                    <tr
                      key={track._id}
                      className="hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                    >
                      <td className="px-4 py-2 border-b border-gray-300 dark:border-gray-700 text-gray-800 dark:text-gray-100">
                        {index + 1}
                      </td>
                      <td className="px-4 py-2 border-b border-gray-300 dark:border-gray-700 text-gray-800 dark:text-gray-100">
                        ₹{track.amount}
                      </td>
                      <td className="px-4 py-2 border-b border-gray-300 dark:border-gray-700 text-gray-800 dark:text-gray-100">
                        {new Date(track.submitted).toLocaleDateString()}
                      </td>
                    </tr>
                  )
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}


      {/* Receipt download button */}
      {showReceipt && (
        <div className="mt-6 flex justify-center">
          <PDFDownloadLink
            document={<ReceiptPDF order={order} paidAmount={paidAmount} />}
            fileName={`Payment receipt-.pdf`}
          >
            {({ loading }) =>
              loading ? (
                <button className="px-4 py-2 bg-gray-500 text-white rounded-lg">
                  Generating...
                </button>
              ) : (
                <button className="mt-4 py-2 px-3 text-white  rounded-md bg-brand-500">
                  Download Receipt
                </button>
              )
            }
          </PDFDownloadLink>
        </div>
      )}

      {/* ---- Modal code (Enter Due Amount) ---- */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-100 z-1">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 w-96">
            <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">
              Enter Due Amount
            </h2>
            <input
              type="number"
              value={paidAmount}
              onChange={(e) => setPaidAmount(e.target.value)}
              placeholder="Enter amount"
              className="w-full p-2 border rounded-lg mb-4 dark:bg-gray-700 dark:text-white"
            />
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400 dark:bg-gray-600 dark:hover:bg-gray-500"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmitAmount}
                className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderDetail;
