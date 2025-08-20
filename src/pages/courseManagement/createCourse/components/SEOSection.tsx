// SEOSection.tsx
import { FormikProps } from 'formik';
import { CourseFormValues } from '../types';
import CollapsibleSection from './CollapsibleSection';

const SEOSection = ({ formik }: { formik: FormikProps<CourseFormValues> }) => {
  return (
    <CollapsibleSection title="SEO & Publishing">
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Meta Title
          </label>
          <input
            type="text"
            name="metaTitle"
            value={formik.values.metaTitle}
            onChange={formik.handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Best JEE Physics Course | Exam Preparation"
            maxLength={60}
          />
          <p className="mt-1 text-xs text-gray-500">
            Recommended: 50-60 characters ({formik.values.metaTitle?.length || 0}/60)
          </p>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Meta Description
          </label>
          <textarea
            name="metaDescription"
            value={formik.values.metaDescription}
            onChange={formik.handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Comprehensive JEE Physics course covering all topics with expert faculty..."
            rows={3}
            maxLength={160}
          />
          <p className="mt-1 text-xs text-gray-500">
            Recommended: 150-160 characters ({formik.values.metaDescription?.length || 0}/160)
          </p>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Meta Keywords
          </label>
          <div className="space-y-2">
            {formik.values.metaKeywords.map((keyword, index) => (
              <div key={index} className="flex items-center gap-2">
                <input
                  type="text"
                  value={keyword}
                  onChange={(e) => {
                    const updatedKeywords = [...formik.values.metaKeywords];
                    updatedKeywords[index] = e.target.value;
                    formik.setFieldValue('metaKeywords', updatedKeywords);
                  }}
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder={`Keyword ${index + 1}`}
                />
                {formik.values.metaKeywords.length > 1 && (
                  <button
                    type="button"
                    onClick={() => {
                      const updatedKeywords = formik.values.metaKeywords.filter((_, i) => i !== index);
                      formik.setFieldValue('metaKeywords', updatedKeywords);
                    }}
                    className="p-2 text-red-500 hover:text-red-700"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>
                )}
              </div>
            ))}
            <button
              type="button"
              onClick={() => formik.setFieldValue('metaKeywords', [...formik.values.metaKeywords, ''])}
              className="flex items-center text-sm text-blue-600 hover:text-blue-800 mt-2"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 mr-1"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
                  clipRule="evenodd"
                />
              </svg>
              Add another keyword
            </button>
          </div>
        </div>


        <div className="flex items-center pt-2">
          <input
            type="checkbox"
            id="isPublished"
            name="isPublished"
            checked={formik.values.isPublished}
            onChange={formik.handleChange}
            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
          />
          <label htmlFor="isPublished" className="ml-2 block text-sm text-gray-700">
            Publish Immediately
          </label>
        </div>
      </div>
    </CollapsibleSection>
  );
};

export default SEOSection;