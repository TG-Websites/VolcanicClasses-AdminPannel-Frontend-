export interface LiveClass {
  isCancelled: boolean;
  _id: string;
  course: string;
  instructor: string;
  date: string;
  time: string;
  mode: string;
  link: string;
  createdAt: string;
}

export interface AdminDashboardData {
  courseCount: number;
  liveClassCount: number;
  unresolvedInquiryCount: number;
  totalRevenue: number;
  upcomingLiveClasses: LiveClass[];
}
