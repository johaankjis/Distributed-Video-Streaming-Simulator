"use client"

import { MetricCard } from "@/components/metric-card"
import { StreamChart } from "@/components/stream-chart"
import { NodeStatus } from "@/components/node-status"
import { QualityDistribution } from "@/components/quality-distribution"

export function MetricsGrid() {
  return (
    <div className="space-y-6">
      {/* Top metrics row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard title="Active Streams" value="2,847" change="+12.3%" trend="up" subtitle="Current connections" />
        <MetricCard title="Throughput" value="8.2K" change="+5.7%" trend="up" subtitle="Chunks/second" />
        <MetricCard title="P99 Latency" value="87ms" change="-3.2%" trend="down" subtitle="99th percentile" />
        <MetricCard title="Error Rate" value="0.12%" change="+0.05%" trend="up" subtitle="Failed chunks" alert />
      </div>

      {/* Charts row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <StreamChart title="Stream Requests" subtitle="Requests per minute" data={generateTimeSeriesData()} />
        <StreamChart
          title="Data Transfer"
          subtitle="Outgoing bandwidth"
          data={generateBandwidthData()}
          colors={["#3b82f6", "#eab308"]}
        />
      </div>

      {/* Bottom row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <NodeStatus />
        <QualityDistribution />
      </div>
    </div>
  )
}

function generateTimeSeriesData() {
  const now = Date.now()
  return Array.from({ length: 50 }, (_, i) => ({
    time: now - (50 - i) * 60000,
    value: Math.floor(Math.random() * 1000 + 2000),
  }))
}

function generateBandwidthData() {
  const now = Date.now()
  return Array.from({ length: 50 }, (_, i) => ({
    time: now - (50 - i) * 60000,
    outgoing: Math.floor(Math.random() * 200 + 400),
    incoming: Math.floor(Math.random() * 50 + 10),
  }))
}
