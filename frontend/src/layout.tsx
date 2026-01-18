
export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <main className="p-4 w-full flex flex-col items-center justify-center min-h-screen">
      {children}
    </main>
  )
}
