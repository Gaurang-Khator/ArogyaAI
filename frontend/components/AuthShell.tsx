"use client";

import Link from "next/link";
import { Activity } from "lucide-react";

interface AuthShellProps {
    subtitle: string;
    children: React.ReactNode;
    disclaimer?: boolean;
}

export function AuthShell({ subtitle, children, disclaimer = true }: AuthShellProps) {
    return (
        <div className="page-wrapper flex items-center justify-center relative">
            {/* Background glow */}
            <div className="fixed top-0 left-1/2 -z-10 -translate-x-1/2 w-[600px] h-[400px] bg-rose-500/15 dark:bg-rose-700/10 rounded-full blur-[120px] pointer-events-none" />

            <div className="w-full max-w-md mx-auto px-4 py-16 flex flex-col items-center gap-6">
                {/* Brand header */}
                <div className="text-center mb-2">
                    <Link href="/" className="inline-flex items-center gap-2 font-bold text-xl mb-3">
                        <Activity className="h-6 w-6 text-rose-600" />
                        <span className="text-foreground">Arogya<span className="text-rose-600">AI</span></span>
                    </Link>
                    <p className="text-muted-foreground text-sm">{subtitle}</p>
                </div>

                {/* Clerk component */}
                {children}

                {/* Disclaimer */}
                {disclaimer && (
                    <p className="text-xs text-muted-foreground text-center max-w-sm">
                        ArogyaAI does not replace professional medical advice.{" "}
                        In emergencies,{" "}
                        <span className="underline">call local emergency services</span> immediately.
                    </p>
                )}
            </div>
        </div>
    );
}
