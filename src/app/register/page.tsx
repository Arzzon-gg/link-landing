import { ArcadeBackground } from '@/components/ArcadeBackground';
import { RegistrationForm } from '@/components/RegistrationForm';

export default function RegisterPage() {
  return (
    <main className="relative min-h-screen flex items-center justify-center px-4 py-16">
      <ArcadeBackground />
      <div className="relative z-10 w-full">
        <RegistrationForm />
      </div>
    </main>
  );
}
