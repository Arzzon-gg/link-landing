export interface EventPackage {
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

export type EventsLoadResult =
  | {
      status: 'ready';
      events: EventPackage[];
    }
  | {
      status: 'unconfigured' | 'error';
      message: string;
    };
