import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { AppDispatch, RootState } from '../../../redux/store';
import { cancelClass, deleteClass, getAllClasses } from '../../../redux/slices/liveClass';
import { LiaChalkboardTeacherSolid } from "react-icons/lia";


import {
  ChevronLeft,
  ChevronRight,
  ClockIcon,
  GlobeIcon,
  XCircleIcon,
  Grid2X2,
  List
} from 'lucide-react';
import clsx from 'clsx';
import { format, startOfWeek, addDays, isSameDay, isSameMonth, addWeeks, subWeeks, startOfMonth, endOfMonth, endOfWeek, eachDayOfInterval } from 'date-fns';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';



const Classes: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const { classes, loading, error } = useSelector((state: RootState) => state.class);
  const [currentDate, setCurrentDate] = useState<Date>(new Date());
  const [viewMode, setViewMode] = useState<'week' | 'month'>('week');
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  useEffect(() => {
    dispatch(getAllClasses());
  }, [dispatch]);

  const navigateWeek = (direction: 'prev' | 'next') => {
    setCurrentDate(direction === 'prev' ? subWeeks(currentDate, 1) : addWeeks(currentDate, 1));
  };

  const navigateMonth = (direction: 'prev' | 'next') => {
    setCurrentDate(direction === 'prev' ? addMonths(currentDate, -1) : addMonths(currentDate, 1));
  };

  const addMonths = (date: Date, months: number) => {
    const result = new Date(date);
    result.setMonth(result.getMonth() + months);
    return result;
  };

  const getWeekDays = () => {
    const startDate = startOfWeek(currentDate);
    return Array.from({ length: 7 }).map((_, index) => addDays(startDate, index));
  };

  const getMonthDays = () => {
    const startDate = startOfMonth(currentDate);
    const endDate = endOfMonth(currentDate);
    const startWeek = startOfWeek(startDate);
    const endWeek = endOfWeek(endDate);
    return eachDayOfInterval({ start: startWeek, end: endWeek });
  };

  const getClassesForDay = (day: Date) => {
    return classes.filter(cls => isSameDay(new Date(cls.date), day));
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-brand-500"></div>
      </div>
    );
  }

  if (error) {
    return <div className="p-4 text-center text-red-500">{error}</div>;
  }

  if (classes.length === 0) {
    return (
      <div className="p-4 text-center text-gray-400 italic">
        No classes scheduled.
      </div>
    );
  }

  const days = viewMode === 'week' ? getWeekDays() : getMonthDays();
  const handleEdit = (cls: string) => {
    navigate(`/live-classes/edit/${cls}`)
  }

  const handleDelete = async (id: string) => {
    if (window.confirm("Are you sure you want to delete the Class?")) {
      const resultAction = await dispatch(deleteClass(id));
      if (deleteClass.fulfilled.match(resultAction)) {
        toast.success("Media Delete Successfully")
        dispatch(getAllClasses());
      }
    }
  };

  const handleCancel = async (id: string) => {
    if (window.confirm("Are you sure you want to cancel the Class?")) {
      const resultAction = await dispatch(cancelClass(id));
      if (cancelClass.fulfilled.match(resultAction)) {
        toast.success("Media cancel Successfully")
        dispatch(getAllClasses());
      }
    }
  };

  return (
    <div>
      <div className="bg-white dark:bg-gray-900 shadow rounded-xl overflow-hidden">
        {/* Calendar Header - Stacked on small screens */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between p-2 sm:p-4 border-b dark:border-gray-700 gap-2 sm:gap-4">
          <div className="flex items-center space-x-2 sm:space-x-4">
            <button
              onClick={() => setViewMode(viewMode === 'week' ? 'month' : 'week')}
              className="p-1 sm:p-2 rounded-lg hover:bg-gray-100 dark:bg-gray-300 "
            >
              {viewMode === 'week' ? <Grid2X2 className="w-4 h-4 sm:w-5 sm:h-5" /> : <List className="w-4 h-4 sm:w-5 sm:h-5" />}
            </button>
            <h2 className="text-lg sm:text-xl font-semibold text-gray-800 dark:text-white">
              {format(currentDate, 'MMMM yyyy')}
            </h2>
          </div>

          <div className="flex items-center space-x-1 sm:space-x-2">
            <button
              onClick={() => viewMode === 'week' ? navigateWeek('prev') : navigateMonth('prev')}
              className="p-1 sm:p-2 rounded-lg hover:bg-gray-100 dark:bg-gray-300 "
            >
              <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>
            <button
              onClick={() => setCurrentDate(new Date())}
              className="px-2 py-0.5 sm:px-3 sm:py-1 text-xs sm:text-sm rounded-lg hover:bg-gray-100 dark:bg-gray-300 "
            >
              Today
            </button>
            <button
              onClick={() => viewMode === 'week' ? navigateWeek('next') : navigateMonth('next')}
              className="p-1 sm:p-2 rounded-lg hover:bg-gray-100 dark:bg-gray-300 :bg-gray-800"
            >
              <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>
          </div>
        </div>

        {/* Calendar Grid */}
        <div className={`grid ${viewMode === 'week' ? 'grid-cols-7' : 'grid-cols-7 auto-rows-fr'} gap-px bg-gray-200 dark:bg-gray-800`}>
          {/* Day headers - smaller text on mobile */}
          {days.slice(0, 7).map((day, index) => (
            <div
              key={`header-${index}`}
              className="bg-gray-100 dark:bg-gray-700 p-1 sm:p-2 text-center text-xs sm:text-sm font-medium text-gray-500 dark:text-gray-300"
            >
              {format(day, viewMode === 'week' ? 'EEE' : 'EEEEE')}
            </div>
          ))}

          {/* Day cells - adjusted for mobile */}
          {days.map((day, index) => {
            const dayClasses = getClassesForDay(day);
            const isCurrentMonth = isSameMonth(day, currentDate);
            const isSelected = selectedDate && isSameDay(day, selectedDate);
            const isToday = isSameDay(day, new Date());

            return (
              <div
                key={`day-${index}`}
                onClick={() => setSelectedDate(day)}
                className={clsx(
                  'bg-white dark:bg-gray-900 min-h-[4rem] sm:min-h-[6rem] p-1 sm:p-2 overflow-hidden cursor-pointer transition',
                  !isCurrentMonth && 'text-gray-400 dark:text-gray-500',
                  isSelected &&
                  isToday && 'bg-red-50 dark:bg-red-900'
                )}
              >
                <div className="flex justify-between items-center mb-0.5 sm:mb-1">
                  <span className={clsx(
                    'text-xs sm:text-sm font-medium',
                    isToday && 'bg-red-500 text-white rounded-full w-5 h-5 sm:w-6 sm:h-6 flex items-center justify-center'
                  )}>
                    {format(day, 'd')}
                  </span>
                  {dayClasses.length > 0 && (
                    <span className="text-[10px] sm:text-xs bg-red-100 dark:bg-red-900 text-red-600 dark:text-red-300 rounded-full px-1 sm:px-2 py-0.5">
                      {dayClasses.length}
                    </span>
                  )}
                </div>

                <div className="space-y-0.5 sm:space-y-1 max-h-20 sm:max-h-32 overflow-y-auto">
                  {dayClasses.map(cls => (
                    <div
                      key={cls._id}
                      className={clsx(
                        'text-[10px] sm:text-xs p-0.5 sm:p-1 rounded border-l-2',
                        cls.isCancelled
                          ? 'border-gray-400 bg-gray-100 dark:bg-gray-800'
                          : 'border-red-500 bg-red-50 dark:bg-red-900'
                      )}
                    >
                      <div className="font-medium truncate text-gray-800 dark:text-white">
                        {cls.course?.title || 'Untitled'}
                      </div>
                      <div className="flex items-center text-gray-500 dark:text-gray-400">
                        <ClockIcon className="w-2.5 h-2.5 sm:w-3 sm:h-3 mr-0.5 sm:mr-1" />
                        {cls.time}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* Selected Day Details - Adjusted for mobile */}
        {selectedDate && (
          <div className="bg-gray-50 dark:bg-gray-800 p-3 sm:p-6 rounded-b-xl">
            <h3 className="text-lg sm:text-xl font-bold text-gray-800 dark:text-white mb-3 sm:mb-6">
              {format(selectedDate, 'EEEE, MMMM d, yyyy')}
            </h3>

            {getClassesForDay(selectedDate).length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-6">
                {getClassesForDay(selectedDate).map(cls => (
                  <div
                    key={cls._id}
                    className="relative bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg sm:rounded-xl shadow-sm hover:shadow-lg transition duration-200 p-3 sm:p-5 flex flex-col justify-between"
                  >
                    <button
                      onClick={() => handleDelete(cls._id)}
                      className="absolute top-1 right-1 sm:top-2 sm:right-2 p-0.5 sm:p-1 text-gray-400 hover:text-red-600 transition"
                      aria-label="Delete class"
                    >
                      <XCircleIcon className="w-4 h-4 sm:w-5 sm:h-5" />
                    </button>

                    <div className="mb-2 sm:mb-4">
                      <h4 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white">
                        <span className="text-lg sm:text-lg">Course: </span>
                        {typeof cls.course === 'object' && cls.course !== null ? cls.course.title : 'Untitled'}
                      </h4>
                      <div className="mt-1 sm:mt-2 space-y-0.5 sm:space-y-1 text-xs sm:text-sm text-gray-600 dark:text-gray-400">
                        <div className="flex items-center">
                          <LiaChalkboardTeacherSolid className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2 text-gray-400" />
                          <span className="text-gray-900 dark:text-white font-medium mr-0.5 sm:mr-1">instructor:</span>
                          {cls.instructor}
                        </div>
                        <div className="flex items-center">
                          <ClockIcon className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2 text-gray-400" />
                          <span className="text-gray-900 dark:text-white font-medium mr-0.5 sm:mr-1">Time:</span>
                          {cls.time}
                        </div>
                        <div className="flex items-center">
                          <GlobeIcon className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2 text-gray-400" />
                          <span>{cls.mode || 'offline'}</span>
                        </div>
                         <div className="flex items-center">
                          {!cls.isCancelled ? (
                            <a
                              href={cls.link}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="px-3 text-sm bg-brand-400 text-white rounded-md hover:bg-brand-600 transition"
                            >
                              Join
                            </a>
                          ) : (
                            <span className="text-sm text-gray-400">No Link</span>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="flex justify-between items-center mt-auto">
                      <div className="flex gap-1 sm:gap-2">
                        <button
                          onClick={() => handleEdit(cls._id)}
                          className="px-2 py-1 sm:px-3 sm:py-1.5 text-xs bg-blue-100 text-blue-700 rounded-full font-medium hover:bg-blue-200 dark:bg-blue-900 dark:text-blue-300 dark:hover:bg-blue-800 transition"
                        >
                          Edit
                        </button>
                        {
                          cls.isCancelled ? <></> : <button
                            className="px-2 py-1 sm:px-3 sm:py-1.5 text-xs bg-red-100 text-red-600 rounded-full font-medium hover:bg-red-200 dark:bg-red-900 dark:text-red-400 dark:hover:bg-red-800 transition"
                            onClick={() => handleCancel(cls._id)}
                          >
                            Cancel
                          </button>
                        }
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center text-gray-400 dark:text-gray-500 py-3 sm:py-6 italic text-sm sm:text-base">
                No classes scheduled for this day
              </div>
            )}
          </div>
        )}
      </div>
    </div>

  );
};

export default Classes;