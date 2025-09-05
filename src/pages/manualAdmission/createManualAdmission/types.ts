export type StudentEnrollment = {
  studentName: string;
  email: string;
  mobileNumber: string;
  courseId: string;
  mode: string;      // assuming only these two modes
  paymentMode: "offline"; // assuming only these two
  courseName:string;
  paidAmount: number;
  className: string;
}