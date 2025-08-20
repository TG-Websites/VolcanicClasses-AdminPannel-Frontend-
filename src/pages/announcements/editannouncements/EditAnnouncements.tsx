import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { AppDispatch, RootState } from "../../../redux/store";
import { getAnnouncementById, updateAnnouncement } from "../../../redux/slices/announcement";
import AnnouncementForm from "../components/AnnouncementForm";
import { AnnouncementFormValues } from "../type";
import toast from "react-hot-toast";

const EditAnnouncements = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { id } = useParams<{ id: string }>();
    const { announcement, loading, error } = useSelector(
        (state: RootState) => state.announcement
    );

    useEffect(() => {
        if (id && typeof id === "string") {
            dispatch(getAnnouncementById(id));
        }
    }, [id, dispatch]);


    const navigate = useNavigate();
    const handleSubmit = async (values: AnnouncementFormValues) => {
        const result = await dispatch(updateAnnouncement({ id: id!, formData: values }));
        if (updateAnnouncement.fulfilled.match(result)) {
            toast.success("Announcement Edit Successfully")
            navigate('/announcements');
        }
    };

    if (loading) return <p className="p-4">Loading...</p>;
    if (error) return <p className="p-4 text-red-500">Error: {error}</p>;

    // Only render the form when announcement is loaded
    if (!announcement || !announcement.title || !announcement.content) {
        return <p className="p-4">No announcement data found.</p>;
    }

    const initialValues: AnnouncementFormValues = {
        title: announcement.title,
        content: announcement.content,
    };

    return (
        <div className="min-h-screen bg-gray-100 dark:bg-black py-8">
            <AnnouncementForm
                onSubmit={handleSubmit}
                isEditMode={true}
                initialValues={initialValues}
            />
        </div>
    );
};

export default EditAnnouncements;
