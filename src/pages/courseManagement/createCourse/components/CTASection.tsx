// CTASection.tsx
import { FormikProps } from 'formik';
import { CourseFormValues } from '../types';
import CollapsibleSection from './CollapsibleSection';

const CTASection = ({ formik }: { formik: FormikProps<CourseFormValues> }) => {
  return (
    <CollapsibleSection title="Call to Action">
      <div className="space-y-4">
        <div className="flex items-center">
          <input
            type="checkbox"
            id="showTrialButton"
            name="showTrialButton"
            checked={formik.values.showTrialButton}
            onChange={formik.handleChange}
            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
          />
          <label htmlFor="showTrialButton" className="ml-2 block text-sm text-gray-700">
            Show Free Trial Button
          </label>
        </div>

        <div className="flex items-center">
          <input
            type="checkbox"
            id="showBrochureButton"
            name="showBrochureButton"
            checked={formik.values.showBrochureButton}
            onChange={formik.handleChange}
            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
          />
          <label htmlFor="showBrochureButton" className="ml-2 block text-sm text-gray-700">
            Show Download Brochure Button
          </label>
        </div>

        {formik.values.showBrochureButton && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Brochure File URL
            </label>
            <input
              type="url"
              name="brochureUrl"
              value={formik.values.brochureUrl}
              onChange={formik.handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="https://example.com/brochure.pdf"
            />
          </div>
        )}
      </div>
    </CollapsibleSection>
  );
};

export default CTASection;