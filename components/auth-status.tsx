"use client"

import { useSession } from "next-auth/react"
import { Loader2 } from "lucide-react"

export function AuthStatus() {
  const { status } = useSession()

  if (status === "loading") {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <span className="sr-only">Loading</span>
      </div>
    )
  }

  return null
}
