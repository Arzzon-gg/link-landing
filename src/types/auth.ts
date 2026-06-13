export interface AccountLoginSession {
  userId: number;
  name: string;
  email: string;
  role: string;
  branchId: number | null;
  branchName: string | null;
  branchIds: number[];
  permissions: string[];
  phone: string | null;
  dateOfBirth: string | null;
  isMarried: boolean | null;
  marriageDate: string | null;
  address: string | null;
  firebaseLinked: boolean;
  hasPassword: boolean;
  profileCompleted: boolean;
}

export interface AccountLoginApiResponse {
  success: boolean;
  message: string;
  session?: AccountLoginSession;
  errors?: Record<string, string[]>;
}
