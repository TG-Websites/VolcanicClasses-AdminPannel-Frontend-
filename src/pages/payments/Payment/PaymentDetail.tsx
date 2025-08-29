import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { AppDispatch, RootState } from "../../../redux/store";
import { getPaymentById } from "../../../redux/slices/payment";
import { TbTransactionRupee } from "react-icons/tb";
import { MdOutlinePayment } from "react-icons/md";
import { FaMoneyBill } from "react-icons/fa";
import { BsCurrencyExchange } from "react-icons/bs";

import {
  MdClass,
  MdPayments,
  MdCheckCircle,
  MdAccessTime,
} from "react-icons/md";
import { FiHash } from "react-icons/fi";

// import logo from "../../../assets/logo.png"; // 👈 update your logo path

const PaymentDetail = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { id } = useParams<{ id: string }>();
  const { payment, loading } = useSelector((state: RootState) => state.payment);

  useEffect(() => {
    if (id) {
      dispatch(getPaymentById(id));
    }
  }, [id, dispatch]);

  if (loading) return <div className="p-6 text-center">Loading...</div>;
  if (!payment) return <div className="p-6 text-center">No payment found</div>;

  return (
    <div className="max-w-5xl mx-auto p-4 sm:p-6">
      {/* Header with logo */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200 flex items-center gap-2">
          <MdPayments className="text-red-500" size={28} />
          Payment Details
        </h2>
        {/* <img src={logo} alt="Logo" className="h-10 sm:h-12" /> */}
      </div>

      {/* Main container */}
      <div className="shadow-md rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
        <div className="p-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Transaction ID */}
          <div className="flex items-center gap-2 border p-3 rounded-lg bg-gray-50 dark:bg-gray-700">
            <TbTransactionRupee className="text-red-500" />
            <span className="font-semibold">Transaction ID:</span>
            <span className="ml-1">{payment.transactionId}</span>
          </div>

          {/* Currency */}
          <div className="flex items-center gap-2 border p-3 rounded-lg bg-gray-50 dark:bg-gray-700">
            <BsCurrencyExchange className="text-red-500" />
            <span className="font-semibold">Currency:</span>
            <span className="ml-1">{payment.currency}</span>
          </div>

          {/* Payment ID */}
          <div className="flex items-center gap-2 border p-3 rounded-lg bg-gray-50 dark:bg-gray-700">
            <MdOutlinePayment className="text-red-500" />
            <span className="font-semibold">Payment ID:</span>
            <span className="ml-1">{payment.order?.paymentId}</span>
          </div>

          {/* Method */}
          <div className="flex items-center gap-2 border p-3 rounded-lg bg-gray-50 dark:bg-gray-700">
            <MdClass className="text-red-500" />
            <span className="font-semibold">Method:</span>
            <span className="ml-1">{payment.method}</span>
          </div>

          {/* Amount */}
          <div className="flex items-center gap-2 border p-3 rounded-lg bg-gray-50 dark:bg-gray-700">
            <FaMoneyBill className="text-red-500" />
            <span className="font-semibold">Amount:</span>
            <span className="ml-1">₹{payment.amount}</span>
          </div>

          {/* Status */}
          <div className="flex items-center gap-2 border p-3 rounded-lg bg-gray-50 dark:bg-gray-700">
            <MdCheckCircle
              className={`${
                payment.status === "completed" ? "text-green-500" : "text-yellow-500"
              }`}
            />
            <span className="font-semibold">Status:</span>
            <span
              className={`ml-1 px-2 py-1 rounded-md text-sm font-medium ${
                payment.status === "completed"
                  ? "bg-green-100 text-green-700 dark:bg-green-700 dark:text-green-100"
                  : "bg-yellow-100 text-yellow-700 dark:bg-yellow-700 dark:text-yellow-100"
              }`}
            >
              {payment.status}
            </span>
          </div>

          {/* Paid At */}
          <div className="flex items-center gap-2 border p-3 rounded-lg bg-gray-50 dark:bg-gray-700">
             <MdAccessTime className="text-red-500" />
            <span className="font-semibold">Paid At:</span>
            <span className="ml-1">
              {new Date(payment.paidAt).toLocaleString()}
            </span>
           <div>
           </div>

          </div>
           <div className="flex items-center gap-2 border p-3 rounded-lg bg-gray-50 dark:bg-gray-700">
            < FiHash className="text-red-500" />
            <span className="font-semibold">Order Id:</span>
            <span className="ml-1">{payment.order._id}</span>
          </div>

        </div>
      </div>
    </div>
  );
};

export default PaymentDetail;
