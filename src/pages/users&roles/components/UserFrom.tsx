import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { UserFormValues } from '../type';
import { FiUser, FiMail, FiLock, FiUserCheck } from 'react-icons/fi';

interface UserFormProps {
  initialValues: UserFormValues;
  isEditMode?: boolean;
  onSubmit: (values: UserFormValues) => void;
}

const validationSchema = Yup.object({
  name: Yup.string().required('Please enter your name'),
  email: Yup.string()
    .email('Please enter a valid email')
    .required('Please enter your email'),
  password: Yup.string()
    .min(6, 'Password must be at least 6 characters')
    .when('isEditMode', {
      is: false,
      then: (schema) => schema.required('Please enter your password'),
      otherwise: (schema) => schema.notRequired(),
    }),
  role: Yup.string()
    .oneOf(['admin', 'manager', 'telecaller', 'user'])
    .required('Role is required'),
});

const UserForm = ({ initialValues, isEditMode = false, onSubmit }: UserFormProps) => {
  return (
    <div className="max-w-6xl mx-auto p-6 bg-white dark:bg-gray-800 shadow-md rounded-xl">
      <h2 className="text-xl font-bold mb-4 dark:text-gray-300">
        {isEditMode ? 'Edit User' : 'Create User'}
      </h2>

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        <Form className="space-y-4 dark:text-gray-300">
          {/* Name */}
          <div>
            <label htmlFor="name" className="block font-medium mb-1 flex items-center gap-2">
              <FiUser /> Name*
            </label>
            <Field
              type="text"
              name="name"
              placeholder="Enter full name"
              className="mt-1 block w-full border border-gray-300 dark:border-gray-600 outline-none dark:bg-gray-700 rounded-md px-3 py-2 shadow-sm focus:ring-2 focus:ring-brand-500 focus:border-brand-500"
            />
            <ErrorMessage name="name" component="div" className="text-red-500 text-sm" />
          </div>

          {/* Email */}
          <div>
            <label htmlFor="email" className="block font-medium mb-1 flex items-center gap-2">
              <FiMail /> Email*
            </label>
            <Field
              type="email"
              name="email"
              placeholder="Enter email address"
              className="mt-1 block w-full border border-gray-300 dark:border-gray-600 outline-none dark:bg-gray-700 rounded-md px-3 py-2 shadow-sm focus:ring-2 focus:ring-brand-500 focus:border-brand-500"
            />
            <ErrorMessage name="email" component="div" className="text-red-500 text-sm" />
          </div>

          {/* Password (only in create mode) */}
          {!isEditMode && (
            <div>
              <label htmlFor="password" className=" font-medium mb-1 flex items-center gap-2">
                <FiLock /> Password*
              </label>
              <Field
                type="password"
                name="password"
                placeholder="Enter password"
                className="mt-1 block w-full border border-gray-300 dark:border-gray-600 outline-none dark:bg-gray-700 rounded-md px-3 py-2 shadow-sm focus:ring-2 focus:ring-brand-500 focus:border-brand-500"
              />
              <ErrorMessage name="password" component="div" className="text-red-500 text-sm" />
            </div>
          )}

          {/* Role */}
          <div>
            <label htmlFor="role" className="block font-medium mb-1 flex items-center gap-2">
              <FiUserCheck /> Role
            </label>
            <Field
              as="select"
              name="role"
              className="mt-1 block w-full border border-gray-300 dark:border-gray-600 outline-none dark:bg-gray-700 rounded-md px-3 py-2 shadow-sm focus:ring-2 focus:ring-brand-500 focus:border-brand-500"
            >
              <option value="">Select role</option>
              <option value="telecaller">Telecaller</option>
              <option value="manager">Manager</option>
              <option value="admin">Admin</option>
              <option value="user">User</option>
            </Field>
            <ErrorMessage name="role" component="div" className="text-red-500 text-sm" />
          </div>

          {/* Submit */}
          <div>
            <button
              type="submit"
              className="bg-brand-500 text-white px-4 py-2 rounded hover:bg-brand-600 transition"
            >
              {isEditMode ? 'Update' : 'Create'}
            </button>
          </div>
        </Form>
      </Formik>
    </div>
  );
};

export default UserForm;
