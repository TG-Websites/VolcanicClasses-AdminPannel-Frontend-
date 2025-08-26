import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import CourseEditForm from './components/CourseEditFrom';
import { CourseFormValues } from '../createCourse/types';
import { getCourseById, updateCourse } from '../../../redux/slices/course';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../../../redux/store';
import { RootState } from '../../../redux/store';
import toast from 'react-hot-toast';



const CourseEdit = () => {
  const { id } = useParams();
  const [initialData, setInitialData] = useState<CourseFormValues | null>(null);

  const { course, loading, } = useSelector((state: RootState) => state.course);
  useEffect(() => {
    if (course) {
      setInitialData(course);
    }
  }, [course]);


  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    if (id && typeof id === 'string') {
      dispatch(getCourseById(id));
    }
  }, [id, dispatch]);


  const navigate = useNavigate();
  const handleUpdate = async (values: CourseFormValues) => {
    const result = await dispatch(updateCourse({ id: id as string, courseData: values }));
    if (updateCourse.fulfilled.match(result)) {
      toast.success("Course Edit Successfully")
      navigate("/course/list")
    }
  };

  if (loading) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-brand-500"></div>
            </div>
        );
    }
  if (!initialData) return <p>Course not found</p>;

  return <CourseEditForm initialData={initialData} onSubmit={handleUpdate} />;
};

export default CourseEdit;
