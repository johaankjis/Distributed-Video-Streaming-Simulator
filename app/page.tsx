import { Sidebar } from "@/components/sidebar"
import { MetricsGrid } from "@/components/metrics-grid"
import { Header } from "@/components/header"

export default function Page() {
  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Header />
        <main className="flex-1 p-6">
          <MetricsGrid />
        </main>
      </div>
    </div>
  )
}
