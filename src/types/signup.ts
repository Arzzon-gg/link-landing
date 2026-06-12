export interface AccountSignupApiResponse {
  success: boolean;
  message: string;
  userId?: number;
  errors?: Record<string, string[]>;
}
