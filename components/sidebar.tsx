"use client"

import { Activity, BarChart3, Database, Network, Server, AlertCircle } from "lucide-react"
import { cn } from "@/lib/utils"
import { useState } from "react"

const navigation = [
  { name: "Overview", icon: BarChart3, current: true, section: "main" },
  { name: "Compute", section: "header" },
  { name: "gRPC Servers", icon: Server, current: false },
  { name: "Load Simulator", icon: Activity, current: false },
  { name: "Network", section: "header" },
  { name: "Stream Metrics", icon: Network, current: false },
  { name: "Data Transfer", icon: Database, current: false },
  { name: "Monitoring", section: "header" },
  { name: "Errors", icon: AlertCircle, current: false },
]

export function Sidebar() {
  const [activeItem, setActiveItem] = useState("Overview")

  return (
    <div className="w-64 bg-card border-r border-border flex flex-col">
      <div className="p-6 border-b border-border">
        <h1 className="text-lg font-semibold text-foreground">Video Streaming</h1>
        <p className="text-xs text-muted-foreground mt-1">Distributed Simulator</p>
      </div>

      <nav className="flex-1 p-4 space-y-1">
        {navigation.map((item) => {
          if (item.section === "header") {
            return (
              <div key={item.name} className="pt-4 pb-2">
                <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">{item.name}</h3>
              </div>
            )
          }

          const Icon = item.icon
          return (
            <button
              key={item.name}
              onClick={() => setActiveItem(item.name)}
              className={cn(
                "w-full flex items-center gap-3 px-3 py-2 text-sm rounded-md transition-colors",
                activeItem === item.name
                  ? "bg-secondary text-foreground"
                  : "text-muted-foreground hover:bg-secondary/50 hover:text-foreground",
              )}
            >
              {Icon && <Icon className="h-4 w-4" />}
              <span>{item.name}</span>
            </button>
          )
        })}
      </nav>

      <div className="p-4 border-t border-border">
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <div className="h-2 w-2 rounded-full bg-success animate-pulse" />
          <span>All systems operational</span>
        </div>
      </div>
    </div>
  )
}
