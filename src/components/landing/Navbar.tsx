import { getCurrentAccountSession } from '@/lib/account-session';
import { NavbarClient } from './NavbarClient';

export async function Navbar() {
  const session = await getCurrentAccountSession();

  return <NavbarClient session={session} />;
}
