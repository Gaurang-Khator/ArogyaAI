import Link from "next/link";
import { LucideIcon } from "lucide-react";
import { ArrowRight } from "lucide-react";

interface EmptyStateProps {
    icon: LucideIcon;
    title: string;
    description?: string;
    actionLabel?: string;
    actionHref?: string;
    className?: string;
}

export function EmptyState({
    icon: Icon,
    title,
    description,
    actionLabel,
    actionHref,
    className = "",
}: EmptyStateProps) {
    return (
        <div className={`glass-card p-12 flex flex-col items-center justify-center text-center gap-3 ${className}`}>
            <Icon className="h-12 w-12 text-muted-foreground/30" />
            <p className="font-semibold text-card-foreground text-lg">{title}</p>
            {description && (
                <p className="text-muted-foreground/70 text-sm max-w-sm">{description}</p>
            )}
            {actionLabel && actionHref && (
                <Link
                    href={actionHref}
                    className="mt-2 text-rose-500 hover:text-rose-600 text-sm font-medium flex items-center gap-1"
                >
                    {actionLabel} <ArrowRight className="h-3.5 w-3.5" />
                </Link>
            )}
        </div>
    );
}
