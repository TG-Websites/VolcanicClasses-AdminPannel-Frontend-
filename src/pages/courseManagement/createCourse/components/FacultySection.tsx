import { FormikProps } from 'formik';
import { useState, useEffect } from 'react';
import { CourseFormValues } from '../types';
import CollapsibleSection from './CollapsibleSection';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../../../redux/store';
import { uploadImage, resetImageState } from '../../../../redux/slices/cloudinary';

const FacultySection = ({ formik }: { formik: FormikProps<CourseFormValues> }) => {
  const facultyMembers = formik.values.faculty || [];
  const dispatch = useDispatch<AppDispatch>();
  const { url, uploading } = useSelector((state: RootState) => state.cloudinary);

  const [uploadingIndex, setUploadingIndex] = useState<number | null>(null);

  const handleAddFaculty = () => {
    formik.setFieldValue('faculty', [
      ...facultyMembers,
      { name: '', designation: '', bio: '', expertise: [], photo: null },
    ]);
  };

  const handleRemoveFaculty = (index: number) => {
    const newFaculty = facultyMembers.filter((_, i) => i !== index);
    formik.setFieldValue('faculty', newFaculty);
  };

  const handleFacultyChange = (
    index: number,
    field: 'name' | 'designation' | 'bio',
    value: string
  ) => {
    const newFaculty = [...facultyMembers];
    newFaculty[index][field] = value;
    formik.setFieldValue('faculty', newFaculty);
  };

  const handleExpertiseChange = (index: number, expertiseIndex: number, value: string) => {
    const newFaculty = [...facultyMembers];
    newFaculty[index].expertise[expertiseIndex] = value;
    formik.setFieldValue('faculty', newFaculty);
  };

  const handleAddExpertise = (index: number) => {
    const newFaculty = [...facultyMembers];
    newFaculty[index].expertise.push('');
    formik.setFieldValue('faculty', newFaculty);
  };

  const handleRemoveExpertise = (facultyIndex: number, expertiseIndex: number) => {
    const newFaculty = [...facultyMembers];
    newFaculty[facultyIndex].expertise.splice(expertiseIndex, 1);
    formik.setFieldValue('faculty', newFaculty);
  };

  const handlePhotoChange = (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploadingIndex(index);
    dispatch(uploadImage(file));
  };

  // After upload completes, update the faculty's photo
  useEffect(() => {
    if (url !== null && uploadingIndex !== null) {
      const newFaculty = [...facultyMembers];
      newFaculty[uploadingIndex].photoUrl = url;
      formik.setFieldValue('faculty', newFaculty);
      dispatch(resetImageState());
      setUploadingIndex(null);
    }
  }, [url]);

  return (
    <CollapsibleSection title="Faculty Details">
      <div className="space-y-6">
        {facultyMembers.map((faculty, index) => (
          <div key={index} className="border border-gray-200 rounded-lg p-4 relative">
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Faculty Name*</label>
                  <input
                    type="text"
                    value={faculty.name}
                    onChange={(e) => handleFacultyChange(index, 'name', e.target.value)}
                    className="w-full px-3 py-2 border rounded-md"
                    placeholder="Dr. John Doe"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Designation*</label>
                  <input
                    type="text"
                    value={faculty.designation}
                    onChange={(e) => handleFacultyChange(index, 'designation', e.target.value)}
                    className="w-full px-3 py-2 border rounded-md"
                    placeholder="Senior Physics Professor"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Bio / Experience Summary*</label>
                <textarea
                  value={faculty.bio}
                  onChange={(e) => handleFacultyChange(index, 'bio', e.target.value)}
                  className="w-full px-3 py-2 border rounded-md"
                  placeholder="Summary of qualifications and experience..."
                  rows={3}
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Expertise Areas</label>
                <div className="space-y-2">
                  {faculty.expertise.map((exp, expIndex) => (
                    <div key={expIndex} className="flex items-center gap-2">
                      <input
                        type="text"
                        value={exp}
                        onChange={(e) => handleExpertiseChange(index, expIndex, e.target.value)}
                        className="flex-1 px-3 py-2 border rounded-md"
                        placeholder="e.g. Quantum Mechanics"
                      />
                      <button
                        type="button"
                        onClick={() => handleRemoveExpertise(index, expIndex)}
                        className="text-red-500 hover:text-red-700"
                      >
                        Remove
                      </button>
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={() => handleAddExpertise(index)}
                    className="text-sm text-blue-500 hover:text-blue-700"
                  >
                    + Add Expertise Area
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Faculty Photo</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handlePhotoChange(index, e)}
                  disabled={uploading}
                  className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                />
                {uploadingIndex === index && uploading && (
                  <div className="mt-1 text-yellow-500 text-sm">Uploading...</div>
                )}
                {faculty.photoUrl && typeof faculty.photoUrl === 'string' && (
                  <div className="mt-2">
                    <img
                      src={faculty.photoUrl}
                      alt={`Faculty ${faculty.name}`}
                      className="w-24 h-24 object-cover rounded-md border"
                    />
                  </div>
                )}
              </div>
            </div>

            {facultyMembers.length > 1 && (
              <button
                type="button"
                onClick={() => handleRemoveFaculty(index)}
                className="absolute top-2 right-2 text-red-500 hover:text-red-700"
              >
                Remove Faculty
              </button>
            )}
          </div>
        ))}

        <button
          type="button"
          onClick={handleAddFaculty}
          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
        >
          Add Faculty Member
        </button>
      </div>
    </CollapsibleSection>
  );
};

export default FacultySection;
