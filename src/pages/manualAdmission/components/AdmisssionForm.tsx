import React, { useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage, useFormikContext } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../redux/store";
import { getAllCourses } from "../../../redux/slices/course";
import { StudentEnrollment } from "../createManualAdmission/types";

interface Mode {
  _id: string;
  mode: string;
  title: string;
  description: string;
  price: number;
  priceLabel: string;
  features: string[];
}

export const studentEnrollmentSchema = Yup.object().shape({
  studentName: Yup.string().required("Student Name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  mobileNumber: Yup.string()
    .matches(/^\d{10}$/, "Mobile number must be 10 digits")
    .required("Mobile number is required"),
  paidAmount: Yup.number()
    .typeError("Paid amount must be a number")
    .min(0, "Paid amount cannot be negative")
    .required("Paid amount is required"),
  className: Yup.string().required("Class name is required"),
});

interface AdmissionFormProps {
  initialValues: StudentEnrollment;
  onSubmit: (values: StudentEnrollment) => void;
  title?: string;
  submitLabel?: string;
}

// Function to generate and download receipt
const generateReceipt = (studentData: StudentEnrollment, courseTitle: string, modeTitle: string, totalAmount: number) => {
  const remainingAmount = totalAmount - Number(studentData.paidAmount);
  const receiptDate = new Date().toLocaleDateString();
  const receiptId = `RCPT-${Date.now()}`;
  
  // Create a printable receipt content
  const receiptContent = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #ddd;">
      <div style="text-align: center; border-bottom: 1px solid #ddd; padding-bottom: 20px; margin-bottom: 20px;">
        <h2 style="color: #333; margin-bottom: 5px;">Payment Receipt</h2>
        <p style="color: #666; margin: 2px 0;">Receipt ID: ${receiptId}</p>
        <p style="color: #666; margin: 2px 0;">Date: ${receiptDate}</p>
      </div>
      
      <div style="display: flex; justify-content: space-between; margin-bottom: 20px;">
        <div>
          <h3 style="color: #333; margin-bottom: 10px;">Student Details</h3>
          <p style="color: #666; margin: 5px 0;">Name: ${studentData.studentName}</p>
          <p style="color: #666; margin: 5px 0;">Email: ${studentData.email}</p>
          <p style="color: #666; margin: 5px 0;">Phone: ${studentData.mobileNumber}</p>
          <p style="color: #666; margin: 5px 0;">ClassName: ${studentData.className}</p>
        </div>
        
        <div>
          <h3 style="color: #333; margin-bottom: 10px;">Course Details</h3>
          <p style="color: #666; margin: 5px 0;">Course: ${courseTitle}</p>
          <p style="color: #666; margin: 5px 0;">Mode: ${modeTitle}</p>
        </div>
      </div>
      
      <div style="border-top: 1px solid #ddd; border-bottom: 1px solid #ddd; padding: 15px 0; margin-bottom: 20px;">
        <h3 style="color: #333; margin-bottom: 10px;">Payment Information</h3>
        <div style="display: flex; justify-content: space-between; margin-bottom: 5px;">
          <span style="color: #666;">Total Amount:</span>
          <span style="color: #333;">₹${totalAmount}</span>
        </div>
        <div style="display: flex; justify-content: space-between; margin-bottom: 5px;">
          <span style="color: #666;">Paid Amount:</span>
          <span style="color: green;">₹${studentData.paidAmount}</span>
        </div>
        <div style="display: flex; justify-content: space-between; font-weight: bold;">
          <span style="color: #333;">Remaining Amount:</span>
          <span style="color: ${remainingAmount > 0 ? 'red' : 'green'};">₹${remainingAmount}</span>
        </div>
      </div>
      
      <div style="text-align: center; color: #999; font-size: 14px;">
        <p>Thank you for your payment!</p>
      </div>
    </div>
  `;
  
  // Create a new window for printing
  const printWindow = window.open('', '_blank');
  if (printWindow) {
    printWindow.document.write(`
      <html>
        <head>
          <title class="text-center">volcanic classes Receipt</title>
          <style>
            body { margin: 0; padding: 15px; font-family: Arial, sans-serif ; }
            @media print {
              body { padding: 0; }
            }
          </style>
        </head>
        <body>
          ${receiptContent}
          <script>
            window.onload = function() {
              window.print();
              setTimeout(function() {
                window.close();
              }, 1000);
            }
          </script>
        </body>
      </html>
    `);
    printWindow.document.close();
  }
};

const CourseAndModeFields: React.FC = () => {
  const { values, setFieldValue } = useFormikContext<any>();
  const { courses } = useSelector((state: RootState) => state.course);
  const [modes, setModes] = useState<Mode[]>([]);

  useEffect(() => {
    if (values.courseId) {
      const selectedCourse = courses.find((c) => c._id === values.courseId);
      if (selectedCourse) {
        setModes(selectedCourse.programs || []);
        if (!selectedCourse.programs.some((p) => p.mode === values.mode)) {
          setFieldValue("mode", "");
        }
      }
    } else {
      setModes([]);
      setFieldValue("mode", "");
    }
  }, [values.courseId, courses, values.mode, setFieldValue]);

  const selectedMode = modes.find((p) => p.mode === values.mode);
  const remainingAmount =
    selectedMode && values.paidAmount
      ? selectedMode.price - Number(values.paidAmount)
      : null;

  return (
    <>
      {/* Course Selection */}
      <div>
        <label className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">
          Course
        </label>
        <Field
          as="select"
          name="courseId"
          className="mt-1 block w-full border border-gray-300 dark:border-gray-600 outline-none dark:bg-gray-700 rounded-md px-3 py-2 shadow-sm focus:ring-2 focus:ring-brand-500 focus:border-brand-500"
        >
          <option value="">Select a course</option>
          {courses?.map((course) => (
            <option key={course._id} value={course._id}>
              {course.title}
            </option>
          ))}
        </Field>
        <ErrorMessage
          name="courseId"
          component="div"
          className="text-red-500 text-sm mt-1"
        />
      </div>

      {/* Mode Selection */}
      <div>
        <label className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">
          Mode
        </label>
        <Field
          as="select"
          name="mode"
          className="mt-1 block w-full border border-gray-300 dark:border-gray-600 outline-none dark:bg-gray-700 rounded-md px-3 py-2 shadow-sm focus:ring-2 focus:ring-brand-500 focus:border-brand-500"
        >
          <option value="">Select mode</option>
          {modes.map((p) => (
            <option key={p._id} value={p.mode}>
              {p.title}
            </option>
          ))}
        </Field>
        <ErrorMessage
          name="mode"
          component="div"
          className="text-red-500 text-sm mt-1"
        />

        {/* Price Display */}
        {selectedMode && (
          <p className="mt-2 text-gray-700 dark:text-gray-300">
            Price: ₹{selectedMode.price}
          </p>
        )}

        {/* Remaining Amount */}
        {remainingAmount !== null && (
          <p className="mt-1 text-gray-700 dark:text-gray-300">
            Remaining Amount: ₹{remainingAmount}
          </p>
        )}
      </div>
    </>
  );
};

const AdmisssionForm: React.FC<AdmissionFormProps> = ({
  initialValues,
  onSubmit,
  title = "Manual Admission",
  submitLabel = "Create Admission",
}) => {
  const dispatch = useDispatch<AppDispatch>();
  const { courses } = useSelector((state: RootState) => state.course);
  const [submittedData, setSubmittedData] = useState<StudentEnrollment | null>(null);
  const [selectedCourseTitle, setSelectedCourseTitle] = useState("");
  const [selectedModeTitle, setSelectedModeTitle] = useState("");
  const [totalAmount, setTotalAmount] = useState(0);
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    dispatch(getAllCourses());
  }, [dispatch]);

  const handleFormSubmit = (values: StudentEnrollment) => {
    // Find course and mode details for receipt
    const course = courses.find(c => c._id === values.courseId);
    const mode = course?.programs.find(p => p.mode === values.mode);
    
    if (course && mode) {
      setSelectedCourseTitle(course.title);
      setSelectedModeTitle(mode.title);
      setTotalAmount(mode.price);
    }
    
    setSubmittedData(values);
    setIsSubmitted(true);
    onSubmit(values);
  };

  const handleDownloadReceipt = () => {
    if (submittedData) {
      generateReceipt(submittedData, selectedCourseTitle, selectedModeTitle, totalAmount);
    }
  };

  const handleResetForm = () => {
    setIsSubmitted(false);
    setSubmittedData(null);
  };

  return (
    <div className="flex flex-col items-center justify-center w-full max-w-6xl rounded-xl bg-white dark:bg-gray-800 mx-auto p-6 shadow">
      <h2 className="text-xl font-bold mb-6 text-gray-900 dark:text-white">
        {title}
      </h2>

      {isSubmitted ? (
        <div className="w-full text-center">
          <div className="mb-6 p-4 bg-green-100 dark:bg-green-900 rounded-md">
            <h3 className="text-lg font-semibold text-green-800 dark:text-green-200">
              Admission Created Successfully!
            </h3>
            <p className="text-green-700 dark:text-green-300 mt-2">
              Student enrollment has been processed successfully.
            </p>
          </div>
          
          <div className="flex justify-center space-x-4">
            <button
              onClick={handleDownloadReceipt}
              className="px-6 py-2 bg-brand-500 text-white rounded hover:bg-brand-600 transition flex items-center"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              Download Receipt
            </button>
            
            <button
              onClick={handleResetForm}
              className="px-6 py-2 bg-gray-300 dark:bg-gray-600 text-gray-700 dark:text-gray-300 rounded hover:bg-gray-400 dark:hover:bg-gray-500 transition"
            >
              Create Another Admission
            </button>
          </div>
        </div>
      ) : (
        <Formik<StudentEnrollment>
          initialValues={initialValues}
          validationSchema={studentEnrollmentSchema}
          onSubmit={handleFormSubmit}
          enableReinitialize
        >
          {() => (
            <Form className="w-full grid grid-cols-1 md:grid-cols-2 gap-6 dark:text-gray-300">
              {/* Student Name */}
              <div>
                <label className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">
                  Student Name
                </label>
                <Field
                  name="studentName"
                  placeholder="Enter Student Name"
                  className="mt-1 block w-full border border-gray-300 dark:border-gray-600 rounded-md px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-brand-500 dark:bg-gray-700"
                />
                <ErrorMessage
                  name="studentName"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>

              {/* Email */}
              <div>
                <label className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">
                  Student Email
                </label>
                <Field
                  name="email"
                  placeholder="Enter Email"
                  className="mt-1 block w-full border border-gray-300 dark:border-gray-600 rounded-md px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-brand-500 dark:bg-gray-700"
                />
                <ErrorMessage
                  name="email"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>

              {/* Mobile Number */}
              <div>
                <label className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">
                  Mobile Number
                </label>
                <Field
                  name="mobileNumber"
                  placeholder="Enter Mobile Number"
                  className="mt-1 block w-full border border-gray-300 dark:border-gray-600 rounded-md px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-brand-500 dark:bg-gray-700"
                />
                <ErrorMessage
                  name="mobileNumber"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>

              {/* Paid Amount */}
              <div>
                <label className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">
                  Paid Amount
                </label>
                <Field
                  name="paidAmount"
                  placeholder="Enter Paid Amount"
                  className="mt-1 block w-full border border-gray-300 dark:border-gray-600 rounded-md px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-brand-500 dark:bg-gray-700"
                />
                <ErrorMessage
                  name="paidAmount"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>

              {/* Class Name */}
              <div>
                <label className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">
                  Class Name
                </label>
                <Field
                  name="className"
                  placeholder="Enter Class Name"
                  className="mt-1 block w-full border border-gray-300 dark:border-gray-600 rounded-md px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-brand-500 dark:bg-gray-700"
                />
                <ErrorMessage
                  name="className"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>

              {/* Course + Mode + Price */}
              <CourseAndModeFields />

              {/* Submit Button */}
              <div className="col-span-1 md:col-span-2">
                <button
                  type="submit"
                  className="w-full md:w-auto px-6 py-2 bg-brand-500 text-white rounded hover:bg-brand-600 transition"
                >
                  {submitLabel}
                </button>
              </div>
            </Form>
          )}
        </Formik>
      )}
    </div>
  );
};

export default AdmisssionForm;