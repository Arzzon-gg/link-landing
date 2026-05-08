export interface FormValues {
  name: string;
  phone: string;
  email: string;
  address: string;
  age: number;
}

export interface ApiResponse {
  success: boolean;
  message: string;
  submissionId?: string;
  errors?: Record<string, string[]>;
}
