"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Heart,
  Menu,
  X,
  MessageCircle,
  AudioWaveform,
  LogOut,
  LogIn,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "./theme-toggle";
import { SignInButton } from "@/components/auth/sign-in-button";
import { useSession } from "@/lib/contexts/session-context";

export function Navbar() {
  const { isAuthenticated, logout, user } = useSession();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { href: "/features", label: "Features" },
    { href: "/about", label: "About Aura" },
  ];

  return (
    <div className="w-full fixed top-4 z-50 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="relative bg-gradient-to-r from-white/10 via-white/5 to-white/10 dark:from-gray-900/10 dark:via-gray-900/5 dark:to-gray-900/10 backdrop-blur-sm rounded-full shadow-sm">
          <nav className="relative">
            <div className="flex h-16 items-center justify-between px-6">
              <Link
                href="/"
                className="flex items-center space-x-2 transition-opacity hover:opacity-80"
              >
                <div className="flex flex-col">
                  <span className="font-semibold text-lg bg-gradient-to-r from-amber-200 to-amber-300 bg-clip-text text-transparent">
                    CrTk
                  </span>
                  <span className="text-xs dark:text-muted-foreground">
                    Your mental health Companion{" "}
                  </span>
                </div>
              </Link>

              <div className="flex items-center gap-4">
                <div className="hidden md:flex items-center space-x-1">
                  {navItems.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className="px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors relative group"
                    >
                      {item.label}
                      <span className="absolute bottom-0 left-0 w-full h-0.5 bg-amber-200 scale-x-0 group-hover:scale-x-100 transition-transform duration-200 origin-left" />
                    </Link>
                  ))}
                </div>

                <div className="flex items-center gap-3">
                  <ThemeToggle />

                  {isAuthenticated ? (
                    <>
                      <Button
                        asChild
                        className="hidden md:flex gap-2 bg-amber-200/90 hover:bg-amber-200 text-gray-800"
                      >
                        <Link href="/dashboard">
                          <MessageCircle className="w-4 h-4 mr-1" />
                          Start Chat
                        </Link>
                      </Button>
                      <Button
                        variant="outline"
                        onClick={logout}
                        className="text-muted-foreground hover:text-foreground transition-colors"
                      >
                        <LogOut className="w-4 h-4 mr-2" />
                        Sign out
                      </Button>
                    </>
                  ) : (
                    <SignInButton />
                  )}

                  <Button
                    variant="ghost"
                    size="icon"
                    className="md:hidden"
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                  >
                    {isMenuOpen ? (
                      <X className="h-5 w-5" />
                    ) : (
                      <Menu className="h-5 w-5" />
                    )}
                  </Button>
                </div>
              </div>
            </div>

            {/* Mobile menu */}
            {isMenuOpen && (
              <div className="md:hidden">
                <nav className="flex flex-col space-y-1 py-4 bg-gradient-to-b from-white/15 to-white/5 dark:from-gray-900/15 dark:to-gray-900/5 backdrop-blur-sm rounded-b-3xl">
                  {navItems.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className="px-6 py-3 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-white/10 dark:hover:bg-gray-900/10 rounded-md mx-2 transition-colors"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {item.label}
                    </Link>
                  ))}
                  {isAuthenticated && (
                    <Button
                      asChild
                      className="mt-2 mx-6 gap-2 bg-amber-200/90 hover:bg-amber-200 text-gray-800"
                    >
                      <Link href="/dashboard">
                        <MessageCircle className="w-4 h-4" />
                        <span>Start Chat</span>
                      </Link>
                    </Button>
                  )}
                </nav>
              </div>
            )}
          </nav>
        </div>
      </div>
    </div>
  );
}
