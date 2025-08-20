// EditUserForm.tsx
import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../../redux/store';
import { getUserById, updateUser } from '../../../redux/slices/users';
import UserForm from '../components/UserFrom';
import { UserFormValues } from '../type';
import toast from 'react-hot-toast';

const EditUser = () => {
    const { id } = useParams<{ id: string }>();
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();

    const { user, loading } = useSelector((state: RootState) => state.user);

    useEffect(() => {
        if (id) {
            dispatch(getUserById(id));
        }
    }, [dispatch, id]);

    const existingUser: UserFormValues = {
        name: user?.name || '',
        email: user?.email || '',
        role: user?.role || 'telecaller',
    };

    const handleUpdate = async (values: UserFormValues) => {
        if (id) {
            const resultAction = await dispatch(updateUser({ id, formData: values }));
            if (updateUser.fulfilled.match(resultAction)) {
                toast.success("User Edit Successfully")
                navigate("/admin/users")
            }
        }
    };

    if (loading) return <p className="p-4">Loading user...</p>;
    if (!user || !user.name || !user.email || !user.role) {
        return <p className="p-4">No user data found.</p>;
    }

    return (
        <UserForm
            initialValues={existingUser}
            isEditMode={true}
            onSubmit={handleUpdate}
        />
    );
};

export default EditUser;
