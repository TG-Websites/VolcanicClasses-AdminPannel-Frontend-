import { useState } from "react";
import {
  FaEnvelope,
  FaPhone,
  FaBook,
  FaUser,
  FaTable,
  FaTh,
} from "react-icons/fa";
import { FiEdit } from "react-icons/fi";
import { useNavigate } from "react-router";

export interface Inquiry {
  _id: string;
  name: string;
  phone: number;
  email: string;
  courseInterest: {
    _id: string;
    title: string;
  };
  message: string;
  createdAt: string;
  status: string;
  followUps?: FollowUp[];
}
interface FollowUp {
  _id: string;
  note: string;
  addedBy: {
    _id: string;
    name: string;
  };
  date: string; // ISO date string
}

interface InquiryListProps {
  inquiries: Inquiry[];
}

const InquiriesList: React.FC<InquiryListProps> = ({ inquiries }) => {
  const [inquiryList] = useState<Inquiry[]>(inquiries);
  const [viewMode, setViewMode] = useState<"card" | "table">("card");
  const navigate = useNavigate();

  const handleEdit = (id: string) => {
    navigate(`/admission/inquiries/${id}`);
  };

  return (
    <div className="space-y-6">
      {/* View controls */}
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <button
            onClick={() => setViewMode("card")}
            className={`p-2 rounded-md transition ${viewMode === "card"
                ? "bg-brand-500 text-white"
                : "bg-gray-200 dark:bg-gray-700 dark:text-white"
              }`}
            title="Card View"
          >
            <FaTh />
          </button>
          <button
            onClick={() => setViewMode("table")}
            className={`p-2 rounded-md transition ${viewMode === "table"
                ? "bg-brand-500 text-white"
                : "bg-gray-200 dark:bg-gray-700 dark:text-white"
              }`}
            title="Table View"
          >
            <FaTable />
          </button>
        </div>
      </div>

      {/* Card View */}
      {viewMode === "card" ? (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {inquiryList.length > 0 ? (
            inquiryList.map((inquiry) => (
              <div
                key={inquiry._id}
                className="p-5 rounded-2xl shadow bg-white dark:bg-gray-800 dark:text-white border dark:border-gray-700 hover:shadow-lg transition"
              >
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-semibold flex items-center gap-2">
                    <FaUser className="text-brand-500" />
                    {inquiry.name}
                  </h3>
                  <FiEdit
                    className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 cursor-pointer"
                    onClick={() => handleEdit(inquiry._id)}
                  />
                </div>

                <div className="text-sm space-y-3 text-gray-700 dark:text-gray-300">
                  <div className="flex items-center gap-2">
                    <FaPhone className="text-brand-500" />
                    {inquiry.phone}
                  </div>
                  <div className="flex items-center gap-2">
                    <FaEnvelope className="text-brand-500" />
                    {inquiry.email}
                  </div>
                  <div className="flex items-center gap-2">
                    <FaBook className="text-brand-500" />
                    <span className="font-medium">Course:</span>
                    {inquiry.courseInterest.title}
                  </div>

                  {/* Status Badge */}
                  <div className="flex items-center gap-2">
                    <span className="font-medium">Status:</span>
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold capitalize
                        ${inquiry.status === "pending"
                          ? "bg-yellow-100 text-yellow-700 dark:bg-yellow-700 dark:text-yellow-100"
                          : ""
                        }
                        ${inquiry.status === "contacted"
                          ? "bg-green-100 text-green-700 dark:bg-green-700 dark:text-green-100"
                          : ""
                        }
                        ${inquiry.status === "converted"
                          ? "bg-red-100 text-red-700 dark:bg-red-700 dark:text-red-100"
                          : ""
                        }
                        ${inquiry.status === "lost"
                          ? "bg-blue-100 text-blue-700 dark:bg-blue-700 dark:text-blue-100"
                          : ""
                        }
                      `}
                    >
                      {inquiry.status}
                    </span>
                  </div>

                  <div>
                    <span className="font-medium">Notes:</span>{" "}
                    <span className="text-gray-600 dark:text-gray-400">
                      {inquiry.followUps && inquiry.followUps.length > 0
                        ? inquiry.followUps[inquiry.followUps.length - 1].note
                        : "No follow-up yet"}
                    </span>
                  </div>

                  <div>
                    <span className="font-medium">Message:</span>{" "}
                    <span className="text-gray-600 dark:text-gray-400">
                      {inquiry.message}
                    </span>
                  </div>

                  <div>
                    <span className="font-medium">Created:</span>{" "}
                    {new Date(inquiry.createdAt).toLocaleDateString()}
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="text-gray-500 dark:text-gray-400 italic">
              No inquiries found.
            </div>
          )}
        </div>
      ) : (
        // Table View
        <div className="overflow-x-auto bg-white dark:bg-gray-900 rounded-lg shadow">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead className="bg-gray-50 dark:bg-gray-800">
              <tr>
                {["Name", "Contact", "Course", "Message", "Created", "Status", "Edit"].map(
                  (header) => (
                    <th
                      key={header}
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider"
                    >
                      {header}
                    </th>
                  )
                )}
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-700">
              {inquiryList.length > 0 ? (
                inquiryList.map((inquiry) => (
                  <tr
                    key={inquiry._id}
                    className="hover:bg-gray-50 dark:hover:bg-gray-800 transition"
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="h-10 w-10 flex items-center justify-center bg-brand-100 dark:bg-brand-900 rounded-full">
                          <FaUser className="text-brand-500" />
                        </div>
                        <div className="ml-3">
                          <div className="text-sm font-medium text-gray-900 dark:text-white">
                            {inquiry.name}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-300">
                      <div>{inquiry.email}</div>
                      <div className="text-xs text-gray-500 dark:text-gray-400">
                        {inquiry.phone}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-300">
                      {inquiry.courseInterest.title}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900 dark:text-gray-300 line-clamp-2 max-w-xs">
                      {inquiry.message}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                      {new Date(inquiry.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900 dark:text-gray-300 line-clamp-2 max-w-xs">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold capitalize
                        ${inquiry.status === "pending"
                            ? "bg-yellow-100 text-yellow-700 dark:bg-yellow-700 dark:text-yellow-100"
                            : ""
                          }
                        ${inquiry.status === "contacted"
                            ? "bg-green-100 text-green-700 dark:bg-green-700 dark:text-green-100"
                            : ""
                          }
                        ${inquiry.status === "converted"
                            ? "bg-red-100 text-red-700 dark:bg-red-700 dark:text-red-100"
                            : ""
                          }
                        ${inquiry.status === "lost"
                            ? "bg-blue-100 text-blue-700 dark:bg-blue-700 dark:text-blue-100"
                            : ""
                          }
                      `}
                      >
                        {inquiry.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <FiEdit
                        className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 cursor-pointer"
                        onClick={() => handleEdit(inquiry._id)}
                      />
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={6}
                    className="px-6 py-4 text-center text-gray-500 dark:text-gray-400 italic"
                  >
                    No inquiries found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default InquiriesList;
