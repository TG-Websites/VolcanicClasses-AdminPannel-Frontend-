// types.ts

export type ClassesFormValues = {
  course: string;
  instructor: string;
  date: string; // ISO date string
  time: string; // HH:mm
  mode: 'online' | 'offline' | 'hybrid';
  link: string;
  isCancelled: boolean;
};
