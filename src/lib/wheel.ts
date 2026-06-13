/** Default branch for the wheel — new players have no branch of their own, and
 * wheel rewards are shared across branches, so any valid branch works. */
export const WHEEL_BRANCH_ID = 1;

export type WheelLaunchSession = {
  token: string;
  userId: number;
  name: string;
  role: string;
  branchId: number | null;
  branchName?: string | null;
};

/**
 * Builds the embedded wheel URL, handing the player's session to the Flutter
 * app via query params so it opens already authenticated (no second login).
 */
export function buildWheelUrl(session: WheelLaunchSession): string {
  const params = new URLSearchParams({
    token: session.token,
    userId: String(session.userId),
    name: session.name,
    role: session.role,
    branchId: String(session.branchId ?? WHEEL_BRANCH_ID),
  });
  if (session.branchName) {
    params.set('branchName', session.branchName);
  }
  return `/wheel/index.html?${params.toString()}`;
}
