// ScheduleClassForm.tsx
import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { ClassesFormValues } from '../type';
import { FieldProps } from 'formik';
import CourseDropdown from './CourseDropdown';

interface ScheduleClassFormProps {
  initialValues: ClassesFormValues;
  onSubmit: (values: ClassesFormValues) => void;
  title?: string;
  submitLabel?: string;
}

const validationSchema = Yup.object().shape({
  course: Yup.string().required('Course ID is required'),
  instructor: Yup.string().required('Instructor ID is required'),
  date: Yup.date().required('Date is required'),
  time: Yup.string().required('Time is required'),
  mode: Yup.string().oneOf(['online', 'offline']).required('Mode is required'),
  link: Yup.string().url('Must be a valid URL').required('Link is required'),
  isCancelled: Yup.boolean(),
});

const ScheduleClassForm: React.FC<ScheduleClassFormProps> = ({
  initialValues,
  onSubmit,
  title = 'Create Session',
  submitLabel = 'Create Session',
}) => {
  return (
    <div className="flex flex-col items-center justify-center w-full max-w-6xl rounded-xl bg-white dark:bg-gray-800 mx-auto p-6 shadow">
      <h2 className="text-xl font-bold mb-6 text-gray-900 dark:text-white">{title}</h2>

      <Formik<ClassesFormValues>
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
        enableReinitialize
      >
        {() => (
          <Form className="w-full grid grid-cols-1 md:grid-cols-2 gap-6  dark:text-gray-300">
            {/* Course ID */}
            <div className="col-span-1">
              <CourseDropdown/>
              <ErrorMessage name="course" component="div" className="text-red-500 text-sm mt-1" />
            </div>

            {/* Instructor ID */}
            <div className="col-span-1">
              <label className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">Instructor Name</label>
              <Field
                name="instructor"
                className="mt-1 block w-full border border-gray-300 dark:border-gray-600 outline-none dark:bg-gray-700 rounded-md px-3 py-2 shadow-sm focus:ring-2 focus:ring-brand-500 focus:border-brand-500"
                placeholder="Enter Instructor ID"
              />
              <ErrorMessage name="instructor" component="div" className="text-red-500 text-sm mt-1" />
            </div>

            {/* Date */}
            <div className="col-span-1">
              <label className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">Date</label>

              <Field name="date">
                {({ field, form }: FieldProps) => (
                  <DatePicker
                    selected={field.value ? new Date(field.value) : null}
                    onChange={(date: Date | null) =>
                      form.setFieldValue(
                        'date',
                        date
                          ? `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(
                            date.getDate()
                          ).padStart(2, '0')}`
                          : ''
                      )
                    }
                    className="mt-1 block w-full border border-gray-300 dark:border-gray-600 outline-none dark:bg-gray-700 rounded-md px-3 py-2 shadow-sm focus:ring-2 focus:ring-brand-500 focus:border-brand-500"
                    placeholderText="Select a date"
                    dateFormat="yyyy-MM-dd"
                  />
                )}
              </Field>
              <ErrorMessage name="date" component="div" className="text-red-500 text-sm mt-1" />
            </div>

            {/* Time */}
            <div className="col-span-1">
              <label className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">Time</label>
              <Field
                type="text"
                name="time"
                className="mt-1 block w-full border border-gray-300 dark:border-gray-600 outline-none dark:bg-gray-700 rounded-md px-3 py-2 shadow-sm focus:ring-2 focus:ring-brand-500 focus:border-brand-500"
                placeholder="e.g. 10:30 AM"
              />
              <ErrorMessage name="time" component="div" className="text-red-500 text-sm mt-1" />
            </div>

            {/* Mode */}
            <div className="col-span-1">
              <label className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">Mode</label>
              <Field
                as="select"
                name="mode"
                className="mt-1 block w-full border border-gray-300 dark:border-gray-600 outline-none dark:bg-gray-700 rounded-md px-3 py-2 shadow-sm focus:ring-2 focus:ring-brand-500 focus:border-brand-500"
              >
                <option value="">Select mode</option>
                <option value="online">Online</option>
                <option value="offline">Offline</option>
                <option value="hydrid">Hybrid</option>
              </Field>
              <ErrorMessage name="mode" component="div" className="text-red-500 text-sm mt-1" />
            </div>

            {/* Meeting Link */}
            <div className="col-span-1">
              <label className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">Meeting Link</label>
              <Field
                name="link"
                className="mt-1 block w-full border border-gray-300 dark:border-gray-600 outline-none dark:bg-gray-700 rounded-md px-3 py-2 shadow-sm focus:ring-2 focus:ring-brand-500 focus:border-brand-500"
                placeholder="Enter meeting URL"
              />
              <ErrorMessage name="link" component="div" className="text-red-500 text-sm mt-1" />
            </div>

            {/* Is Cancelled */}
            <div className="col-span-1 flex items-center space-x-2 mt-1">
              <Field type="checkbox" name="isCancelled" className="accent-brand-500" />
              <label className="text-sm text-gray-700 dark:text-gray-300 ">Is this session cancelled?</label>
            </div>

            {/* Submit Button - Full width on small, half on medium+ */}
            <div className="col-span-full">
              <button
                type="submit"
                className="w-full md:w-auto px-6 py-2 text-white bg-brand-500 hover:bg-brand-600  rounded transition"
              >
                {submitLabel}
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>

  );
};

export default ScheduleClassForm;
