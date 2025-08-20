// validationSchema.ts
import * as Yup from 'yup';

export const courseValidationSchema = Yup.object().shape({
  title: Yup.string().required('Title is required'),
  slug: Yup.string().required('Slug is required'),
  category: Yup.string().required('Category is required'),
  subtitle: Yup.string().required('Subtitle is required'),
  description: Yup.string().required('Description is required'),
  duration: Yup.string().required('Duration is required'),
  successRate: Yup.number()
    .typeError('Success rate must be a number')
    .min(0)
    .max(100)
    .required('Success rate is required'),
  qualifiedCount: Yup.string().required('Qualified count is required'),
  yearsOfExcellence: Yup.number()
    .typeError('Years must be a number')
    .min(0)
    .required('Years of Excellence is required'),
  bannerImage: Yup.mixed().nullable(),

  floatingHighlights: Yup.array()
    .of(Yup.string().required('Highlight cannot be empty'))
    .min(2, 'At least 2 highlights required'),

  examPattern: Yup.object().shape({
    questionFormat: Yup.string().required('Question format is required'),
    duration: Yup.string().required('Exam duration is required'),
    markingSystem: Yup.string().required('Marking system is required'),
  }),

  topicBreakdown: Yup.array().of(
    Yup.object().shape({
      topic: Yup.string().required('Topic is required'),
      percentage: Yup.string().required('Percentage is required'),
    })
  ),

  programs: Yup.array().of(
    Yup.object().shape({
      mode: Yup.string().required(),
      title: Yup.string().required('Program title is required'),
      description: Yup.string().required('Program description is required'),
      price: Yup.number().required('Price is required'),
      priceLabel: Yup.string().required('Price label is required'),
      features: Yup.array().of(Yup.string().required('Feature cannot be empty')),
    })
  ),

  whyChooseUs: Yup.array().of(
    Yup.object().shape({
      icon: Yup.string().required('Icon is required'),
      title: Yup.string().required('Title is required'),
      description: Yup.string().required('Description is required'),
    })
  ),

  topicCoverage: Yup.array().of(
    Yup.object().shape({
      title: Yup.string().required('Title is required'),
      description: Yup.string().required('Description is required'),
    })
  ),

  faculty: Yup.array().of(
    Yup.object().shape({
      name: Yup.string().required('Name is required'),
      designation: Yup.string().required('Designation is required'),
      bio: Yup.string().required('Bio is required'),
      expertise: Yup.array().of(Yup.string().required('Expertise required')),
      photo: Yup.mixed().nullable(),
    })
  ),

  testimonials: Yup.array().of(
    Yup.object().shape({
      name: Yup.string().required('Name is required'),
      scoreSummary: Yup.string().required('Score summary is required'),
      subjectScore: Yup.string().required('Subject score is required'),
      quote: Yup.string().required('Quote is required'),
      photo: Yup.mixed().nullable(),
    })
  ),

  showTrialButton: Yup.boolean(),
  showBrochureButton: Yup.boolean(),
  brochureUrl: Yup.string().when('showBrochureButton', {
  is: true,
  then: (schema) =>
    schema
      .required('Brochure URL is required')
      .url('Brochure URL must be a valid URL'),
  otherwise: (schema) => schema.notRequired(),
}),
  metaTitle: Yup.string().required('Meta title is required'),
  // metaDescription: Yup.string().required('Meta description is required'),
  metaKeywords: Yup.string().required('Meta keywords are required'),
  isPublished: Yup.boolean(),
});
