export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex min-h-screen bg-zinc-950">
      <main className="flex-1 w-full">
        {children}
      </main>
    </div>
  )
}