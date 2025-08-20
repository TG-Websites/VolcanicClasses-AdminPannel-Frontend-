// ExamPatternSection.tsx
import { FormikProps } from 'formik';
import { CourseFormValues } from '../types';
import CollapsibleSection from './CollapsibleSection';

const ExamPatternSection = ({ formik }: { formik: FormikProps<CourseFormValues> }) => {
  return (
    <CollapsibleSection title="Exam Pattern Details">
      <div className="space-y-4">
        {/* Question Format */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Question Format</label>
          <input
            type="text"
            name="examPattern.questionFormat"
            onChange={formik.handleChange}
            value={formik.values.examPattern.questionFormat}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="e.g., Multiple Choice Questions (MCQs)"
          />
          <p className="mt-1 text-xs text-gray-500">Describe the type of questions in the exam</p>
        </div>

        {/* Exam Duration */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Exam Duration</label>
          <input
            type="text"
            name="examPattern.duration"
            onChange={formik.handleChange}
            value={formik.values.examPattern.duration}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="e.g., 3 hours"
          />
          <p className="mt-1 text-xs text-gray-500">Total time allotted for the exam</p>
        </div>

        {/* Marking System */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Marking System</label>
          <input
            type="text"
            name="examPattern.markingSystem"
            onChange={formik.handleChange}
            value={formik.values.examPattern.markingSystem}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="e.g., +4 for correct, -1 for wrong"
          />
          <p className="mt-1 text-xs text-gray-500">Scoring pattern including negative marking</p>
        </div>
      </div>
    </CollapsibleSection>
  );
};

export default ExamPatternSection;