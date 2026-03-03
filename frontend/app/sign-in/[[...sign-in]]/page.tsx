"use client";

import { SignIn } from "@clerk/nextjs";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { AuthShell } from "@/components/AuthShell";

export default function Page() {
    const { resolvedTheme } = useTheme();
    const [mounted, setMounted] = useState(false);
    useEffect(() => setMounted(true), []);
    const isDark = mounted && resolvedTheme === "dark";

    const clerkAppearance = {
        variables: isDark ? {
            colorBackground: "#1e2028",
            colorInputBackground: "#252830",
            colorText: "#f0f0f0",
            colorTextSecondary: "#9099a8",
            colorPrimary: "#e11d48",
            colorInputText: "#f0f0f0",
            colorNeutral: "#9099a8",
            colorShimmer: "#2a2d38",
        } : {
            colorBackground: "#f8f8fa",
            colorInputBackground: "#ffffff",
            colorText: "#111111",
            colorTextSecondary: "#555555",
            colorPrimary: "#e11d48",
            colorInputText: "#111111",
        },
        elements: {
            card: `shadow-xl rounded-2xl border ${isDark ? "border-white/10" : "border-black/10"}`,
            footer: isDark ? "bg-[#1e2028] rounded-b-2xl" : "bg-[#f8f8fa] rounded-b-2xl",
            footerActionLink: "text-rose-500 hover:text-rose-600",
            formButtonPrimary: "bg-rose-600 hover:bg-rose-700 text-white",
            socialButtonsBlockButton: isDark
                ? "border border-white/10 bg-white/5 text-white hover:bg-white/10"
                : "border border-black/10 bg-white text-black hover:bg-gray-50",
        }
    };

    return (
        <AuthShell subtitle="Welcome back! Sign in to continue your health journey.">
            {mounted && <SignIn appearance={clerkAppearance} />}
        </AuthShell>
    );
}
