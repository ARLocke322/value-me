import { House } from 'lucide-react';
import { useLocation } from 'wouter';

export default function Layout({ children }: { children: React.ReactNode }) {
  const [_location, navigate] = useLocation();
  return (
    <main className="relative p-2 pl-10 w-full flex flex-col items-center justify-center min-h-screen">
      <House
        className="fixed top-4 left-2 cursor-pointer"
        size={24}
        onClick={() => navigate("/")}
      />
      {children}
    </main>
  )
}
