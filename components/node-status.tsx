"use client"

import { Card } from "@/components/ui/card"
import { ChevronRight, Server } from "lucide-react"
import { Progress } from "@/components/ui/progress"

const nodes = [
  { id: "video-server-1", status: "healthy", connections: 847, cpu: 45, memory: 62 },
  { id: "video-server-2", status: "healthy", connections: 923, cpu: 52, memory: 58 },
  { id: "video-server-3", status: "healthy", connections: 756, cpu: 38, memory: 54 },
  { id: "video-server-4", status: "healthy", connections: 621, cpu: 41, memory: 49 },
  { id: "video-server-5", status: "healthy", connections: 700, cpu: 47, memory: 56 },
]

export function NodeStatus() {
  return (
    <Card className="p-6 bg-card border-border">
      <div className="flex items-center justify-between mb-6">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="text-base font-semibold text-foreground">gRPC Server Nodes</h3>
            <ChevronRight className="h-4 w-4 text-muted-foreground" />
          </div>
          <p className="text-sm text-muted-foreground mt-1">Active pods and resource usage</p>
        </div>
        <div className="text-sm">
          <span className="text-muted-foreground">Status:</span>
          <span className="ml-2 text-success font-medium">5/5</span>
        </div>
      </div>

      <div className="space-y-4">
        {nodes.map((node) => (
          <div key={node.id} className="p-4 bg-secondary/30 rounded-lg border border-border/50">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-3">
                <Server className="h-4 w-4 text-primary" />
                <span className="text-sm font-mono text-foreground">{node.id}</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-success" />
                <span className="text-xs text-success">Ready</span>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4 text-xs">
              <div>
                <p className="text-muted-foreground mb-1">Connections</p>
                <p className="text-foreground font-semibold">{node.connections}</p>
              </div>
              <div>
                <p className="text-muted-foreground mb-1">CPU</p>
                <div className="flex items-center gap-2">
                  <Progress value={node.cpu} className="h-1.5 flex-1" />
                  <span className="text-foreground font-medium">{node.cpu}%</span>
                </div>
              </div>
              <div>
                <p className="text-muted-foreground mb-1">Memory</p>
                <div className="flex items-center gap-2">
                  <Progress value={node.memory} className="h-1.5 flex-1" />
                  <span className="text-foreground font-medium">{node.memory}%</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </Card>
  )
}
