import {  useDispatch, useSelector } from 'react-redux';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { AppDispatch, RootState } from '../../redux/store';
import {Link} from "react-router-dom"
import { Studentlogin } from '../../redux/slices/auth';
import { useNavigate } from 'react-router';

const validationSchema = Yup.object().shape({
  email: Yup.string().required('email is required'),
});

const StudentForm: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { loading } = useSelector((state: RootState) => state.auth);
  const navigate = useNavigate()


const handleSubmit = async (values: { email: string }) => {
  // ✅ Save email immediately
  localStorage.setItem("studentEmail", values.email);
  const resultAction = await dispatch(Studentlogin(values));
  if (Studentlogin.fulfilled.match(resultAction)) {
    navigate("/verifyotp");
  }
};


  return (
    <div className="flex flex-col flex-1">
      <div className="flex flex-col justify-center flex-1 w-full max-w-md mx-auto">
        <div>
          <h1 className="mb-2 font-semibold text-gray-800 dark:text-white/90  text-title-sm">Sign In</h1>
          <p className="text-sm text-gray-500">Enter your email  sign in!</p>
        </div>
        <Formik
          initialValues={{ email: ''}}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {() => (
            <Form className="space-y-6">
              {/* Email Field */}
              <div>
                <label className="block mb-2 dark:text-gray-400">Email</label>
                <Field
                  name="email"
                  className="w-full p-2 border rounded dark:text-gray-400"
                  placeholder="Enter your Email"
                />
                <ErrorMessage name="email" component="div" className="text-red-500 text-sm" />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full bg-brand-500 text-white py-2 rounded"
                disabled={loading}
              >
                {loading ? 'Signing in...' : 'Sign In'}
              </button>
            </Form>
          )}
        </Formik>

        <div className="mt-5 text-center">
          <p className="text-sm dark:text-gray-400">Sign in For Admin ? <Link to="/signin" className="text-blue-500">Sign In</Link></p>
        </div>
      </div>
    </div>
  );
}

export default StudentForm;
