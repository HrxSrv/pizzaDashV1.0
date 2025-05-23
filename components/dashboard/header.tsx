"use client"
import type { User } from "next-auth"
import { signOut } from "next-auth/react"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Menu, UserIcon, LogOut, Home, PizzaIcon } from "lucide-react"
import Link from "next/link"
import { Sheet, SheetContent, SheetTrigger, SheetHeader, SheetTitle } from "@/components/ui/sheet"

interface DashboardHeaderProps {
  user: User | undefined
}

export function DashboardHeader({ user }: DashboardHeaderProps) {
  const pathname = usePathname()
  
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-14 items-center px-4 sm:px-6">
        {/* Desktop Navigation */}
        <div className="mr-4 hidden md:flex items-center">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <span className="font-bold text-lg">PizzaDash</span>
          </Link>
          <nav className="flex items-center space-x-6 text-sm font-medium">
            <Link 
              href="/dashboard" 
              className="transition-colors hover:text-foreground/80 text-muted-foreground hover:text-foreground"
            >
              Dashboard
            </Link>
            <Link 
              href="/dashboard/orders" 
              className="transition-colors hover:text-foreground/80 text-muted-foreground hover:text-foreground"
            >
              Orders
            </Link>
          </nav>
        </div>

        {/* Mobile Menu */}
        <div className="flex md:hidden items-center mr-4">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="mr-3 h-9 w-9">
                <Menu className="h-4 w-4" />
                <span className="sr-only">Toggle Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-72 sm:w-80 pr-0">
              <SheetHeader className="text-left pb-4">
                <SheetTitle asChild>
                  <Link href="/dashboard" className="flex items-center space-x-2">
                    <span className="font-bold text-lg">PizzaDash</span>
                  </Link>
                </SheetTitle>
              </SheetHeader>
              
              {/* Mobile Navigation Menu */}
              <div className="flex flex-col space-y-2">
                <Button 
                  asChild 
                  variant={pathname === "/dashboard" ? "secondary" : "ghost"} 
                  className="w-full justify-start"
                >
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
            </SheetContent>
          </Sheet>
          
          <Link href="/" className="flex items-center space-x-2">
            <span className="font-bold text-base sm:text-lg">PizzaDash</span>
          </Link>
        </div>

        {/* User Menu */}
        <div className="flex flex-1 items-center justify-end">
          <nav className="flex items-center">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="relative h-8 w-8 rounded-full">
                  <UserIcon className="h-4 w-4" />
                  <span className="sr-only">User menu</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">
                      {user?.name || "User"}
                    </p>
                    <p className="text-xs leading-none text-muted-foreground truncate">
                      {user?.email}
                    </p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                {/* Mobile navigation items */}
                <div className="md:hidden">
                  <DropdownMenuItem asChild>
                    <Link href="/dashboard" className="w-full">
                      Dashboard
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/dashboard/orders" className="w-full">
                      Orders
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                </div>
                <DropdownMenuItem 
                  onClick={() => signOut({ callbackUrl: "/" })}
                  className="text-red-600 focus:text-red-600 cursor-pointer"
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  Log out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </nav>
        </div>
      </div>
    </header>
  )
}