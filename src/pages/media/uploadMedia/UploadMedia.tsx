// import { useFormik } from 'formik';
// import * as Yup from 'yup';
// import { useDispatch, useSelector } from 'react-redux';
// import { AppDispatch, RootState } from '../../../redux/store';
// import { uploadImage } from '../../../redux/slices/cloudinary';
// import { useEffect } from 'react';
// import { uploadMedia } from '../../../redux/slices/media';
// import { MediaFormValues } from './types'; // Adjust path as needed

// const MediaUpload = () => {
//   const dispatch = useDispatch<AppDispatch>();
//   const { url, uploading, error } = useSelector((state: RootState) => state.cloudinary);

//   const formik = useFormik<MediaFormValues>({
//     initialValues: {
//       title: '',
//       url: '',
//       type: '',
//       isFeatured: false,
//       tags: [],
//     },
//     validationSchema: Yup.object({
//       title: Yup.string().required('Title is required'),
//       url: Yup.string().required('Image URL is required'),
//       type: Yup.string()
//         .oneOf(['image', 'video', 'pdf', 'document'], 'Invalid media type')
//         .required('Type is required'),
//       isFeatured: Yup.boolean(),
//       tags: Yup.array().of(Yup.string()),
//     }),
//     onSubmit: async (values, { setSubmitting }) => {
//       try {
//         dispatch(uploadMedia(values));
//       } finally {
//         setSubmitting(false);
//       }
//     },
//   });

//   const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const file = e.target.files?.[0];
//     if (file) {
//       dispatch(uploadImage(file));
//     }
//   };

// useEffect(() => {
//   if (url && formik.values.url !== url) {
//     formik.setFieldValue('url', url);
//   }
// }, [url]); // ✅ Also add `formik` if TypeScript complains


//   return (
//     <form onSubmit={formik.handleSubmit} className="space-y-4 bg-white px-4 py-5 rounded-xl">
//       {/* Title */}
//       <div>
//         <label htmlFor="title" className="block text-sm font-medium text-gray-700">
//           Title*
//         </label>
//         <input
//           id="title"
//           name="title"
//           type="text"
//           onChange={formik.handleChange}
//           onBlur={formik.handleBlur}
//           value={formik.values.title}
//           className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//         />
//         {formik.touched.title && formik.errors.title && (
//           <div className="text-red-500 text-xs mt-1">{formik.errors.title}</div>
//         )}
//       </div>

//       {/* Image Upload */}
//       <div>
//         <label htmlFor="url" className="block text-sm font-medium text-gray-700">
//           Image
//         </label>
//         <input
//           id="url"
//           name="url"
//           type="file"
//           accept="image/*"
//           onChange={handleFileChange}
//           className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//         />
//         {uploading && <p className="text-sm text-gray-500">Uploading...</p>}
//         {url && <img src={url} alt="Preview" className="mt-2 h-20 object-contain" />}
//         {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
//         {formik.touched.url && formik.errors.url && (
//           <div className="text-red-500 text-xs mt-1">{formik.errors.url}</div>
//         )}
//       </div>

//       {/* Type */}
//       <div>
//         <label htmlFor="type" className="block text-sm font-medium text-gray-700">
//           Media Type*
//         </label>
//         <select
//           id="type"
//           name="type"
//           onChange={formik.handleChange}
//           onBlur={formik.handleBlur}
//           value={formik.values.type}
//           className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//         >
//           <option value="image">Image</option>
//           <option value="video">Video</option>
//           <option value="pdf">PDF</option>
//           <option value="document">Document</option>
//         </select>
//         {formik.touched.type && formik.errors.type && (
//           <div className="text-red-500 text-xs mt-1">{formik.errors.type}</div>
//         )}
//       </div>

//       {/* Featured */}
//       <div className="flex items-center">
//         <input
//           id="isFeatured"
//           name="isFeatured"
//           type="checkbox"
//           onChange={formik.handleChange}
//           onBlur={formik.handleBlur}
//           checked={formik.values.isFeatured}
//           className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
//         />
//         <label htmlFor="isFeatured" className="ml-2 block text-sm text-gray-700">
//           Featured Media
//         </label>
//       </div>

//       {/* Tags */}
//       <div>
//         <label htmlFor="tags" className="block text-sm font-medium text-gray-700">
//           Tags (comma separated)
//         </label>
//         <input
//           id="tags"
//           name="tags"
//           type="text"
//           onChange={(e) => {
//             const tagArray = e.target.value
//               .split(',')
//               .map((tag) => tag.trim())
//               .filter(Boolean);
//             formik.setFieldValue('tags', tagArray);
//           }}
//           onBlur={formik.handleBlur}
//           value={formik.values.tags.join(', ')}
//           placeholder="e.g., marketing, tutorial"
//           className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//         />
//       </div>

//       {/* Submit */}
//       <div>
//         <button
//           type="submit"
//           disabled={formik.isSubmitting}
//           className="px-6 py-3 bg-brand-500 hover:bg-brand-600 text-white rounded-md transition-colors"
//         >
//           {formik.isSubmitting ? 'Uploading...' : 'Upload Media'}
//         </button>
//       </div>
//     </form>
//   );
// };

// export default MediaUpload;


import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../../redux/store';
import { uploadMedia } from '../../../redux/slices/media';
import { MediaFormValues } from './types'; // Adjust path as needed
import { useNavigate } from 'react-router';
import toast from 'react-hot-toast';


const MediaUpload = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const handleTagChange = (index: number, value: string) => {
    const newTags = [...formik.values.tags];
    newTags[index] = value;
    formik.setFieldValue('tags', newTags);
  };

  const addTag = () => {
    formik.setFieldValue('tags', [...formik.values.tags, '']);
  };

  const removeTag = (index: number) => {
    const newTags = [...formik.values.tags];
    newTags.splice(index, 1);
    formik.setFieldValue('tags', newTags);
  };


  const formik = useFormik<MediaFormValues>({
    initialValues: {
      title: '',
      file: null,
      type: 'image',
      isFeatured: false,
      tags: [],
    },
    validationSchema: Yup.object({
      title: Yup.string().required('Title is required'),
      file: Yup.mixed().required('Image URL is required'),
      type: Yup.string()
        .oneOf(['image', 'video', 'pdf', 'document'], 'Invalid media type')
        .required('Type is required'),
      isFeatured: Yup.boolean(),
      tags: Yup.array().of(Yup.string()),
    }),
    onSubmit: async (values, { setSubmitting }) => {
      try {

        const response = await dispatch(uploadMedia(values))
        if(uploadMedia.fulfilled.match(response)){
          toast.success("Media Upload Successfully");
          navigate("/allmedia")
        }
      } finally {
        setSubmitting(false);
      }
    }

  })


  return (
    <form
      onSubmit={formik.handleSubmit}
      className="space-y-4 bg-white dark:bg-gray-800 px-4 py-5 rounded-xl shadow-sm dark:text-gray-200"
    >
      <h1 className="text-3xl font-bold mb-8 text-gray-900 dark:text-white">
        Upload Media 
      </h1>
      {/* Title */}
      <div>
        <label htmlFor="title" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          Title*
        </label>
        <input
          id="title"
          name="title"
          type="text"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.title}
          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-500 dark:focus:ring-brand-500 dark:bg-gray-700 dark:text-white"
        />
        {formik.touched.title && formik.errors.title && (
          <div className="text-red-500 dark:text-red-400 text-xs mt-1">{formik.errors.title}</div>
        )}
      </div>

      {/* Image Upload */}
      <div>
        <label htmlFor="file" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          Image
        </label>
        <input
          id="file"
          name="file"
          type="file"
          accept="image/*"
          onChange={(event) => {
            const file = event.currentTarget.files?.[0] || null;
            formik.setFieldValue("file", file);
          }}
          className=" px-3 py-2 border border-gray-300 dark:border-gray-600 dark:text-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-500 dark:focus:ring-brand-500 file:mr-4 file:py-1 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 dark:file:bg-gray-600 dark:file:text-gray-200"
        />
        {formik.touched.file && formik.errors.file && (
          <div className="text-red-500 dark:text-red-400 text-xs mt-1">{formik.errors.file}</div>
        )}
      </div>

      {/* Type */}
      <div>
        <label htmlFor="type" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          Media Type*
        </label>
        <select
          id="type"
          name="type"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.type}
          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-500 dark:focus:ring-brand-500 dark:bg-gray-700 dark:text-white"
        >
          <option value="image">Image</option>
          <option value="video">Video</option>
          <option value="pdf">PDF</option>
          <option value="document">Document</option>
        </select>
        {formik.touched.type && formik.errors.type && (
          <div className="text-red-500 dark:text-red-400 text-xs mt-1">{formik.errors.type}</div>
        )}
      </div>

      {/* Featured */}
      <div className="flex items-center">
        <input
          id="isFeatured"
          name="isFeatured"
          type="checkbox"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          checked={formik.values.isFeatured}
          className="h-4 w-4 rounded border-gray-300 dark:border-gray-600  dark:bg-gray-700 focus-2 focus:ring-brand-500"
        />
        <label htmlFor="isFeatured" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
          Featured Media
        </label>
      </div>

      {/* Tags */}
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          Tags
        </label>
        <div className="space-y-2">
          {formik.values.tags.map((tag, index) => (
            <div key={index} className="flex items-center gap-2">
              <input
                type="text"
                value={tag}
                onChange={(e) => handleTagChange(index, e.target.value)}
                className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2  focus:ring-brand-500 dark:bg-gray-700 "
                placeholder={`Tag ${index + 1}`}
              />
              {formik.values.tags.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeTag(index)}
                  className="p-2 text-red-500 hover:text-red-700 dark:hover:text-red-400"
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
          ))}
          <button
            type="button"
            onClick={addTag}
            className="flex items-center text-sm text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 mt-2"
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
            Add another tag
          </button>
        </div>
      </div>

      {/* Submit */}
      <div>
        <button
          type="submit"
          disabled={formik.isSubmitting}
          className="px-6 py-3 bg-brand-500 hover:bg-brand-600 dark:bg-brand-600  text-white rounded-md transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
        >
          {formik.isSubmitting ? (
            <span className="flex items-center justify-center">
              <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Uploading...
            </span>
          ) : 'Upload Media'}
        </button>
      </div>
    </form>

  );
};

export default MediaUpload;


