"use client"

import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar, MoreHorizontal, TrendingUp } from "lucide-react"

export function Header() {
  return (
    <header className="border-b border-border bg-background">
      <div className="flex items-center justify-between px-6 py-4">
        <div>
          <h2 className="text-2xl font-semibold text-foreground">Observability</h2>
        </div>

        <div className="flex items-center gap-3">
          <Select defaultValue="production">
            <SelectTrigger className="w-36 bg-card border-border">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="production">Production</SelectItem>
              <SelectItem value="staging">Staging</SelectItem>
              <SelectItem value="development">Development</SelectItem>
            </SelectContent>
          </Select>

          <Select defaultValue="12h">
            <SelectTrigger className="w-36 bg-card border-border">
              <Calendar className="h-4 w-4 mr-2" />
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1h">Last 1 hour</SelectItem>
              <SelectItem value="6h">Last 6 hours</SelectItem>
              <SelectItem value="12h">Last 12 hours</SelectItem>
              <SelectItem value="24h">Last 24 hours</SelectItem>
              <SelectItem value="7d">Last 7 days</SelectItem>
            </SelectContent>
          </Select>

          <Button variant="ghost" size="icon">
            <TrendingUp className="h-4 w-4" />
          </Button>

          <Button variant="ghost" size="icon">
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </header>
  )
}
