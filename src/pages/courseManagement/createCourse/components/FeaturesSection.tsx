// FeaturesSection.tsx
import { FormikProps, getIn } from 'formik';
import { CourseFormValues } from '../types';
import CollapsibleSection from './CollapsibleSection';

const FeaturesSection = ({ formik }: { formik: FormikProps<CourseFormValues> }) => {
  const features = formik.values.whyChooseUs || [];

  const handleAddFeature = () => {
    formik.setFieldValue('whyChooseUs', [
      ...features,
      { icon: '', title: '', description: '' }
    ]);
  };

  const handleRemoveFeature = (index: number) => {
    const newFeatures = [...features];
    newFeatures.splice(index, 1);
    formik.setFieldValue('whyChooseUs', newFeatures);
  };

  const handleFeatureChange = (
    index: number,
    field: 'icon' | 'title' | 'description',
    value: string
  ) => {
    const newFeatures = [...features];
    newFeatures[index][field] = value;
    formik.setFieldValue('whyChooseUs', newFeatures);
  };

  return (
    <CollapsibleSection title="Why Choose Us (Features)">
      <div className="space-y-6">
        {features.map((feature, index) => (
          <div key={index} className="border border-gray-200 rounded-lg p-4 relative">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  FontAwesome Icon*
                </label>
                <input
                  type="text"
                  value={feature.icon}
                  onChange={(e) => handleFeatureChange(index, 'icon', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="e.g. fa-atom"
                />
                {getIn(formik.touched, `whyChooseUs.${index}.icon`) &&
                  getIn(formik.errors, `whyChooseUs.${index}.icon`) && (
                    <p className="mt-1 text-sm text-red-600">
                      {getIn(formik.errors, `whyChooseUs.${index}.icon`)}
                    </p>
                  )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Title*
                </label>
                <input
                  type="text"
                  value={feature.title}
                  onChange={(e) => handleFeatureChange(index, 'title', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Feature title"
                />
                {getIn(formik.touched, `whyChooseUs.${index}.title`) &&
                  getIn(formik.errors, `whyChooseUs.${index}.title`) && (
                    <p className="mt-1 text-sm text-red-600">
                      {getIn(formik.errors, `whyChooseUs.${index}.title`)}
                    </p>
                  )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Description*
                </label>
                <textarea
                  value={feature.description}
                  onChange={(e) => handleFeatureChange(index, 'description', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Feature description"
                  rows={3}
                />
                {getIn(formik.touched, `whyChooseUs.${index}.description`) &&
                  getIn(formik.errors, `whyChooseUs.${index}.description`) && (
                    <p className="mt-1 text-sm text-red-600">
                      {getIn(formik.errors, `whyChooseUs.${index}.description`)}
                    </p>
                  )}
              </div>
            </div>
            {features.length > 1 && (
              <button
                type="button"
                onClick={() => handleRemoveFeature(index)}
                className="absolute top-2 right-2 text-red-500 hover:text-red-700"
              >
                Remove
              </button>
            )}
          </div>
        ))}

        <button
          type="button"
          onClick={handleAddFeature}
          className="flex items-center text-sm text-blue-600 hover:text-blue-800 mt-2"
        >
          Add Feature
        </button>
      </div>
    </CollapsibleSection>
  );
};

export default FeaturesSection;