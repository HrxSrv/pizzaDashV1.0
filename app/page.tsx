import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/auth" 
import PizzaIcon from "@/public/pizza1.png" 

export default async function Home() {
  const session = await getServerSession(authOptions)

  return (
    <div className="flex min-h-screen flex-col justify-between">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto flex h-14 items-center px-4 sm:px-6">
          <div className="mr-4 flex">
            <Link href="/" className="mr-6 flex items-center space-x-2">
              <span className="font-bold text-lg sm:text-xl">PizzaDash</span>
            </Link>
          </div>
          <div className="flex flex-1 items-center justify-end space-x-2 sm:space-x-4">
            <nav className="flex items-center space-x-2">
              {session ? (
                <div className="flex items-center space-x-2 sm:space-x-4">
                  <span className="hidden sm:inline text-sm text-muted-foreground">
                    Welcome, {session.user?.name}
                  </span>
                  <Link href="/dashboard">
                    <Button variant="outline" size="sm" className="text-xs sm:text-sm">
                      Dashboard
                    </Button>
                  </Link>
                  <Link href="/api/auth/signout">
                    <Button size="sm" className="text-xs sm:text-sm">
                      Sign Out
                    </Button>
                  </Link>
                </div>
              ) : (
                <Link href="/api/auth/signin">
                  <Button size="sm" className="text-xs sm:text-sm">
                    Sign In
                  </Button>
                </Link>
              )}
            </nav>
          </div>
        </div>
      </header>
      
      <main className="flex-1">
        <section className="w-full py-8 sm:py-12 md:py-24 lg:py-32">
          <div className="container mx-auto px-4 sm:px-6 md:px-8">
            <div className="grid gap-8 lg:grid-cols-2 lg:gap-12 xl:grid-cols-2 items-center">
              {/* Text Content */}
              <div className="flex flex-col justify-center space-y-6 text-center lg:text-left">
                <div className="space-y-4">
                  <h1 className="text-2xl font-bold tracking-tighter sm:text-3xl md:text-4xl lg:text-5xl leading-tight">
                    Manage Your Pizza Orders with Ease
                  </h1>
                  <p className="mx-auto lg:mx-0 max-w-[600px] text-muted-foreground text-base sm:text-lg md:text-xl leading-relaxed">
                    A simple dashboard to track and manage all your pizza orders in one place. 
                    {session ? " Go to your dashboard to get started." : " Sign in to get started."}
                  </p>
                </div>
                <div className="flex flex-col gap-3 min-[400px]:flex-row min-[400px]:justify-center lg:justify-start">
                  {session ? (
                    <Link href="/dashboard">
                      <Button size="lg" className="w-full min-[400px]:w-auto gap-2 text-base">
                        Go to Dashboard
                        <ArrowRight className="h-4 w-4" />
                      </Button>
                    </Link>
                  ) : (
                    <Link href="/api/auth/signin">
                      <Button size="lg" className="w-full min-[400px]:w-auto gap-2 text-base">
                        Get Started
                        <ArrowRight className="h-4 w-4" />
                      </Button>
                    </Link>
                  )}
                </div>
              </div>
              
              {/* Image */}
              <div className="flex justify-center lg:justify-end order-first lg:order-last">
                <div className="relative w-full max-w-[280px] sm:max-w-[350px] md:max-w-[400px] lg:max-w-[450px]">
                  <Image
                    src={PizzaIcon}
                    width={450}
                    height={450}
                    alt="Dashboard Preview"
                    className="rounded-lg object-cover w-full h-auto"
                    priority
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <footer className="border-t py-4 sm:py-6 md:py-0">
        <div className="container mx-auto flex flex-col items-center justify-between gap-4 px-4 sm:px-6 md:h-16 md:flex-row">
          <p className="text-xs sm:text-sm text-muted-foreground text-center md:text-left">
            &copy; {new Date().getFullYear()} PizzaDash. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  )
}