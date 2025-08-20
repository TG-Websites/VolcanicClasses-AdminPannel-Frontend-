// import { useEffect } from 'react';
import { Pencil } from 'lucide-react';
import {  useSelector } from 'react-redux';
// import { AppDispatch } from '../../redux/store';
// import { gotme } from '../../redux/slices/auth';
import { RootState } from '../../redux/store';


const Profile = () => {

    // const dispatch = useDispatch<AppDispatch>();
      const {user } = useSelector((state: RootState) => state.auth);

    // useEffect(() => {
    //     dispatch(gotme());
    // }, []);

    return (
        <div className="max-w-6xl mx-auto p-4 space-y-6">
            {/* Header */}
            <div className="bg-white shadow rounded-lg p-6">
                <div className="flex items-center gap-4">
                    <img
                        src="/images/user/user.png"
                        alt="Profile"
                        className="w-20 h-20 rounded-full object-cover"
                    />
                    <div>
                        <h2 className="text-xl font-semibold text-gray-900">{user?.name}</h2>
                        <p className="text-sm text-gray-600">{user?.role}</p>
                        <p className="text-sm text-gray-600">Leeds, United Kingdom</p>
                    </div>
                </div>
            </div>

            {/* Personal Information */}
            <div className="bg-white shadow rounded-lg p-6">
                <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-semibold text-gray-900">Personal Information</h3>
                    <button className="text-white bg-brand-500 hover:bg-brand-600 p-2 rounded">
                        <Pencil className="w-4 h-4" />
                    </button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <p className="text-sm text-gray-500">First Name</p>
                        <p className="font-medium text-gray-800">{user?.name}</p>
                    </div>
                    <div>
                        <p className="text-sm text-gray-500">Last Name</p>
                        <p className="font-medium text-gray-800">Hopper</p>
                    </div>
                    <div>
                        <p className="text-sm text-gray-500">Email Address</p>
                        <p className="font-medium text-gray-800">{user?.email}</p>
                    </div>
                    <div>
                        <p className="text-sm text-gray-500">Phone Number</p>
                        <p className="font-medium text-gray-800">(+62) 821 2554-5846</p>
                    </div>
                    <div>
                        <p className="text-sm text-gray-500">Date of Birth</p>
                        <p className="font-medium text-gray-800">12-10-1990</p>
                    </div>
                    <div>
                        <p className="text-sm text-gray-500">User Role</p>
                        <p className="font-medium text-gray-800">{user?.role}</p>
                    </div>
                </div>
            </div>

            {/* Address */}
            <div className="bg-white shadow rounded-lg p-6">
                <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-semibold text-gray-900">Address</h3>
                    <button className="text-white bg-brand-500 hover:bg-brand-600 p-2 rounded">
                        <Pencil className="w-4 h-4" />
                    </button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                        <p className="text-sm text-gray-500">Country</p>
                        <p className="font-medium text-gray-800">United Kingdom</p>
                    </div>
                    <div>
                        <p className="text-sm text-gray-500">City</p>
                        <p className="font-medium text-gray-800">Leeds, East London</p>
                    </div>
                    <div>
                        <p className="text-sm text-gray-500">Postal Code</p>
                        <p className="font-medium text-gray-800">ERT 1254</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;
