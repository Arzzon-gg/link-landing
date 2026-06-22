export interface Package {
  id: number;
  branchId: number;
  branchName: string;
  name: string;
  description: string | null;
  imageUrl: string;
  capacity: number;
  price: number;
  createdAt: string;
  isShared: boolean;
  isHiddenForBranch: boolean;
}

export type PackagesLoadResult =
  | {
      status: 'ready';
      packages: Package[];
    }
  | {
      status: 'unconfigured' | 'error';
      message: string;
    };
