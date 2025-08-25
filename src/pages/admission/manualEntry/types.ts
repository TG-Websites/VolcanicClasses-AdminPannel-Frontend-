export enum AdmissionStatus {
  pending = 'pending',
  contacted = 'contacted',    
  converted = 'converted',
  lost = 'lost',
}

export interface AdmissionFormValues {
  name: string;
  phone: number;
  email: string;
  courseInterest: string;
  message: string;
  status: AdmissionStatus;
}
