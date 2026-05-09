export interface FormValues {
  name: string;
  phone: string;
  email: string;
  address: string;
  dateOfBirth: string; // ISO date (YYYY-MM-DD)
}

export interface ApiResponse {
  success: boolean;
  message: string;
  submissionId?: string;
  errors?: Record<string, string[]>;
}
