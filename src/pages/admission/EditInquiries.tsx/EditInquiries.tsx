import { useEffect } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import {
    MdPerson,
    MdPhone,
    MdEmail,
    MdSchool,
    MdMessage,
    MdPendingActions,
    MdNoteAdd,
} from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../../redux/store';
import { getInquiryById, updateInquiry } from '../../../redux/slices/admission';
import { AdmissionStatus } from '../manualEntry/types';
import { useNavigate, useParams } from 'react-router';
import CourseDropdown from '../components/CourseDropdown';
import toast from 'react-hot-toast';

const EditInquiries: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();
    const { id } = useParams<{ id: string }>();

    const { selectedInquiry, loading } = useSelector(
        (state: RootState) => state.admission
    );

    // Fetch inquiry details on load
    useEffect(() => {
        if (id) {
            dispatch(getInquiryById(id));
        }
    }, [dispatch, id]);

    const formik = useFormik({
        enableReinitialize: true, // ✅ allow form to reinit with API data
        initialValues: {
            name: selectedInquiry?.name || '',
            phone: selectedInquiry?.phone || 0,
            email: selectedInquiry?.email || '',
            courseInterest:
                typeof selectedInquiry?.courseInterest === 'object'
                    ? selectedInquiry.courseInterest._id
                    : selectedInquiry?.courseInterest || '',
            message: selectedInquiry?.message || '',
            followUpNotes: selectedInquiry?.followUpNotes || '', // ✅ optional
            status: selectedInquiry?.status || AdmissionStatus.pending,
        },
        validationSchema: Yup.object({
            name: Yup.string().required('Name is required'),
            phone: Yup.number().required('Phone is required'),
            email: Yup.string().email('Invalid email').required('Email is required'),
            courseInterest: Yup.string().required('Course Interest is required'),
            message: Yup.string(),
            followUpNotes: Yup.string(), // ✅ optional
            status: Yup.mixed<AdmissionStatus>().oneOf(Object.values(AdmissionStatus)),
        }),
        onSubmit: async (values) => {
            if (!id) return;
            const result = await dispatch(updateInquiry({ id, updates: values }));
            if (updateInquiry.fulfilled.match(result)) {
                toast.success('Inquiry Updated Successfully');
                navigate('/admission/inquiries');
            }
        },
    });

    const LabelWithIcon = ({
        icon: Icon,
        text,
    }: {
        icon: React.ElementType;
        text: string;
    }) => (
        <label className="flex items-center gap-2 font-medium text-gray-700 dark:text-gray-300 mb-1">
            <span className="p-1 rounded bg-brand-500 text-white dark:bg-brand-600">
                <Icon size={14} />
            </span>
            {text}
        </label>
    );

    if (loading) {
        return (
            <div className="text-center text-gray-600 dark:text-gray-300 py-10">
                Loading inquiry details...
            </div>
        );
    }

    return (
        <div className="max-w-6xl mx-auto p-4 sm:p-6 bg-white dark:bg-gray-800 shadow-lg rounded-2xl space-y-6">
            <h2 className="text-xl sm:text-2xl font-semibold text-center dark:text-gray-200">
                Edit Admission Inquiry
            </h2>
            <form onSubmit={formik.handleSubmit} className="space-y-4 dark:text-gray-200">
                {/* Name */}
                <div>
                    <LabelWithIcon icon={MdPerson} text="Full Name" />
                    <input
                        type="text"
                        name="name"
                        placeholder="Full Name"
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-500 dark:focus:ring-brand-500 dark:bg-gray-700 dark:text-white"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.name}
                    />
                    {formik.touched.name && formik.errors.name && (
                        <div className="text-red-500 text-sm">{formik.errors.name}</div>
                    )}
                </div>

                {/* Phone + Email */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <LabelWithIcon icon={MdPhone} text="Phone Number" />
                        <input
                            type="number"
                            name="phone"
                            placeholder="Phone Number"
                            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-500 dark:focus:ring-brand-500 dark:bg-gray-700 dark:text-white"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.phone || ''}
                        />
                        {formik.touched.phone && formik.errors.phone && (
                            <div className="text-red-500 text-sm">{formik.errors.phone}</div>
                        )}
                    </div>

                    <div>
                        <LabelWithIcon icon={MdEmail} text="Email Address" />
                        <input
                            type="email"
                            name="email"
                            placeholder="Email Address"
                            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-500 dark:focus:ring-brand-500 dark:bg-gray-700 dark:text-white"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.email}
                        />
                        {formik.touched.email && formik.errors.email && (
                            <div className="text-red-500 text-sm">{formik.errors.email}</div>
                        )}
                    </div>
                </div>

                {/* Course */}
                <div>
                    <LabelWithIcon icon={MdSchool} text="Interested Course" />
                    <CourseDropdown
                        name="courseInterest"
                        value={formik.values.courseInterest}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                    />
                    {formik.touched.courseInterest && formik.errors.courseInterest && (
                        <div className="text-red-500 text-sm">{formik.errors.courseInterest}</div>
                    )}
                </div>

                {/* Message */}
                <div>
                    <LabelWithIcon icon={MdMessage} text="Message" />
                    <textarea
                        name="message"
                        placeholder="Message"
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-500 dark:focus:ring-brand-500 dark:bg-gray-700 dark:text-white"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.message}
                    />
                </div>

                {/* Follow-up Notes */}
                <div>
                    <LabelWithIcon icon={MdNoteAdd} text="Follow-up Notes (Optional)" />
                    <textarea
                        name="followUpNotes"
                        placeholder="Add follow-up notes..."
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-500 dark:focus:ring-brand-500 dark:bg-gray-700 dark:text-white"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.followUpNotes}
                    />
                </div>

                {/* Status */}
                <div>
                    <LabelWithIcon icon={MdPendingActions} text="Status" />
                    <select
                        name="status"
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-500 dark:focus:ring-brand-500 dark:bg-gray-700 dark:text-white"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.status}
                    >
                        <option value={AdmissionStatus.pending}>Pending</option>
                        <option value={AdmissionStatus.approved}>Approved</option>
                        <option value={AdmissionStatus.rejected}>Rejected</option>
                        <option value={AdmissionStatus.waitlisted}>Waitlisted</option>
                    </select>
                </div>

                <button
                    type="submit"
                    className="w-full bg-brand-500 hover:bg-brand-600 dark:bg-brand-600 text-white py-2 rounded-md font-semibold transition duration-200"
                >
                    Update Inquiry
                </button>
            </form>
        </div>
    );
};

export default EditInquiries;
