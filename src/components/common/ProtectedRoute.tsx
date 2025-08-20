// components/common/ProtectedRoute.tsx
import { Navigate } from "react-router";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { ReactNode } from "react";

interface ProtectedRouteProps {
  children: ReactNode;
  allowedRoles?: string[]; //
}


const ProtectedRoute = ({ children, allowedRoles }: ProtectedRouteProps) => {
  const { isLogin, user } = useSelector((state: RootState) => state.auth);

  if (!isLogin) {
    return <Navigate to="/signin" replace />;
  }

if (allowedRoles && !allowedRoles.includes(user?.role ?? "")) {
  return <Navigate to="/unauthorized" replace />;
}


  return children;
};

export default ProtectedRoute;
