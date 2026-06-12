export interface AccountLoginSession {
  userId: number;
  name: string;
  email: string;
  role: string;
  branchId: number | null;
  branchName: string | null;
  branchIds: number[];
  permissions: string[];
}

export interface AccountLoginApiResponse {
  success: boolean;
  message: string;
  session?: AccountLoginSession;
  errors?: Record<string, string[]>;
}
