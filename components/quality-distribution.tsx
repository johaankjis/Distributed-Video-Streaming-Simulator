"use client"

import { Card } from "@/components/ui/card"
import { ChevronRight } from "lucide-react"
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts"

const data = [
  { name: "High Quality", value: 1247, color: "#6366f1" },
  { name: "Medium Quality", value: 982, color: "#8b5cf6" },
  { name: "Low Quality", value: 618, color: "#a855f7" },
]

export function QualityDistribution() {
  return (
    <Card className="p-6 bg-card border-border">
      <div className="flex items-center justify-between mb-6">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="text-base font-semibold text-foreground">Stream Quality Distribution</h3>
            <ChevronRight className="h-4 w-4 text-muted-foreground" />
          </div>
          <p className="text-sm text-muted-foreground mt-1">Adaptive bitrate selection</p>
        </div>
      </div>

      <div className="flex items-center gap-8">
        <ResponsiveContainer width="50%" height={200}>
          <PieChart>
            <Pie data={data} cx="50%" cy="50%" innerRadius={60} outerRadius={80} paddingAngle={2} dataKey="value">
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{
                backgroundColor: "#1a1a1a",
                border: "1px solid #333",
                borderRadius: "6px",
                color: "#fff",
              }}
            />
          </PieChart>
        </ResponsiveContainer>

        <div className="flex-1 space-y-4">
          {data.map((item) => (
            <div key={item.name} className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="h-3 w-3 rounded-full" style={{ backgroundColor: item.color }} />
                <span className="text-sm text-foreground">{item.name}</span>
              </div>
              <div className="text-right">
                <p className="text-sm font-semibold text-foreground">{item.value.toLocaleString()}</p>
                <p className="text-xs text-muted-foreground">
                  {((item.value / data.reduce((a, b) => a + b.value, 0)) * 100).toFixed(1)}%
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-6 pt-4 border-t border-border">
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">Total Streams</span>
          <span className="font-semibold text-foreground">
            {data.reduce((a, b) => a + b.value, 0).toLocaleString()}
          </span>
        </div>
      </div>
    </Card>
  )
}
