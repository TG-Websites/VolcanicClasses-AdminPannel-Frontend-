// TopicCoverageSection.tsx
import { FormikProps } from 'formik';
import { CourseFormValues } from '../types';
import CollapsibleSection from './CollapsibleSection';

const TopicCoverageSection = ({ formik }: { formik: FormikProps<CourseFormValues> }) => {
  const topics = formik.values.topicCoverage || [];

  const handleAddTopic = () => {
    formik.setFieldValue('topicCoverage', [
      ...topics,
      { title: '', description: '' }
    ]);
  };

  const handleRemoveTopic = (index: number) => {
    const newTopics = [...topics];
    newTopics.splice(index, 1);
    formik.setFieldValue('topicCoverage', newTopics);
  };

  const handleTopicChange = (
    index: number,
    field: 'title' | 'description',
    value: string
  ) => {
    const newTopics = [...topics];
    newTopics[index][field] = value;
    formik.setFieldValue('topicCoverage', newTopics);
  };

  return (
    <CollapsibleSection title="Topics Covered">
      <div className="space-y-6">
        {topics.map((topic, index) => (
          <div key={index} className="border border-gray-200 rounded-lg p-4 relative">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Section Title
                </label>
                <input
                  type="text"
                  value={topic.title}
                  onChange={(e) => handleTopicChange(index, 'title', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="e.g. Mechanics, Thermodynamics"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Topics List
                </label>
                <textarea
                  value={topic.description}
                  onChange={(e) => handleTopicChange(index, 'description', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="List topics separated by commas or new lines"
                  rows={4}
                />
              </div>
            </div>
            {topics.length > 1 && (
              <button
                type="button"
                onClick={() => handleRemoveTopic(index)}
                className="absolute top-2 right-2 text-red-500 hover:text-red-700"
              >
                Remove
              </button>
            )}
          </div>
        ))}

        <button
          type="button"
          onClick={handleAddTopic}
          className="px-4 py-2 text-blue-500"
        >
          + Add Topic Section
        </button>
      </div>
    </CollapsibleSection>
  );
};

export default TopicCoverageSection;