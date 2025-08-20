import {useSelector } from "react-redux";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { RootState,AppDispatch } from "../../redux/store";
import { useNavigate } from "react-router";
import { verifyOtp } from "../../redux/slices/auth";
import { useDispatch } from "react-redux";

const validationSchema = Yup.object().shape({
  otp: Yup.string()
    .required("OTP is required")
    .length(6, "OTP must be 6 digits"),
});

const OtpVerificationForm: React.FC = () => {
  const { loading, error } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate()

const handleSubmit = async (values: { otp: string }) => {
  // ✅ Retrieve stored email
  const email = localStorage.getItem("studentEmail");

  if (!email) {
    alert("No email found. Please login again.");
    navigate("/studentsignin");
    return;
  }
  const resultAction = await dispatch(
    verifyOtp({ otp: values.otp, email }) 
  );

  if (verifyOtp.fulfilled.match(resultAction)) {
    window.location.href = "/studentDashboard";
  }
};

  return (
    <div className="flex flex-col flex-1">
      <div className="flex flex-col justify-center flex-1 w-full max-w-md mx-auto">
        <div>
          <h1 className="mb-2 font-semibold text-gray-800 dark:text-white/90 text-title-sm">
            OTP Verification
          </h1>
          <p className="text-sm text-gray-500">
            Enter the 6-digit OTP sent to your email/phone.
          </p>
          {error && <div className="text-red-500">{error}</div>}
        </div>

        <Formik
          initialValues={{ otp: "" }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {() => (
            <Form className="space-y-6">
              {/* OTP Field */}
              <div>
                <label className="block mb-2 dark:text-gray-400">OTP</label>
                <Field
                  name="otp"
                  type="text"
                  maxLength={6}
                  className="w-full p-1 border rounded dark:text-gray-400 text-center tracking-[0.5em] text-lg"
                  placeholder="Enter OTP"
                />
                <ErrorMessage
                  name="otp"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full bg-brand-500 text-white py-2 rounded"
                disabled={loading}
              >
                {loading ? "Verifying..." : "Verify OTP"}
              </button>
            </Form>
          )}
        </Formik>

        {/* Resend OTP */}
        <div className="mt-5 text-center">
          <p className="text-sm dark:text-gray-400">
            Didn’t receive OTP?{" "}
            <button
              onClick={() => console.log("Resend OTP API")}
              className="text-blue-500"
            >
              Resend
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default OtpVerificationForm;
