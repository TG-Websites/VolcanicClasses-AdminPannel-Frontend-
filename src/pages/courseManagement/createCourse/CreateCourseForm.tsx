// CreateCourseForm.tsx
import { useFormik } from 'formik';
import BasicInfoSection from './components/BasicInfoSection';
import KeyMetricsSection from './components/KeyMetricsSection';
import MediaSection from './components/MediaSection';
import ExamPatternSection from './components/ExamPatternSection';
import TopicBreakdownSection from './components/TopicBreakdownSection';
import ProgramsSection from './components/ProgramsSection';
import FeaturesSection from './components/FeaturesSection';
import TopicCoverageSection from './components/TopicCoverageSection';
import FacultySection from './components/FacultySection';
import TestimonialsSection from './components/TestimonialsSection';
import CTASection from './components/CTASection';
import SEOSection from './components/SEOSection';
import { CourseFormValues } from './types';
// import { courseValidationSchema } from './validationSchema';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../../redux/store';
import { createCourse } from '../../../redux/slices/course';
import { useNavigate } from 'react-router';
import toast from 'react-hot-toast';

const CreateCourseForm = () => {
  const initialValues: CourseFormValues = {
    title: '',
    slug: '',
    category: '',
    subtitle: '',
    description: '',
    duration: '',
    successRate: 0,
    qualifiedCount: '',
    yearsOfExcellence: 0,
    bannerImageUrl: null,
    floatingHighlights: ['', ''],
    examPattern: {
      questionFormat: '',
      duration: '',
      markingSystem: '',
    },
    topicBreakdown: [
      { topic: '', percentage: '' },
      { topic: '', percentage: '' },
    ],
    programs: [
      {
        mode: 'online',
        title: '',
        description: '',
        price: 0,
        priceLabel: '',
        features: ['', ''],
      },
    ],
    whyChooseUs: [
      {
        icon: '',
        title: '',
        description: '',
      },
    ],
    topicCoverage: [
      {
        title: '',
        description: '',
      },
    ],
    faculty: [
      {
        name: '',
        designation: '',
        bio: '',
        expertise: [''],
        photoUrl: null,
      },
    ],
    testimonials: [
      {
        name: '',
        scoreSummary: '',
        subjectScore: '',
        quote: '',
        photoUrl: null,
      },
    ],
    showTrialButton: false,
    showBrochureButton: false,
    brochureUrl: '',
    metaTitle: '',
    metaDescription: '',
    metaKeywords: [],
    isPublished: false,
  };

  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate()
  const formik = useFormik({
    initialValues,
    // validationSchema: courseValidationSchema,
    onSubmit: async (values) => {
      const result = await dispatch(createCourse(values));
      if (createCourse.fulfilled.match(result)) {
        toast.success("Create Course Successfully")
        navigate("/course/list")
      }
    },
  });

  return (
    <div className="max-w-7xl mx-auto sm:p-6  bg-white rounded-xl dark:bg-black ">
      <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-300 mb-6">Create New Course</h1>

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
            className="py-2 px-4 sm:py-3 sm:px-6 bg-brand-500 hover:bg-brand-600 text-white rounded-md transition-colors"

          >
            Create Course
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateCourseForm;
