"use client";

import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { UserButton, SignedIn, SignedOut } from "@clerk/nextjs";
import { Activity, Menu, X } from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";

const navLinks = [
    { href: "/dashboard", label: "Dashboard" },
    { href: "/consult", label: "Consult" },
    { href: "/history", label: "History" },
];

export function Navbar() {
    const [mobileOpen, setMobileOpen] = useState(false);
    const pathname = usePathname();

    return (
        <header className="fixed top-0 left-0 right-0 z-50 h-16 border-b border-border/50 bg-background/80 backdrop-blur-md">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center gap-4">
                {/* Logo */}
                <Link href="/" className="flex items-center gap-2 font-bold text-xl flex-shrink-0">
                    <Activity className="h-6 w-6 text-rose-600" />
                    <span className="text-foreground">Arogya<span className="text-rose-600">AI</span></span>
                </Link>

                {/* Desktop nav links (signed in only) */}
                <SignedIn>
                    <nav className="hidden md:flex items-center gap-1 ml-6">
                        {navLinks.map(link => (
                            <Link
                                key={link.href}
                                href={link.href}
                                className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${pathname === link.href
                                        ? "bg-rose-500/10 text-rose-600 dark:text-rose-400"
                                        : "text-muted-foreground hover:text-foreground hover:bg-accent"
                                    }`}
                            >
                                {link.label}
                            </Link>
                        ))}
                    </nav>
                </SignedIn>

                {/* Right side */}
                <div className="ml-auto flex items-center gap-3">
                    <ThemeToggle />
                    <SignedIn>
                        <UserButton afterSignOutUrl="/" />
                        {/* Mobile hamburger */}
                        <button
                            className="md:hidden p-2 rounded-lg hover:bg-accent text-foreground"
                            onClick={() => setMobileOpen(!mobileOpen)}
                            aria-label="Toggle navigation"
                        >
                            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                        </button>
                    </SignedIn>
                    <SignedOut>
                        <Link href="/sign-in">
                            <button className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors px-3 py-1.5">
                                Log in
                            </button>
                        </Link>
                        <Link href="/sign-up">
                            <button className="text-sm font-semibold bg-rose-600 hover:bg-rose-700 text-white rounded-full px-4 py-1.5 transition-all shadow-sm shadow-rose-500/30">
                                Sign up
                            </button>
                        </Link>
                    </SignedOut>
                </div>
            </div>

            {/* Mobile sliding nav */}
            <SignedIn>
                {mobileOpen && (
                    <div className="md:hidden absolute top-16 left-0 right-0 bg-background/95 backdrop-blur-md border-b border-border/50 px-4 py-3 flex flex-col gap-1 shadow-lg">
                        {navLinks.map(link => (
                            <Link
                                key={link.href}
                                href={link.href}
                                onClick={() => setMobileOpen(false)}
                                className={`px-4 py-2.5 rounded-xl text-sm font-medium transition-colors ${pathname === link.href
                                        ? "bg-rose-500/10 text-rose-600 dark:text-rose-400"
                                        : "text-muted-foreground hover:text-foreground hover:bg-accent"
                                    }`}
                            >
                                {link.label}
                            </Link>
                        ))}
                    </div>
                )}
            </SignedIn>
        </header>
    );
}
