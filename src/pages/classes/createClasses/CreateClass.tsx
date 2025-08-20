import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import ScheduleClassForm from '../component/ScheduleClassForm';
import { ClassesFormValues } from '../type';
import { createClass } from '../../../redux/slices/liveClass';
import { AppDispatch } from '../../../redux/store';
import toast from 'react-hot-toast';

const CreateClass = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const initialValues: ClassesFormValues = {
    course: '',
    instructor: '',
    date: '',
    time: '',
    mode: 'online',
    link: '',
    isCancelled: false,
  };

  const handleSubmit = async (values: ClassesFormValues) => {
    const result = await dispatch(createClass(values));
    if (createClass.fulfilled.match(result)) {
      toast.success("Class Schedule Successfully")
      navigate('/live-classes/calendar');
    }
  };

  return (
    <ScheduleClassForm
      initialValues={initialValues}
      onSubmit={handleSubmit}
      title="Create Session"
      submitLabel="Create Session"
    />
  );
};

export default CreateClass;
