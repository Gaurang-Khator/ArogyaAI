import { Stethoscope, Clock, AlertTriangle } from "lucide-react";
import { SeverityBadge } from "./SeverityBadge";

export interface ConsultationItem {
    _id?: string;
    id?: string;
    originalInput?: string;
    createdAt?: string;
    date?: string;
    originalLanguage?: string;
    aiResponse?: {
        condition?: string;
        diagnosis?: string;
        severity?: string | null;
        precautions?: string | string[];
    };
}

interface ConsultationRowProps {
    item: ConsultationItem;
    compact?: boolean; // dashboard shows compact view, history shows full detail
}

export function ConsultationRow({ item, compact = false }: ConsultationRowProps) {
    const dateStr = item.createdAt || item.date;
    const date = dateStr ? new Date(dateStr) : null;
    const isValidDate = date && !isNaN(date.getTime());

    const title = item.originalInput || "Symptom consultation";
    const subtitle = item.aiResponse?.condition || item.aiResponse?.diagnosis || "Analysis complete";
    const severity = item.aiResponse?.severity;

    return (
        <div className="glass-card p-5 flex items-start gap-4 hover:shadow-md transition-all group">
            {/* Icon */}
            <div className="w-10 h-10 rounded-xl bg-rose-500/10 flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform">
                <Stethoscope className="h-5 w-5 text-rose-500" />
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-3 flex-wrap">
                    <div className="min-w-0">
                        <p className="font-semibold text-card-foreground truncate">{title}</p>
                        <p className="text-muted-foreground text-sm mt-0.5 truncate">{subtitle}</p>
                    </div>
                    {severity && <SeverityBadge severity={severity} />}
                </div>

                {/* Full detail (history page only) */}
                {!compact && item.aiResponse?.precautions && (
                    <div className="mt-3 pt-3 border-t border-border/40">
                        <p className="text-xs text-muted-foreground font-medium flex items-center gap-1.5">
                            <AlertTriangle className="h-3.5 w-3.5" /> Precautions
                        </p>
                        <p className="text-sm text-muted-foreground/80 mt-1 line-clamp-2">
                            {Array.isArray(item.aiResponse.precautions)
                                ? item.aiResponse.precautions.join(" • ")
                                : item.aiResponse.precautions}
                        </p>
                    </div>
                )}

                {/* Timestamp */}
                <div className="mt-2 flex items-center gap-1.5 text-xs text-muted-foreground/50">
                    <Clock className="h-3.5 w-3.5" />
                    {isValidDate
                        ? compact
                            ? date!.toLocaleDateString()
                            : date!.toLocaleString()
                        : "Unknown date"}
                </div>
            </div>
        </div>
    );
}
