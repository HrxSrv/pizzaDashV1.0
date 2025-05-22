import type React from "react"
import { redirect } from "next/navigation"
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/auth"
import { DashboardSidebar } from "@/components/dashboard/sidebar"
import { DashboardHeader } from "@/components/dashboard/header"
import { AuthStatus } from "@/components/auth-status"

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await getServerSession(authOptions)
  console.log("Session:", session)
  if (!session) {
    redirect("/api/auth/signin")
  }

  return (
    <div className="flex min-h-screen flex-col mx-auto">
      <AuthStatus />
      <DashboardHeader user={session.user} />
      <div className="container mx-auto flex-1 items-start md:grid md:grid-cols-[220px_minmax(0,1fr)] md:gap-6 lg:grid-cols-[240px_minmax(0,1fr)] lg:gap-10">
        <DashboardSidebar />
        <main className="flex w-full flex-col overflow-hidden pt-6">{children}</main>
      </div>
    </div>
  )
}
