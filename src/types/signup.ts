export interface WheelSession {
  token: string;
  userId: number;
  name: string;
  role: string;
  branchId: number;
  branchName: string | null;
}

export interface AccountSignupApiResponse {
  success: boolean;
  message: string;
  userId?: number;
  /**
   * Present when the new account was also signed in so the post-signup wheel
   * can open already authenticated. Absent if the auto-login step failed.
   */
  wheelSession?: WheelSession;
  errors?: Record<string, string[]>;
}
