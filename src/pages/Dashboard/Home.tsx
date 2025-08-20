import EcommerceMetrics from "../../components/ecommerce/EcommerceMetrics";
import MonthlySalesChart from "../../components/ecommerce/MonthlySalesChart";
// import StatisticsChart from "../../components/ecommerce/StatisticsChart";
// import MonthlyTarget from "../../components/ecommerce/MonthlyTarget";
// import RecentOrders from "../../components/ecommerce/RecentOrders";
// import DemographicCard from "../../components/ecommerce/DemographicCard";
import PageMeta from "../../components/common/PageMeta";
import { useDispatch,useSelector } from "react-redux";
import { AppDispatch,RootState } from "../../redux/store";
import { fetchAdminDashboard } from "../../redux/slices/dashboard";
import { useEffect } from "react";
import AdmissionInquiries from "../../components/ecommerce/AdmissionInquiries";
// import Calendar from "../Calendar";
import Classes from "../classes/classes/Classes";
import AnnouncementSection from "../../components/ecommerce/AnnouncementSection";

export default function Home() {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(fetchAdminDashboard())
  },[])

  const {  data } = useSelector((state: RootState) => state.adminDashboard);


  return (
    <>
      <PageMeta
        title="React.js Ecommerce Dashboard | TailAdmin - React.js Admin Dashboard Template"
        description="This is React.js Ecommerce Dashboard page for TailAdmin - React.js Tailwind CSS Admin Dashboard Template"
      />
      <div className="grid grid-cols-12 gap-4 md:gap-6">
        <div className="col-span-12 space-y-6 xl:col-span-7">
          <EcommerceMetrics data={data} />

          <MonthlySalesChart />
        </div>

         <div className="col-span-12 xl:col-span-5">
          {/*<MonthlyTarget /> */} <AnnouncementSection/> 
        </div> 

        <div className="col-span-12">
          {/* {/* <StatisticsChart />  */} <Classes/>
        </div>

        <div className="col-span-12 ">
          {/* <DemographicCard /> */} <AdmissionInquiries/>
        </div>

        {/* <div className="col-span-12 xl:col-span-7">
          <RecentOrders />
        </div> */}
      </div>
    </>
  );
}
