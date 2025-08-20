// types.ts
export interface UserFormValues {
  name: string;
  email: string;
  password?: string;
  role: 'admin' | 'manager' | 'telecaller' | 'user';
}
