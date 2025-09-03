// Receipt.tsx
import React from "react";

interface ReceiptProps {
  studentName: string;
  email: string;
  mobileNumber: string;
  className: string;
  courseTitle: string;
  modeTitle: string;
  price: number;
  paidAmount: number;
  remainingAmount: number;
  onClose: () => void;
}

const Receipt: React.FC<ReceiptProps> = ({
  studentName,
  email,
  mobileNumber,
  className,
  courseTitle,
  modeTitle,
  price,
  paidAmount,
  remainingAmount,
  onClose,
}) => {
  return (
    <div className="mt-6 border rounded-lg shadow p-6 bg-white dark:bg-gray-800">
      <h2 className="text-xl font-bold mb-4 text-center">Payment Receipt</h2>
      
      <div className="space-y-2">
        <p><strong>Student:</strong> {studentName}</p>
        <p><strong>Email:</strong> {email}</p>
        <p><strong>Mobile:</strong> {mobileNumber}</p>
        <p><strong>Class:</strong> {className}</p>
        <hr className="my-2"/>
        <p><strong>Course:</strong> {courseTitle}</p>
        <p><strong>Mode:</strong> {modeTitle}</p>
        <p><strong>Total Price:</strong> ₹{price}</p>
        <p><strong>Paid:</strong> ₹{paidAmount}</p>
        <p><strong>Remaining:</strong> ₹{remainingAmount}</p>
      </div>

      <div className="mt-4 flex justify-end">
        <button 
          onClick={onClose}
          className="px-4 py-2 bg-brand-500 text-white rounded hover:bg-brand-600 transition"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default Receipt;
