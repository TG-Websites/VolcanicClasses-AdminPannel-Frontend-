import { FormikProps, getIn } from 'formik';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CourseFormValues } from '../types';
import CollapsibleSection from './CollapsibleSection';
import { AppDispatch, RootState } from '../../../../redux/store';
import { uploadImage, resetImageState } from '../../../../redux/slices/cloudinary';

const TestimonialsSection = ({ formik }: { formik: FormikProps<CourseFormValues> }) => {
  const testimonials = formik.values.testimonials || [];
  const dispatch = useDispatch<AppDispatch>();
  const { url, key, uploading } = useSelector((state: RootState) => state.cloudinary);

  const [uploadingIndex, setUploadingIndex] = useState<number | null>(null);

  const handleAddTestimonial = () => {
    formik.setFieldValue('testimonials', [
      ...testimonials,
      { name: '', scoreSummary: '', subjectScore: '', quote: '', photoUrl: null }, // <- photoUrl
    ]);
  };

  const handleRemoveTestimonial = (index: number) => {
    const newTestimonials = testimonials.filter((_, i) => i !== index);
    formik.setFieldValue('testimonials', newTestimonials);
  };

  const handleTestimonialChange = (
    index: number,
    field: 'name' | 'scoreSummary' | 'subjectScore' | 'quote',
    value: string
  ) => {
    const newTestimonials = [...testimonials];
    newTestimonials[index][field] = value;
    formik.setFieldValue('testimonials', newTestimonials);
  };

  const handlePhotoChange = (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploadingIndex(index);
    dispatch(uploadImage({ file, key: "testimonials" }));
  };

  useEffect(() => {
    if (url !== null && key !== null && key === "testimonials" && uploadingIndex !== null) {
      const newTestimonials = [...testimonials];
      newTestimonials[uploadingIndex].photoUrl = url; // align with schema/type
      formik.setFieldValue('testimonials', newTestimonials);
      dispatch(resetImageState());
      setUploadingIndex(null);
    }
  }, [url]);

  const err = (path: string) => getIn(formik.errors, path);
  const touched = (path: string) => getIn(formik.touched, path);

  return (
    <CollapsibleSection title="Student Testimonials">
      <div className="space-y-6">
        {testimonials.map((testimonial, index) => (
          <div key={index} className="border border-gray-200 rounded-lg p-4 relative">
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Name */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Student Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={testimonial.name}
                    onChange={(e) => handleTestimonialChange(index, 'name', e.target.value)}
                    onBlur={formik.handleBlur}
                    name={`testimonials.${index}.name`}
                    className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 ${touched(`testimonials.${index}.name`) && err(`testimonials.${index}.name`)
                      ? 'border-red-500 focus:ring-red-500'
                      : 'border-gray-300 focus:ring-blue-500'
                      }`}
                  />
                  {touched(`testimonials.${index}.name`) && err(`testimonials.${index}.name`) && (
                    <p className="mt-1 text-sm text-red-600">{err(`testimonials.${index}.name`)}</p>
                  )}
                </div>

                {/* Score Summary */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Score Summary <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={testimonial.scoreSummary}
                    onChange={(e) => handleTestimonialChange(index, 'scoreSummary', e.target.value)}
                    onBlur={formik.handleBlur}
                    name={`testimonials.${index}.scoreSummary`}
                    className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 ${touched(`testimonials.${index}.scoreSummary`) &&
                      err(`testimonials.${index}.scoreSummary`)
                      ? 'border-red-500 focus:ring-red-500'
                      : 'border-gray-300 focus:ring-blue-500'
                      }`}
                  />
                  {touched(`testimonials.${index}.scoreSummary`) &&
                    err(`testimonials.${index}.scoreSummary`) && (
                      <p className="mt-1 text-sm text-red-600">
                        {err(`testimonials.${index}.scoreSummary`)}
                      </p>
                    )}
                </div>

                {/* Subject Score */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Subject Score <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={testimonial.subjectScore}
                    onChange={(e) => handleTestimonialChange(index, 'subjectScore', e.target.value)}
                    onBlur={formik.handleBlur}
                    name={`testimonials.${index}.subjectScore`}
                    className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 ${touched(`testimonials.${index}.subjectScore`) &&
                      err(`testimonials.${index}.subjectScore`)
                      ? 'border-red-500 focus:ring-red-500'
                      : 'border-gray-300 focus:ring-blue-500'
                      }`}
                  />
                  {touched(`testimonials.${index}.subjectScore`) &&
                    err(`testimonials.${index}.subjectScore`) && (
                      <p className="mt-1 text-sm text-red-600">
                        {err(`testimonials.${index}.subjectScore`)}
                      </p>
                    )}
                </div>
              </div>

              {/* Quote */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Student Quote <span className="text-red-500">*</span>
                </label>
                <textarea
                  value={testimonial.quote}
                  onChange={(e) => handleTestimonialChange(index, 'quote', e.target.value)}
                  onBlur={formik.handleBlur}
                  name={`testimonials.${index}.quote`}
                  className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 ${touched(`testimonials.${index}.quote`) && err(`testimonials.${index}.quote`)
                    ? 'border-red-500 focus:ring-red-500'
                    : 'border-gray-300 focus:ring-blue-500'
                    }`}
                  rows={3}
                />
                {touched(`testimonials.${index}.quote`) && err(`testimonials.${index}.quote`) && (
                  <p className="mt-1 text-sm text-red-600">{err(`testimonials.${index}.quote`)}</p>
                )}
              </div>

              {/* Photo */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Student Photo
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handlePhotoChange(index, e)}
                  disabled={uploading}
                  className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                />
                {uploadingIndex === index && uploading && (
                  <div className="mt-1 text-yellow-500 text-sm">Uploading...</div>
                )}
                {testimonial.photoUrl && typeof testimonial.photoUrl === 'string' && (
                  <div className="mt-2">
                    <img
                      src={testimonial.photoUrl}
                      alt={`Student ${testimonial.name}`}
                      className="w-24 h-24 object-cover rounded-md border"
                    />
                  </div>
                )}
                {/* photoUrl validation (if you set it required in schema later) */}
                {touched(`testimonials.${index}.photoUrl`) &&
                  err(`testimonials.${index}.photoUrl`) && (
                    <p className="mt-1 text-sm text-red-600">
                      {err(`testimonials.${index}.photoUrl`)}
                    </p>
                  )}
              </div>
            </div>

            {testimonials.length > 1 && (
              <button
                type="button"
                onClick={() => handleRemoveTestimonial(index)}
                className="absolute top-2 right-2 text-red-500 hover:text-red-700"
              >
                Remove
              </button>
            )}
          </div>
        ))}

        <button
          type="button"
          onClick={handleAddTestimonial}
          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
        >
          Add Testimonial
        </button>
      </div>
    </CollapsibleSection>
  );
};

export default TestimonialsSection;
