import { useDispatch } from 'react-redux';
import AdmisssionForm from '../components/AdmisssionForm';
import { StudentEnrollment } from '../createManualAdmission/types';
import { AppDispatch } from '../../../redux/store';
import { createManualAdmission } from '../../../redux/slices/manualAdmission';
import toast from 'react-hot-toast';

const CreateManualAdmission = () => {
  const dispatch = useDispatch<AppDispatch>();

  const initialValues: StudentEnrollment = {
      studentName: '',
  email: '',
  mobileNumber: '',
  courseId: '',
  mode: '',      // assuming only these two modes
  paymentMode: 'offline', // assuming only these two
  paidAmount: 0,
  className: '',
  };

  const handleSubmit = async (values: StudentEnrollment) => {
    const result = await dispatch(createManualAdmission(values));
    if (createManualAdmission.fulfilled.match(result)) {
      toast.success("Student Admission Successfully")
    }
    console.log(values)
  };

  return (
    <AdmisssionForm
      initialValues={initialValues}
      onSubmit={handleSubmit}
      title="Manual Admission"
      submitLabel="Create Admission"
    />
  );
};

export default CreateManualAdmission;
