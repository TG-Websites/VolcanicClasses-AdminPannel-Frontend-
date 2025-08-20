import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store";
import { FaUser, FaBook, FaClock,FaPhone } from "react-icons/fa";
import { getAllInQuiries } from "../../redux/slices/admission";
import { MdEmail } from "react-icons/md";

interface Inquiry {
  _id: string;
  name: string;
  courseInterest : {
    title:string
  };
  status: "approved" | "pending" | "rejected" | "waitlisted" | string;
  email:string;
  phone:number;
}

const statusStyles: Record<string, string> = {
  approved: "text-gray-800 bg-green-100",
  pending: "text-gray-800 bg-yellow-100",
  rejected: "text-gray-800 bg-red-100",
  waitlisted: "text-gray-800 bg-blue-100",
};

const AdmissionInquiries = () => {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(getAllInQuiries());
  }, [dispatch]);

  const { inquiries, loading, error } = useSelector(
    (state: RootState) => state.admission
  );

  const latestInquiries = (inquiries as Inquiry[])?.slice(0, 7);

  return (
    <div className="bg-white w-full shadow p-4 dark:border-gray-800 dark:bg-white/[0.03] dark:text-gray-300 rounded-xl">
      <div className="flex flex-col gap-6 mb-4 pt-2">
        <div className="flex items-center gap-4">
          <div className="w-11 h-11 bg-gray-100 dark:bg-gray-800 rounded-xl flex items-center justify-center">
            <FaUser className="text-xl text-gray-600" />
          </div>
          <h2 className="text-lg font-medium text-gray-700 dark:text-gray-300">
            Recent Admission Inquiries
          </h2>
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-32">
          <p>Loading...</p>
        </div>
      ) : error ? (
        <div className="flex justify-center items-center h-32">
          <p className="text-red-500">Error loading inquiries.</p>
        </div>
      ) : latestInquiries?.length === 0 ? (
        <div className="flex justify-center items-center h-32">
          <p className="text-gray-500">No recent inquiries.</p>
        </div>
      ) : (
        <div className="overflow-x-auto dark:text-gray-200">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead>
              <tr className="text-gray-500 dark:text-gray-400 font-medium">
                <th className="px-4 py-3 text-left text-sm whitespace-nowrap">
                  <div className="flex items-center gap-2">
                    <FaUser />
                    <span>Name</span>
                  </div>
                </th>
                <th className="px-4 py-3 text-left text-sm whitespace-nowrap">
                  <div className="flex items-center gap-2">
                    <FaBook />
                    <span>Course</span>
                  </div>
                </th>
                
                <th className="px-4 py-3 text-left text-sm whitespace-nowrap">
                  <div className="flex items-center gap-2">
                    <MdEmail />
                    <span>Email</span>
                  </div>
                </th>
                <th className="px-4 py-3 text-left text-sm whitespace-nowrap">
                  <div className="flex items-center gap-2">
                    <FaPhone />
                    <span>Phone</span>
                  </div>
                </th>
                <th className="px-4 py-3 text-left text-sm whitespace-nowrap">
                  <div className="flex items-center gap-2">
                    <FaClock />
                    <span>Status</span>
                  </div>
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {latestInquiries.map((inquiry) => {
                const statusKey =
                  typeof inquiry.status === "string"
                    ? inquiry.status.toLowerCase()
                    : "";
                return (
                  <tr key={inquiry._id} className="hover:bg-gray-50 dark:hover:bg-gray-800/50">
                    <td className="px-4 py-3 whitespace-nowrap">
                      <div className="text-sm text-gray-900 dark:text-gray-200">
                        {inquiry.name}
                      </div>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      <div className="text-sm text-gray-900 dark:text-gray-200">
                        {inquiry.courseInterest.title}
                      </div>
                    </td>
                    
                     <td className="px-4 py-3 whitespace-nowrap">
                      <div className="text-sm text-gray-900 dark:text-gray-200">
                        {inquiry.email}
                      </div>
                    </td>
                     <td className="px-4 py-3 whitespace-nowrap">
                      <div className="text-sm text-gray-900 dark:text-gray-200">
                        {inquiry.phone}
                      </div>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      <span
                        className={`text-xs font-medium px-3 py-1 rounded-full ${
                          statusStyles[statusKey] ||
                          "bg-gray-100 text-gray-600"
                        }`}
                      >
                        {inquiry.status}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AdmissionInquiries;