export enum AdmissionStatus {
  pending = 'pending',
  approved = 'approved',
  rejected = 'rejected',
  waitlisted = 'waitlisted',
}

export interface AdmissionFormValues {
  name: string;
  phone: number;
  email: string;
  courseInterest: string;
  message: string;
  status: AdmissionStatus;
}
