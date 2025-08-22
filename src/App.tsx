import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "./redux/store";
import SignIn from "./pages/AuthPages/SignIn";
import SignUp from "./pages/AuthPages/SignUp";
import NotFound from "./pages/OtherPage/NotFound";
import AppLayout from "./layout/AppLayout";
import { ScrollToTop } from "./components/common/ScrollToTop";
import Home from "./pages/Dashboard/Home";
import CreateCourseForm from "./pages/courseManagement/createCourse/CreateCourseForm";
import CourseList from "./pages/courseManagement/courseList/CourseList";
// import ProtectedLayout from "./layout/ProtectedLayout";
import { useEffect } from "react";
import Course from "./pages/courseManagement/courseDetail/Course";
import CourseEdit from "./pages/courseManagement/courseEdit/CourseEdit";
import Inquiries from "./pages/admission/inquiries/Inquiries";
import Manual_Entry from "./pages/admission/manualEntry/Manual_Entry";
import AllMedia from "./pages/media/allMedia/AllMedia";
import UploadMedia from "./pages/media/uploadMedia/UploadMedia";
import Classes from "./pages/classes/classes/Classes";
import CreateClass from "./pages/classes/createClasses/CreateClass";
import EditClass from "./pages/classes/editClasses/EditClass";
import CreateAnnouncements from "./pages/announcements/createannouncements/CreateAnnouncements";
import Announcements from "./pages/announcements/announcements/Announcements";
import EditAnnouncements from "./pages/announcements/editannouncements/EditAnnouncements";
import Profile from "./pages/profile/Profile";
import { gotme } from "./redux/slices/auth";
import ProtectedRoute from "./components/common/ProtectedRoute";
import CreateUser from "./pages/users&roles/createUser/CreateUser";
import UserList from "./pages/users&roles/userList/UserList";
import EditUser from "./pages/users&roles/editUser/EditUser";
import AllOrders from "./pages/orders/allOrders/AllOrders";
import OrderDetail from "./pages/orders/order/OrderDetail";
import AllPayments from "./pages/payments/AllPayments/AllPayments";
import PaymentDetail from "./pages/payments/Payment/PaymentDetail";
import Loader from "./utils/Loader";
import Verifyotp from "./pages/AuthPages/Verifyotp";
import StudentSignIn from "./pages/AuthPages/StudentSignIn";
import "react-datepicker/dist/react-datepicker.css";
import EditInquiries from "./pages/admission/EditInquiries.tsx/EditInquiries";


export default function App() {
  const { isLogin, loading, isStudentLogin } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(gotme())
  }, [dispatch]);

  if (loading ) return <Loader /> ;

  return (
    <Router>
      <ScrollToTop />
      <Routes>
        {/* Prevent authenticated users from accessing SignIn or SignUp */}
        <Route
          path="/signin"
          element={isLogin ? <Navigate to="/" /> : <SignIn />}
        />
        <Route
          path="/verifyotp"
          element={isStudentLogin ? <Navigate to="/" /> : <Verifyotp />}
        />
        <Route
          path="/studentsignin"
          element={
            isLogin  ? <Navigate to="/verifyotp" /> : <StudentSignIn />
          }
        />

        <Route
          path="/signup"
          element={isLogin ? <Navigate to="/" /> : <SignUp />}
        />

        {/* Protected Routes */}
        <Route element={<ProtectedRoute><AppLayout /></ProtectedRoute>}>
          {/* Accessible to all authenticated users */}
          <Route index path="/"
            element={
              <ProtectedRoute allowedRoles={["admin", "manager", "telecaller","user"]}>
                <Home />
              </ProtectedRoute>
            }
          />

          <Route path="/profile" element={<Profile />} />

          {/* Only admin or instructor can add/edit courses */}
          <Route
            path="/course/add"
            element={
              <ProtectedRoute allowedRoles={["admin", "manager"]}>
                <CreateCourseForm />
              </ProtectedRoute>
            }
          />
          <Route
            path="/editCourse/:id"
            element={
              <ProtectedRoute allowedRoles={["admin", "manager"]}>
                <CourseEdit />
              </ProtectedRoute>
            }
          />

          <Route path="/course/list"
            element={
              <ProtectedRoute allowedRoles={["admin", "manager"]}>
                <CourseList />
              </ProtectedRoute>
            }
          />

          <Route path="/course/:id" element={<ProtectedRoute allowedRoles={["admin", "manager", "user"]}> <Course /> </ProtectedRoute>} />

          {/* Admission module */}
          <Route
            path="/admission/inquiries"
            element={
              <ProtectedRoute allowedRoles={["admin", "manager","telecaller"]}>
                <Inquiries />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admission/inquiries/:id"
            element={
              <ProtectedRoute allowedRoles={["admin", "manager","telecaller"]}>
                <EditInquiries />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admission/manual-entry"
            element={
              <ProtectedRoute allowedRoles={["admin", "manager","telecaller"]}>
                <Manual_Entry />
              </ProtectedRoute>
            }
          />

          {/* Media */}
          <Route path="/allmedia" element={<ProtectedRoute allowedRoles={["admin", "manager"]}><AllMedia /></ProtectedRoute>} />
          <Route
            path="/uploadmedia"
            element={
              <ProtectedRoute allowedRoles={["admin", "manager"]}>
                <UploadMedia />
              </ProtectedRoute>
            }
          />

          {/* Live Classes */}
          <Route path="/live-classes/calendar" element={<ProtectedRoute allowedRoles={["admin", "manager"]}><Classes /></ProtectedRoute>} />
          <Route path="/live-classes/create" element={<ProtectedRoute allowedRoles={["admin", "manager"]}><CreateClass /></ProtectedRoute>} />
          <Route path="/live-classes/edit/:id" element={<ProtectedRoute allowedRoles={["admin", "manager"]}><EditClass /></ProtectedRoute>} />

          {/* Announcements */}
          <Route path="/announcements" element={<ProtectedRoute allowedRoles={["admin", "manager"]}><Announcements /></ProtectedRoute>} />
          <Route path="/announcements/create" element={<ProtectedRoute allowedRoles={["admin", "manager"]}><CreateAnnouncements /></ProtectedRoute>} />
          <Route path="/announcements/edit/:id" element={<ProtectedRoute allowedRoles={["admin", "manager"]}><EditAnnouncements /></ProtectedRoute>} />

          {/* Admin-only user management */}
          <Route
            path="/admin/users"
            element={
              <ProtectedRoute allowedRoles={["admin"]}>
                <UserList />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/users/create"
            element={
              <ProtectedRoute allowedRoles={["admin"]}>
                <CreateUser />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/users/edit/:id"
            element={
              <ProtectedRoute allowedRoles={["admin"]}>
                <EditUser />
              </ProtectedRoute>
            }
          />


          {/* orders */}
          <Route
            path="/orders"
            element={
              <ProtectedRoute allowedRoles={["admin"]}>
                <AllOrders />
              </ProtectedRoute>
            }
          />
          <Route
            path="/order/:id"
            element={
              <ProtectedRoute allowedRoles={["admin"]}>
                <OrderDetail />
              </ProtectedRoute>
            }
          />


          {/* Payments */}
          <Route
            path="/payments"
            element={
              <ProtectedRoute allowedRoles={["admin"]}>
                <AllPayments />
              </ProtectedRoute>
            }
          />
          <Route
            path="/payment/:id"
            element={
              <ProtectedRoute allowedRoles={["admin"]}>
                <PaymentDetail />
              </ProtectedRoute>
            }
          />
        </Route>
        {/* Fallback Route */}
        <Route path="*" element={<NotFound />} />
      </Routes >
    </Router >
  );
}
