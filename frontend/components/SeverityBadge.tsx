// Shared color utility — single source of truth for severity styling
export type Severity = "Low" | "Moderate" | "High" | "Emergency" | "Critical" | string;

export function getSeverityStyle(severity: Severity): string {
    const s = severity?.toLowerCase();
    if (s === "emergency" || s === "critical") return "bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/30";
    if (s === "high") return "bg-orange-500/10 text-orange-600 dark:text-orange-400 border-orange-500/30";
    if (s === "moderate") return "bg-yellow-500/10 text-yellow-600 dark:text-yellow-400 border-yellow-500/30";
    return "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/30";
}

interface SeverityBadgeProps {
    severity: Severity;
    className?: string;
}

export function SeverityBadge({ severity, className = "" }: SeverityBadgeProps) {
    return (
        <span className={`text-xs font-semibold rounded-full px-3 py-1 border flex-shrink-0 ${getSeverityStyle(severity)} ${className}`}>
            {severity} Severity
        </span>
    );
}
