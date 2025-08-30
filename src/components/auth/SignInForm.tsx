import  { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { AppDispatch, RootState } from '../../redux/store';
import { login } from '../../redux/slices/auth';
import {Link} from "react-router-dom"
import { Eye, EyeOff } from "lucide-react";


const validationSchema = Yup.object().shape({
  email: Yup.string().required('email is required'),
  password: Yup.string().required('Password is required'),
});

const SignInForm: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch<AppDispatch>();
  const { loading, error } = useSelector((state: RootState) => state.auth);


const handleSubmit = async (values: { email: string; password: string }) => {
  const resultAction = await dispatch(login(values));
  if (login.fulfilled.match(resultAction)) {
    window.location.href = '/';
  }
};


  return (
    <div className="flex flex-col flex-1">
      <div className="flex flex-col justify-center flex-1 w-full max-w-md mx-auto">
        <div>
          <h1 className="mb-2 font-semibold text-gray-800 dark:text-white/90  text-title-sm">Sign In</h1>
          <p className="text-sm text-gray-500">Enter your email and password to sign in!</p>
          {error && <div className="text-red-500">{error}</div>}
        </div>
        <Formik
          initialValues={{ email: '', password: '' }}
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

              {/* Password Field */}
              <div>
                <label className="block mb-2 dark:text-gray-400">Password</label>
                <div className="relative">
                  <Field
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    className="w-full p-2 border rounded dark:text-gray-400"
                    placeholder="Enter your password"
                  />
                  <span
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-2 cursor-pointer text-black"
                  >
                    {showPassword ? < EyeOff className='text-gray-600 dark:text-gray-200 w-4'/> : < Eye  className='text-gray-600 dark:text-gray-200 w-4'/>}
                  </span>
                </div>
                <ErrorMessage name="password" component="div" className="text-red-500 text-sm" />
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
          <p className="text-sm dark:text-gray-400">Sign in For Student ? <Link to="/studentsignin" className="text-blue-500">Sign In</Link></p>
        </div>
      </div>
    </div>
  );
}

export default SignInForm;
