// TopicBreakdownSection.tsx
import { FormikProps, getIn } from 'formik';
import { CourseFormValues } from '../types';
import CollapsibleSection from './CollapsibleSection';

const TopicBreakdownSection = ({ formik }: { formik: FormikProps<CourseFormValues> }) => {
  const addTopic = () => {
    formik.setFieldValue('topicBreakdown', [
      ...formik.values.topicBreakdown,
      { topic: '', percentage: '' },
    ]);
  };

  const removeTopic = (index: number) => {
    const topics = [...formik.values.topicBreakdown];
    topics.splice(index, 1);
    formik.setFieldValue('topicBreakdown', topics);
  };

  const handleTopicChange = (
    index: number,
    field: 'topic' | 'percentage',
    value: string
  ) => {
    const topics = [...formik.values.topicBreakdown];
    topics[index] = {
      ...topics[index],
      [field]:
        field === 'percentage'
          ? value === '' // keep empty value
            ? ''
            : Number(value) // cast to number for schema (0-100)
          : value,
    };
    formik.setFieldValue('topicBreakdown', topics);
  };

  const err = (path: string) => getIn(formik.errors, path);
  const touched = (path: string) => getIn(formik.touched, path);

  const total = formik.values.topicBreakdown.reduce(
    (sum, item) => sum + (item.percentage === '' ? 0 : Number(item.percentage)),
    0
  );

  return (
    <CollapsibleSection title="Topic Breakdown">
      <div className="space-y-4">
        <div className="grid grid-cols-12 gap-2 items-center mb-2">
          <div className="col-span-7 text-sm font-medium text-gray-700">
            Topic <span className="text-red-500">*</span>
          </div>
          <div className="col-span-4 text-sm font-medium text-gray-700">
            Percentage <span className="text-red-500">*</span>
          </div>
          <div className="col-span-1"></div>
        </div>

        {formik.values.topicBreakdown.map((topic, index) => (
          <div key={index}>
            <div className="grid grid-cols-12 gap-2 items-center">
              {/* Topic */}
              <div className="col-span-7">
                <input
                  type="text"
                  value={topic.topic}
                  onChange={(e) => handleTopicChange(index, 'topic', e.target.value)}
                  onBlur={formik.handleBlur}
                  name={`topicBreakdown.${index}.topic`}
                  className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 ${touched(`topicBreakdown.${index}.topic`) &&
                      err(`topicBreakdown.${index}.topic`)
                      ? 'border-red-500 focus:ring-red-500'
                      : 'border-gray-300 focus:ring-blue-500'
                    }`}
                  placeholder={`Topic ${index + 1}`}
                />
                {touched(`topicBreakdown.${index}.topic`) &&
                  err(`topicBreakdown.${index}.topic`) && (
                    <p className="mt-1 text-sm text-red-600">
                      {err(`topicBreakdown.${index}.topic`)}
                    </p>
                  )}
              </div>

              {/* Percentage */}
              <div className="col-span-4">
                <div className="relative">
                  <input
                    type="number"
                    value={topic.percentage === '' ? '' : topic.percentage}
                    onChange={(e) => handleTopicChange(index, 'percentage', e.target.value)}
                    onBlur={formik.handleBlur}
                    name={`topicBreakdown.${index}.percentage`}
                    className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 ${touched(`topicBreakdown.${index}.percentage`) &&
                        err(`topicBreakdown.${index}.percentage`)
                        ? 'border-red-500 focus:ring-red-500'
                        : 'border-gray-300 focus:ring-blue-500'
                      }`}
                    placeholder="%"
                    min={0}
                    max={100}
                  />
                  <span className="absolute right-3 top-2.5 text-gray-400">%</span>
                </div>
                {touched(`topicBreakdown.${index}.percentage`) &&
                  err(`topicBreakdown.${index}.percentage`) && (
                    <p className="mt-1 text-sm text-red-600">
                      {err(`topicBreakdown.${index}.percentage`)}
                    </p>
                  )}
              </div>

              {/* Remove */}
              <div className="col-span-1 flex justify-center">
                {formik.values.topicBreakdown.length > 2 && (
                  <button
                    type="button"
                    onClick={() => removeTopic(index)}
                    className="text-red-500 hover:text-red-700"
                    aria-label={`Remove Topic ${index + 1}`}
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
            </div>
          </div>
        ))}

        <button
          type="button"
          onClick={addTopic}
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
          Add another topic
        </button>

        {/* Total percentage indicator */}
        {formik.values.topicBreakdown.length > 0 && (
          <div className="mt-4 pt-4 border-t border-gray-200">
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium text-gray-700">Total Percentage:</span>
              <span className="text-lg font-semibold">{total}%</span>
            </div>
            <div className="h-2 bg-gray-200 rounded-full mt-2 overflow-hidden">
              <div
                className="h-full bg-blue-500 rounded-full"
                style={{ width: `${Math.min(total, 100)}%` }}
              />
            </div>
            <p className="text-xs text-gray-500 mt-1">
              {total > 100 ? 'Warning: Total exceeds 100%' : total < 100 ? 'Add more topics to reach 100%' : 'Perfect! Total is 100%'}
            </p>
          </div>
        )}
      </div>
    </CollapsibleSection>
  );
};

export default TopicBreakdownSection;
