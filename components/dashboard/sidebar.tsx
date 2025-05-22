"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Home, PizzaIcon } from "lucide-react"

export function DashboardSidebar() {
  const pathname = usePathname()

  return (
    <div className="flex flex-col space-y-4 py-4">
      <div className="px-3 py-2">
        <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">Dashboard</h2>
        <div className="space-y-1">
          <Button asChild variant={pathname === "/dashboard" ? "secondary" : "ghost"} className="w-full justify-start">
            <Link href="/dashboard">
              <Home className="mr-2 h-4 w-4" />
              Home
            </Link>
          </Button>
          <Button
            asChild
            variant={pathname === "/dashboard/orders" ? "secondary" : "ghost"}
            className="w-full justify-start"
          >
            <Link href="/dashboard/orders">
              <PizzaIcon className="mr-2 h-4 w-4" />
              Orders
            </Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
