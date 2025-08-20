// CreateUserForm.tsx
import { useDispatch } from 'react-redux';
import UserForm from '../components/UserFrom';
import { UserFormValues } from '../type';
import { AppDispatch } from '../../../redux/store';
import { createUser } from '../../../redux/slices/users';
import { useNavigate } from 'react-router';
import toast from 'react-hot-toast';

const defaultValues: UserFormValues = {
  name: '',
  email: '',
  password: '',
  role: 'telecaller',
};

const CreateUser = () => {
  const dispatch = useDispatch<AppDispatch>()
  const navigate = useNavigate();
  const handleCreate = async (values: UserFormValues) => {
    const resultAction = await dispatch(createUser(values));
    if (createUser.fulfilled.match(resultAction)) {
      toast.success("User Create Successfully")
      navigate("/admin/users")
    }
  };


  return <UserForm initialValues={defaultValues} isEditMode={false} onSubmit={handleCreate} />;
};

export default CreateUser;
