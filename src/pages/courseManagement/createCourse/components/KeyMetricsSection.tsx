// KeyMetricsSection.tsx
import { FormikProps } from 'formik';
import { CourseFormValues } from '../types';
import CollapsibleSection from './CollapsibleSection';

const KeyMetricsSection = ({ formik }: { formik: FormikProps<CourseFormValues> }) => {
  return (
    <CollapsibleSection title="Key Metrics">
      <div className="space-y-4 dark:text-gray-300">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Success Rate (%)*</label>
          <input
            type="number"
            name="successRate"
            onChange={formik.handleChange}
            value={formik.values.successRate}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Success Rate (%)"
            min="0"
            max="100"
          />
          {formik.touched.successRate && formik.errors.successRate && (
            <p className="mt-1 text-sm text-red-600">{formik.errors.successRate}</p>
          )}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Qualified Students*</label>
          <input
            type="text"
            name="qualifiedCount"
            onChange={formik.handleChange}
            value={formik.values.qualifiedCount}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Qualified Students (e.g. 500+)"
            autoComplete='off'
          />
          {formik.touched.qualifiedCount && formik.errors.qualifiedCount && (
            <p className="mt-1 text-sm text-red-600">{formik.errors.qualifiedCount}</p>
          )}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Years of Excellence*</label>
          <input
            type="number"
            name="yearsOfExcellence"
            onChange={formik.handleChange}
            value={formik.values.yearsOfExcellence}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Years of Excellence"
            min="0"
          />
          {formik.touched.yearsOfExcellence && formik.errors.yearsOfExcellence && (
            <p className="mt-1 text-sm text-red-600">{formik.errors.yearsOfExcellence}</p>
          )}
        </div>
      </div>
    </CollapsibleSection>
  );
};

export default KeyMetricsSection;