// BasicInfoSection.tsx
import { FormikProps } from 'formik';
import { CourseFormValues } from '../types';
import CollapsibleSection from './CollapsibleSection';



const BasicInfoSection = ({ formik }: { formik: FormikProps<CourseFormValues> }) => {
  


  return (
    <CollapsibleSection title="Basic Course Info "  defaultOpen={true}>
      <div className="space-y-4 dark:text-gray-300">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Course Title*</label>
          <input
            type="text"
            name="title"
            onChange={formik.handleChange}
            value={formik.values.title}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-500"
            placeholder="Course Title"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">URL Slug*</label>
          <input
            type="text"
            name="slug"
            onChange={formik.handleChange}
            value={formik.values.slug}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-500"
            placeholder="URL Slug (e.g., jee-mains)"
            required
            autoComplete='off'
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Category*</label>
          <select
            name="category"
            onChange={formik.handleChange}
            value={formik.values.category}
            className="w-full px-3 py-2 border border-gray-300 dark:bg-black rounded-md focus:outline-none focus:ring-2 focus:ring-brand-500"
            required
          >
            <option value="">Select Category</option>
            <option value="JEE">JEE</option>
            <option value="NEET">NEET</option>
            <option value="Boards">11th & 12th Boards</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Subtitle</label>
          <input
            type="text"
            name="subtitle"
            onChange={formik.handleChange}
            value={formik.values.subtitle}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-500"
            placeholder="Subtitle"
             autoComplete='off'
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Description</label>
          <textarea
            name="description"
            onChange={formik.handleChange}
            value={formik.values.description}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-500"
            placeholder="Course Overview / Introduction"
            rows={4}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Duration</label>
          <input
            type="text"
            name="duration"
            onChange={formik.handleChange}
            value={formik.values.duration}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-500"
            placeholder="Course Duration"
             autoComplete='off'
          />
        </div>
      </div>
    </CollapsibleSection>
  );
};

export default BasicInfoSection;