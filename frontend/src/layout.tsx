import { House } from 'lucide-react';
import { useLocation } from 'wouter';

export default function Layout({ children }: { children: React.ReactNode }) {
  const [_location, navigate] = useLocation();
  return (
    <main className="min-h-screen bg-background p-4 md:p-8">
      <House
        className="fixed top-4 left-2 cursor-pointer"
        size={24}
        onClick={() => navigate("/")}
      />
      {children}
    </main>
  )
}
