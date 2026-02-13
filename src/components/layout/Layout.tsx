import { Outlet } from 'react-router-dom';
import { Header } from './Header';
import { Footer } from './Footer';
import { useAuthStore } from '@/stores/authStore';

export function Layout() {
  const { user } = useAuthStore();

  return (
    <div className={`min-h-screen flex flex-col ${user ? 'bg-background' : 'bg-neutral-950'}`}>
      <Header />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
