// CourseEditForm.tsx
import { useFormik } from 'formik';
import BasicInfoSection from '../../createCourse/components/BasicInfoSection';
import KeyMetricsSection from '../../createCourse/components/KeyMetricsSection';
import MediaSection from '../../createCourse/components/MediaSection';
import ExamPatternSection from '../../createCourse/components/ExamPatternSection';
import TopicBreakdownSection from '../../createCourse/components/TopicBreakdownSection';
import ProgramsSection from '../../createCourse/components/ProgramsSection';
import FeaturesSection from '../../createCourse/components/FeaturesSection';
import TopicCoverageSection from '../../createCourse/components/TopicCoverageSection';
import FacultySection from '../../createCourse/components/FacultySection';
import TestimonialsSection from '../../createCourse/components/TestimonialsSection';
import CTASection from '../../createCourse/components/CTASection';
import SEOSection from '../../createCourse/components/SEOSection';
import { CourseFormValues } from '../../createCourse/types';

interface CourseEditFormProps {
  initialData: CourseFormValues;
  onSubmit: (values: CourseFormValues) => void;
}

const CourseEditForm = ({ initialData, onSubmit }: CourseEditFormProps) => {
  const formik = useFormik({
    initialValues: initialData,
    enableReinitialize: true,
    onSubmit,
  });

  return (
    <div className="max-w-7xl mx-auto p-6 bg-white dark:bg-black rounded-xl">
      <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100 mb-6">Edit Course</h1>

      <form onSubmit={formik.handleSubmit} className="p-6 space-y-6">
        <BasicInfoSection formik={formik} />
        <KeyMetricsSection formik={formik} />
        <MediaSection formik={formik} />
        <ExamPatternSection formik={formik} />
        <TopicBreakdownSection formik={formik} />
        <ProgramsSection formik={formik} />
        <FeaturesSection formik={formik} />
        <TopicCoverageSection formik={formik} />
        <FacultySection formik={formik} />
        <TestimonialsSection formik={formik} />
        <CTASection formik={formik} />
        <SEOSection formik={formik} />

        <div className="pt-4">
          <button
            type="submit"
            className="px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-md transition-colors"
          >
            Update Course
          </button>
        </div>
      </form>
    </div>
  );
};

export default CourseEditForm;
