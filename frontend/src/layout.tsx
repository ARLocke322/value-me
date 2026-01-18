import { House } from 'lucide-react';
import { useLocation } from 'wouter';

export default function Layout({ children }: { children: React.ReactNode }) {
  const [_location, navigate] = useLocation();
  return (
    <main className="relative p-4 w-full flex flex-col items-center justify-center min-h-screen">
      <House
        className="absolute top-4 left-4 cursor-pointer"
        size={24}
        onClick={() => navigate("/")}
      />
      {children}
    </main>
  )
}
