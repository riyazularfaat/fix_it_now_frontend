"use client"

import * as React from "react"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import {
  MenuIcon,
  LayoutDashboard,
  User as UserIcon,
  Settings,
  LogOut,
} from "lucide-react"

import { cn } from "@/lib/utils"
import type { NavbarProps } from "@/lib/types"
import { logout } from "@/service/logout"
import { Button, buttonVariants } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { ModeToggle } from "./mode-toggle"

// Navigation items configuration
const navLinks = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services" },
  { label: "Technicians", href: "/technicians" },
  { label: "About us", href: "/about" },
  { label: "Contacts", href: "/contact" },
]

// User menu items configuration
const userMenuItems = [
  { label: "Dashboard", icon: LayoutDashboard, action: "dashboard" },
  { label: "Profile", icon: UserIcon, action: "profile" },
  { label: "Settings", icon: Settings, action: "settings" },
]

function Logo() {
  return (
    <Link
      href="/"
      className="flex items-center gap-2 font-semibold tracking-tight"
      aria-label="FixItNow home"
    >
      <span className="flex size-9 items-center justify-center rounded-lg text-primary-foreground">
        <Image
          src="/logo_blue.png"
          alt=""
          width={20}
          height={20}
          className="size-5"
        />
      </span>
      <span className="text-lg">
        FixIt<span className="text-primary">Now</span>
      </span>
    </Link>
  )
}

function initials(name: string) {
  return name
    .split(" ")
    .map((part) => part[0])
    .slice(0, 2)
    .join("")
    .toUpperCase()
}

export function Navbar({ user }: NavbarProps) {
  const router = useRouter()

  const handleUserMenuAction = async (action: string) => {
    if (!user.success) return

    if (action === "dashboard") {
      const role = user.data.profile.role
      if (role === "CUSTOMER") {
        router.push("/dashboard")
      } else if (role === "TECHNICIAN") {
        router.push("/technician-dashboard")
      } else if (role === "ADMIN") {
        router.push("/admin-dashboard")
      }
      return
    }

    if (action === "profile") {
      router.push("/profile")
      return
    }

    if (action === "settings") {
      router.push("/settings")
      return
    }

    if (action === "logout") {
      await logout()
      toast.success("Logged out successfully")
      router.push("/login")
    }
  }

  const profile = user.success ? user.data.profile : null

  return (
    <nav className="sticky top-0 z-40 w-full border-b bg-background/80 backdrop-blur supports-backdrop-filter:bg-background/60">
      <div className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <div className="flex items-around gap-8">
          <Logo />
        </div>
        <div className="hidden items-center gap-1 lg:flex" aria-label="Main">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
              )}
            >
              {link.label}
            </Link>
          ))}
        </div>
        {/* User menu or login */}
        <div className="flex items-center gap-1 sm:gap-2">
          <ModeToggle />

          {/* Desktop user menu / login */}
          <div className="hidden lg:block">
            {profile ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="rounded-full"
                    aria-label="Open user menu"
                  >
                    <Avatar className="size-9">
                      <AvatarImage src={profile.avatarUrl || "/placeholder.svg"} alt="" />
                      <AvatarFallback>{initials(profile.name)}</AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuGroup>
                    <DropdownMenuLabel>
                      <div className="flex flex-col gap-0.5">
                        <span className="truncate text-sm font-medium text-foreground">
                          {profile.name}
                        </span>
                        <span className="truncate text-xs font-normal text-muted-foreground">
                          {profile.email}
                        </span>
                      </div>
                    </DropdownMenuLabel>
                  </DropdownMenuGroup>
                  <DropdownMenuSeparator />
                  <DropdownMenuGroup>
                    {userMenuItems.map((item) => {
                      const Icon = item.icon
                      return (
                        <DropdownMenuItem
                          key={item.action}
                          onSelect={() => handleUserMenuAction(item.action)}
                        >
                          <Icon />
                          {item.label}
                        </DropdownMenuItem>
                      )
                    })}
                  </DropdownMenuGroup>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    variant="destructive"
                    onSelect={() => handleUserMenuAction("logout")}
                  >
                    <LogOut />
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Button asChild>
                <Link href="/login">Login</Link>
              </Button>
            )}
          </div>

          {/* Mobile hamburger */}
          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="lg:hidden"
                aria-label="Open navigation menu"
              >
                <MenuIcon />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-80 p-0">
              <SheetHeader className="border-b">
                <SheetTitle>
                  <Logo />
                </SheetTitle>
              </SheetHeader>

              <nav
                className="flex flex-col gap-1 p-4"
                aria-label="Mobile navigation"
              >
                {navLinks.map((link) => (
                  <SheetClose key={link.href} asChild>
                    <Link
                      href={link.href}
                      className="block rounded-md px-3 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
                    >
                      {link.label}
                    </Link>
                  </SheetClose>
                ))}
              </nav>

              <Separator />

              <div className="mt-auto flex flex-col gap-3 p-4">
                {profile ? (
                  <>
                    <div className="flex items-center gap-3">
                      <Avatar className="size-10">
                        <AvatarImage
                          src={profile.avatarUrl || "/placeholder.svg"}
                          alt=""
                        />
                        <AvatarFallback>{initials(profile.name)}</AvatarFallback>
                      </Avatar>
                      <div className="flex min-w-0 flex-col">
                        <span className="truncate text-sm font-medium text-foreground">
                          {profile.name}
                        </span>
                        <span className="truncate text-xs text-muted-foreground">
                          {profile.email}
                        </span>
                      </div>
                    </div>

                    <div className="flex flex-col gap-1">
                      {userMenuItems.map((item) => {
                        const Icon = item.icon
                        return (
                          <SheetClose key={item.action} asChild>
                            <button
                              type="button"
                              onClick={() => handleUserMenuAction(item.action)}
                              className="flex items-center gap-2 rounded-md px-3 py-2 text-left text-sm font-medium text-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
                            >
                              <Icon className="size-4" />
                              {item.label}
                            </button>
                          </SheetClose>
                        )
                      })}
                    </div>

                    <Button
                      variant="outline"
                      className="w-full justify-start"
                      onClick={() => handleUserMenuAction("logout")}
                    >
                      <LogOut data-icon="inline-start" />
                      Logout
                    </Button>
                  </>
                ) : (
                  <SheetClose asChild>
                    <Link
                      href="/login"
                      className={cn(buttonVariants({ variant: "default" }), "w-full")}
                    >
                      Login
                    </Link>
                  </SheetClose>
                )}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  )
}
