// ProgramsSection.tsx
import { FormikProps, getIn } from 'formik';
import { CourseFormValues } from '../types';
import CollapsibleSection from './CollapsibleSection';

const ProgramsSection = ({ formik }: { formik: FormikProps<CourseFormValues> }) => {
  const addProgram = () => {
    formik.setFieldValue('programs', [
      ...formik.values.programs,
      {
        mode: 'online',
        title: '',
        description: '',
        price: 0,
        priceLabel: '',
        features: ['', ''],
      },
    ]);
  };

  const removeProgram = (index: number) => {
    const programs = [...formik.values.programs];
    programs.splice(index, 1);
    formik.setFieldValue('programs', programs);
  };

  const addFeature = (programIndex: number) => {
    const programs = [...formik.values.programs];
    programs[programIndex].features.push('');
    formik.setFieldValue('programs', programs);
  };

  const removeFeature = (programIndex: number, featureIndex: number) => {
    const programs = [...formik.values.programs];
    programs[programIndex].features.splice(featureIndex, 1);
    formik.setFieldValue('programs', programs);
  };

  const handleProgramChange = (
    programIndex: number,
    field: 'mode' | 'title' | 'description' | 'price' | 'priceLabel',
    value: string | number
  ) => {
    const programs = [...formik.values.programs];
    programs[programIndex] = { ...programs[programIndex], [field]: value };
    formik.setFieldValue('programs', programs);
  };

  const handleFeatureChange = (
    programIndex: number,
    featureIndex: number,
    value: string
  ) => {
    const programs = [...formik.values.programs];
    programs[programIndex].features[featureIndex] = value;
    formik.setFieldValue('programs', programs);
  };

  const err = (path: string) => getIn(formik.errors, path);
  const touched = (path: string) => getIn(formik.touched, path);

  return (
    <CollapsibleSection title="Program Modes">
      <div className="space-y-6">
        {formik.values.programs.map((program, programIndex) => (
          <div
            key={programIndex}
            className="border rounded-lg p-4 bg-gray-50 dark:bg-gray-800 dark:border-gray-700"
          >
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-medium text-gray-700 dark:text-gray-200">
                Program {programIndex + 1}
              </h3>
              {formik.values.programs.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeProgram(programIndex)}
                  className="text-red-500 hover:text-red-700 text-sm flex items-center"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 mr-1"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Remove
                </button>
              )}
            </div>

            <div className="space-y-4">
              {/* Mode */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Mode <span className="text-red-500">*</span>
                </label>
                <select
                  value={program.mode}
                  onChange={(e) => handleProgramChange(programIndex, 'mode', e.target.value)}
                  onBlur={formik.handleBlur}
                  className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 ${touched(`programs.${programIndex}.mode`) && err(`programs.${programIndex}.mode`)
                      ? 'border-red-500 focus:ring-red-500 dark:border-red-500'
                      : 'border-gray-300 dark:border-gray-600 focus:ring-blue-500'
                    } bg-white dark:bg-gray-700 text-gray-900 dark:text-white`}
                  name={`programs.${programIndex}.mode`}
                >
                  <option value="online">Online</option>
                  <option value="offline">Offline</option>
                  <option value="hybrid">Hybrid</option>
                </select>
                {touched(`programs.${programIndex}.mode`) && err(`programs.${programIndex}.mode`) && (
                  <p className="mt-1 text-sm text-red-600">{err(`programs.${programIndex}.mode`)}</p>
                )}
              </div>

              {/* Title */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Program Title <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={program.title}
                  onChange={(e) => handleProgramChange(programIndex, 'title', e.target.value)}
                  onBlur={formik.handleBlur}
                  name={`programs.${programIndex}.title`}
                  className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 ${touched(`programs.${programIndex}.title`) && err(`programs.${programIndex}.title`)
                      ? 'border-red-500 focus:ring-red-500 dark:border-red-500'
                      : 'border-gray-300 dark:border-gray-600 focus:ring-blue-500'
                    } bg-white dark:bg-gray-700 text-gray-900 dark:text-white`}
                  placeholder="e.g., JEE Advanced Crash Course"
                />
                {touched(`programs.${programIndex}.title`) && err(`programs.${programIndex}.title`) && (
                  <p className="mt-1 text-sm text-red-600">{err(`programs.${programIndex}.title`)}</p>
                )}
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Description <span className="text-red-500">*</span>
                </label>
                <textarea
                  value={program.description}
                  onChange={(e) =>
                    handleProgramChange(programIndex, 'description', e.target.value)
                  }
                  onBlur={formik.handleBlur}
                  name={`programs.${programIndex}.description`}
                  className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 ${touched(`programs.${programIndex}.description`) &&
                      err(`programs.${programIndex}.description`)
                      ? 'border-red-500 focus:ring-red-500 dark:border-red-500'
                      : 'border-gray-300 dark:border-gray-600 focus:ring-blue-500'
                    } bg-white dark:bg-gray-700 text-gray-900 dark:text-white`}
                  placeholder="Short description about the program"
                  rows={3}
                />
                {touched(`programs.${programIndex}.description`) &&
                  err(`programs.${programIndex}.description`) && (
                    <p className="mt-1 text-sm text-red-600">
                      {err(`programs.${programIndex}.description`)}
                    </p>
                  )}
              </div>

              {/* Price & Price Label */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Price <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="number"
                    value={program.price}
                    onChange={(e) =>
                      handleProgramChange(programIndex, 'price', Number(e.target.value))
                    }
                    onBlur={formik.handleBlur}
                    name={`programs.${programIndex}.price`}
                    className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 ${touched(`programs.${programIndex}.price`) && err(`programs.${programIndex}.price`)
                        ? 'border-red-500 focus:ring-red-500 dark:border-red-500'
                        : 'border-gray-300 dark:border-gray-600 focus:ring-blue-500'
                      } bg-white dark:bg-gray-700 text-gray-900 dark:text-white`}
                    placeholder="0"
                  />
                  {touched(`programs.${programIndex}.price`) && err(`programs.${programIndex}.price`) && (
                    <p className="mt-1 text-sm text-red-600">{err(`programs.${programIndex}.price`)}</p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Price Label <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={program.priceLabel}
                    onChange={(e) =>
                      handleProgramChange(programIndex, 'priceLabel', e.target.value)
                    }
                    onBlur={formik.handleBlur}
                    name={`programs.${programIndex}.priceLabel`}
                    className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 ${touched(`programs.${programIndex}.priceLabel`) &&
                        err(`programs.${programIndex}.priceLabel`)
                        ? 'border-red-500 focus:ring-red-500 dark:border-red-500'
                        : 'border-gray-300 dark:border-gray-600 focus:ring-blue-500'
                      } bg-white dark:bg-gray-700 text-gray-900 dark:text-white`}
                    placeholder="e.g., per year"
                  />
                  {touched(`programs.${programIndex}.priceLabel`) &&
                    err(`programs.${programIndex}.priceLabel`) && (
                      <p className="mt-1 text-sm text-red-600">
                        {err(`programs.${programIndex}.priceLabel`)}
                      </p>
                    )}
                </div>
              </div>

              {/* Features */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Features <span className="text-red-500">*</span>
                </label>
                <div className="space-y-2">
                  {program.features.map((feature, featureIndex) => (
                    <div key={featureIndex}>
                      <div className="flex items-center gap-2">
                        <input
                          type="text"
                          value={feature}
                          onChange={(e) =>
                            handleFeatureChange(programIndex, featureIndex, e.target.value)
                          }
                          onBlur={formik.handleBlur}
                          name={`programs.${programIndex}.features.${featureIndex}`}
                          className={`flex-1 px-3 py-2 border rounded-md focus:outline-none focus:ring-2 ${touched(
                            `programs.${programIndex}.features.${featureIndex}`
                          ) && err(`programs.${programIndex}.features.${featureIndex}`)
                              ? 'border-red-500 focus:ring-red-500 dark:border-red-500'
                              : 'border-gray-300 dark:border-gray-600 focus:ring-blue-500'
                            } bg-white dark:bg-gray-700 text-gray-900 dark:text-white`}
                          placeholder={`Feature ${featureIndex + 1}`}
                        />
                        {program.features.length > 2 && (
                          <button
                            type="button"
                            onClick={() => removeFeature(programIndex, featureIndex)}
                            className="p-2 text-red-500 hover:text-red-700"
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
                      {touched(`programs.${programIndex}.features.${featureIndex}`) &&
                        err(`programs.${programIndex}.features.${featureIndex}`) && (
                          <p className="mt-1 text-sm text-red-600">
                            {err(`programs.${programIndex}.features.${featureIndex}`)}
                          </p>
                        )}
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={() => addFeature(programIndex)}
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
                    Add feature
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}

        <button
          type="button"
          onClick={addProgram}
          className="flex items-center justify-center w-full py-2 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg hover:border-gray-400 dark:hover:border-gray-500 text-gray-600 dark:text-gray-200 hover:text-gray-800 dark:hover:text-white"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 mr-2"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
              clipRule="evenodd"
            />
          </svg>
          Add Another Program
        </button>
      </div>
    </CollapsibleSection>
  );
};

export default ProgramsSection;
