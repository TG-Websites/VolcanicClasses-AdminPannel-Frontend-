import React, { useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage, useFormikContext } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../redux/store";
import { getAllCourses } from "../../../redux/slices/course";
import { StudentEnrollment } from "../createManualAdmission/types";
import { PDFDownloadLink } from "@react-pdf/renderer";
import ReceiptPDF_2 from "../../../utils/ReceiptPDF_2";
import { generateReceiptNumber } from "../../../utils/generateReceiptNumber";


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
    .min(1, "Paid amount cannot be zero or negative")
    .required("Paid amount is required"),
  className: Yup.string().required("Class name is required"),
});

interface AdmissionFormProps {
  initialValues: StudentEnrollment;
  onSubmit: (values: StudentEnrollment) => void;
  title?: string;
  submitLabel?: string;
}

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
          Course*
        </label>
        <Field
          as="select"
          name="courseId"
          className="mt-1 block w-full border border-gray-300 dark:border-gray-600 outline-none dark:bg-gray-700 rounded-md px-3 py-2 shadow-sm focus:ring-2 focus:ring-brand-500 focus:border-brand-500"
          onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
            const selectedCourseId = e.target.value;
            const selectedCourse = courses.find((c) => c._id === selectedCourseId);

            // Update courseId
            setFieldValue("courseId", selectedCourseId);

            // Update courseName too
            if (selectedCourse) {
              setFieldValue("courseName", selectedCourse.title);
            } else {
              setFieldValue("courseName", "");
            }
          }}
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
          Mode*
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

  const [showReceipt, setShowReceipt] = useState(false);
  const [receiptData, setReceiptData] = useState<any>(null);

  useEffect(() => {
    dispatch(getAllCourses());
  }, [dispatch]);

  const courses = useSelector((state: RootState) => state.course.courses);

  const handleSubmit = (values: StudentEnrollment, { resetForm }: any) => {
    // find the course
    const selectedCourse = courses.find((c) => c._id === values.courseId);

    const selectedMode = selectedCourse?.programs?.find(
      (p: any) => p.mode === values.mode
    );

    const totalAmount = selectedMode ? selectedMode.price : 0;
    const remainingAmount = totalAmount - Number(values.paidAmount || 0);

    // Call parent submit
    onSubmit(values);

    // Generate receipt data
    const newReceiptData = {
      receiptNumber: generateReceiptNumber(),
      date: new Date().toLocaleDateString(),
      time: new Date().toLocaleTimeString(),
      totalAmount,
      remainingAmount,
      studentName: values.studentName,
      mobileNumber: values.mobileNumber,
      email: values.email,
      className: values.className,
      courseName: values.courseName,
      course: values.courseId,
      mode: values.mode,
      paidAmount: values.paidAmount,
    };

    setReceiptData(newReceiptData);
    setShowReceipt(true);

    // ✅ Reset form fields after submit
    resetForm();
  };


  return (
    <div className="flex flex-col items-center justify-center w-full max-w-6xl rounded-xl bg-white dark:bg-gray-800 mx-auto p-6 shadow">
      <h2 className="text-xl font-bold mb-6 text-gray-900 dark:text-white">
        {title}
      </h2>

      <Formik<StudentEnrollment>
        initialValues={initialValues}
        validationSchema={studentEnrollmentSchema}
        onSubmit={handleSubmit}
        enableReinitialize
      >
        {() => (
          <Form className="w-full grid grid-cols-1 md:grid-cols-2 gap-6 dark:text-gray-300">
            {/* Student Name */}
            <div>
              <label className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">
                Student Name*
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
                Student Email*
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
                Mobile Number*
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
                Paid Amount*
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
                Class Name*
              </label>
              <Field
                as="select"
                name="className"
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-volcanic-red focus:outline-none"
              >
                <option value="">Select Class</option>
                <option value="11th">11th</option>
                <option value="12th">12th</option>
                <option value="Dropper">Dropper</option>
              </Field>
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

      {showReceipt && receiptData && (
        <div className="mt-4 py-2 px-3 text-white  rounded-md bg-brand-500">
          <PDFDownloadLink
            document={<ReceiptPDF_2 data={receiptData} />}
            fileName={`Payment receipt.pdf`}
          >
            {({ loading }) =>
              loading ? "Generating Receipt..." : "Download Receipt"
            }
          </PDFDownloadLink>
        </div>
      )}
    </div>
  );
};

export default AdmisssionForm;
