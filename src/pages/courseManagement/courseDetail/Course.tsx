// app/course/[id]/page.tsx
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getCourseById } from '../../../redux/slices/course';
import { RootState, AppDispatch } from '../../../redux/store';
import { CourseDetail } from './CourseDetail';

const CoursePage = () => {
  const { id } = useParams();
  const dispatch = useDispatch<AppDispatch>();
  const { course, loading, error } = useSelector((state: RootState) => state.course);
  console.log("heelo",course)

  useEffect(() => {
    if (id && typeof id === 'string') {
      dispatch(getCourseById(id));
    }
  }, [id, dispatch]);

  if (loading) return <div className="p-8 text-center">Loading...</div>;
  if (error) return <div className="p-8 text-center text-red-600">{error}</div>;
  if (!course) return <div className="p-8 text-center">Course not found</div>;

  return <CourseDetail course={course} />;
};

export default CoursePage;
