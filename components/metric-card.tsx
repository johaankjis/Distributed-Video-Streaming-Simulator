import { Card } from "@/components/ui/card"
import { TrendingUp, TrendingDown, AlertTriangle } from "lucide-react"
import { cn } from "@/lib/utils"

interface MetricCardProps {
  title: string
  value: string
  change: string
  trend: "up" | "down"
  subtitle: string
  alert?: boolean
}

export function MetricCard({ title, value, change, trend, subtitle, alert }: MetricCardProps) {
  const isPositive = trend === "down" || (!alert && trend === "up")

  return (
    <Card className="p-6 bg-card border-border hover:border-primary/50 transition-colors">
      <div className="flex items-start justify-between">
        <div className="space-y-1">
          <p className="text-sm text-muted-foreground">{title}</p>
          <p className="text-3xl font-semibold text-foreground">{value}</p>
        </div>
        {alert && <AlertTriangle className="h-5 w-5 text-warning" />}
      </div>

      <div className="mt-4 flex items-center gap-2">
        <div
          className={cn(
            "flex items-center gap-1 text-sm font-medium",
            isPositive ? "text-success" : "text-destructive",
          )}
        >
          {trend === "up" ? <TrendingUp className="h-4 w-4" /> : <TrendingDown className="h-4 w-4" />}
          <span>{change}</span>
        </div>
        <span className="text-sm text-muted-foreground">{subtitle}</span>
      </div>
    </Card>
  )
}
