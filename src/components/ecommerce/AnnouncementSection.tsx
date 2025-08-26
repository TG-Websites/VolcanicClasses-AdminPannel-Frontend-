import { FaBullhorn } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../redux/store';
import { getAllAnnouncement } from '../../redux/slices/announcement';

const AnnouncementSection = () => {
    const { announcements, error } = useSelector(
        (state: RootState) => state.announcement
    );

    const dispatch = useDispatch<AppDispatch>();
    useEffect(() => {
        dispatch(getAllAnnouncement());
    }, [])
    

    

    return (
        <div className="bg-white h-[460px] shadow p-4 dark:border-gray-800 dark:bg-white/[0.03] dark:text-gray-300 rounded-xl overflow-scroll overflow-x-hidden">
            <div className="flex items-center mb-6">
                <FaBullhorn className="text-brand-500 text-xl mr-2" />
                <h2 className="text-lg font-semibold dark:text-gray-300">Latest Announcements</h2>
            </div>

            {error ? (
                <div className="text-red-500 text-sm dark:text-gray-300">
                    Failed to load announcements: {error}
                </div>
            ) : announcements.length > 0 ? (
                <div className="space-y-6">
                    {announcements
                        .slice(0, 6) // ✅ show only first 6
                        .map((announcement, index) => {
                            const dateObj = new Date(announcement.createdAt);
                            const day = dateObj.toLocaleDateString('en-US', { day: '2-digit' });
                            const month = dateObj.toLocaleDateString('en-US', { month: 'short' });
                            const year = dateObj.toLocaleDateString('en-US', { year: 'numeric' });

                            return (
                                <div key={index} className="flex ">
                                    {/* Date Section */}
                                    <div className="w-24 text-sm text-gray-500 dark:text-gray-300 font-medium flex-shrink-0 text-right pr-4">
                                        <div>{month} {day}</div>
                                        <div>{year}</div>
                                    </div>

                                    {/* Content Section */}
                                    <div className="border-l-2 border-gray-300 pl-4">
                                        <h3 className="text-md font-semibold text-gray-800 dark:text-gray-300 mb-1">
                                            {announcement.title}
                                        </h3>
                                        <p className="text-sm text-gray-600 dark:text-gray-300 ">
                                            {announcement.content}
                                        </p>
                                    </div>
                                </div>
                            );
                        })}
                </div>
            ) : (
                <p className="text-sm text-gray-500">No announcements available</p>
            )}
        </div>
    );
};

export default AnnouncementSection;
