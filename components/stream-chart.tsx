"use client"

import { Card } from "@/components/ui/card"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"
import { ChevronRight } from "lucide-react"

interface StreamChartProps {
  title: string
  subtitle: string
  data: any[]
  colors?: string[]
}

export function StreamChart({ title, subtitle, data, colors = ["#6366f1"] }: StreamChartProps) {
  const formattedData = data.map((d) => ({
    ...d,
    time: new Date(d.time).toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" }),
  }))

  return (
    <Card className="p-6 bg-card border-border">
      <div className="flex items-start justify-between mb-6">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="text-base font-semibold text-foreground">{title}</h3>
            <ChevronRight className="h-4 w-4 text-muted-foreground" />
          </div>
          <p className="text-sm text-muted-foreground mt-1">{subtitle}</p>
        </div>

        <div className="flex items-center gap-4">
          {colors.length > 1 ? (
            <>
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full" style={{ backgroundColor: colors[0] }} />
                <span className="text-xs text-muted-foreground">Outgoing</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full" style={{ backgroundColor: colors[1] }} />
                <span className="text-xs text-muted-foreground">Incoming</span>
              </div>
            </>
          ) : null}
        </div>
      </div>

      <ResponsiveContainer width="100%" height={200}>
        <LineChart data={formattedData}>
          <CartesianGrid strokeDasharray="3 3" stroke="#333" />
          <XAxis dataKey="time" stroke="#666" tick={{ fill: "#999", fontSize: 11 }} />
          <YAxis stroke="#666" tick={{ fill: "#999", fontSize: 11 }} />
          <Tooltip
            contentStyle={{
              backgroundColor: "#1a1a1a",
              border: "1px solid #333",
              borderRadius: "6px",
              color: "#fff",
            }}
          />
          {colors.length > 1 ? (
            <>
              <Line type="monotone" dataKey="outgoing" stroke={colors[0]} strokeWidth={2} dot={false} />
              <Line type="monotone" dataKey="incoming" stroke={colors[1]} strokeWidth={2} dot={false} />
            </>
          ) : (
            <Line type="monotone" dataKey="value" stroke={colors[0]} strokeWidth={2} dot={false} />
          )}
        </LineChart>
      </ResponsiveContainer>

      <div className="mt-4 text-xs text-muted-foreground">12 hours ago → Now</div>
    </Card>
  )
}
