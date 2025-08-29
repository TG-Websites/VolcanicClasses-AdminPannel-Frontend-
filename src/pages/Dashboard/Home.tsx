import EcommerceMetrics from "../../components/ecommerce/EcommerceMetrics";
import MonthlySalesChart from "../../components/ecommerce/MonthlySalesChart";
// import StatisticsChart from "../../components/ecommerce/StatisticsChart";
// import MonthlyTarget from "../../components/ecommerce/MonthlyTarget";
// import RecentOrders from "../../components/ecommerce/RecentOrders";
// import DemographicCard from "../../components/ecommerce/DemographicCard";
import PageMeta from "../../components/common/PageMeta";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store";
import { fetchAdminDashboard } from "../../redux/slices/dashboard";
import { useEffect } from "react";
import AdmissionInquiries from "../../components/ecommerce/AdmissionInquiries";
// import Calendar from "../Calendar";
import Classes from "../classes/classes/Classes";
import AnnouncementSection from "../../components/ecommerce/AnnouncementSection";
import StudentDashboard from "../studentDashboard/StudentDashboard";
import InquiriesCards from "../../components/ecommerce/InquiriesCards";

export default function Home() {

  const dispatch = useDispatch<AppDispatch>();
  const { data, loading } = useSelector((state: RootState) => state.adminDashboard);
  const { user } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
  if (user?.role === "admin" || user?.role === "manager" ) {
    dispatch(fetchAdminDashboard());
  }
}, [dispatch, user?.role]);


  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-brand-500"></div>
      </div>
    );
  }


  return (
    <>
      <PageMeta
        title="Dashboard"
        description="Role based dashboard"
      />
      {(user?.role === "user") && (
        <div className="">
          <StudentDashboard />
        </div>
      )}

      <div className="">
        {user?.role === "telecaller" && (
          <InquiriesCards />
        )}
      </div>
      <div className="grid grid-cols-12 gap-4 md:gap-6">

        {/* Everyone can see metrics */}
        <div className="col-span-12 space-y-6 xl:col-span-7">

          {(user?.role === "admin" || user?.role === "manager") && (
            <EcommerceMetrics data={data} />
          )}
          {(user?.role === "admin" || user?.role === "manager") && (
            <MonthlySalesChart />
          )}

        </div>

        {(user?.role === "admin" || user?.role === "manager") && (
          <div className="col-span-12 xl:col-span-5">
            <AnnouncementSection />
          </div>
        )}

        {(user?.role === "admin" || user?.role === "manager") && (
          <div className="col-span-12">
            <Classes />
          </div>
        )}

        {(user?.role === "telecaller" || user?.role === "admin" || user?.role === "manager") && (
          <div className="col-span-12">
            <AdmissionInquiries />
          </div>
        )}



      </div>
    </>
  );
}