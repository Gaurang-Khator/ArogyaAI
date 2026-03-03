"use client";

import { useAppStore } from "@/store/useAppStore";
import { AlertCircle, FileText, Pill, Activity, Volume2 } from "lucide-react";
import { SeverityBadge } from "./SeverityBadge";

export function ResponseCard() {
    const { aiResponse, audioResponse } = useAppStore();

    if (!aiResponse) return null;

    const { condition, severity, precautions, medicines, emergency_advice } = aiResponse;

    return (
        <div className="glass-card overflow-hidden mt-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            {/* Header */}
            <div className="p-5 border-b border-border bg-muted/40 flex items-start justify-between gap-4">
                <div>
                    <h2 className="text-xl font-bold flex items-center gap-2 text-card-foreground">
                        <Activity className="h-5 w-5 text-primary" />
                        Preliminary Assessment
                    </h2>
                    <p className="text-muted-foreground mt-1 font-medium">
                        Condition: <span className="text-card-foreground">{condition}</span>
                    </p>
                </div>
                {severity && <SeverityBadge severity={severity} />}
            </div>

            {/* Body */}
            <div className="p-5 space-y-5">
                {audioResponse && (
                    <div className="p-4 bg-violet-500/10 border border-violet-500/30 rounded-xl">
                        <p className="text-violet-600 dark:text-violet-400 font-semibold mb-2 flex items-center gap-2 text-sm">
                            <Volume2 className="h-4 w-4" /> Audio Response
                        </p>
                        <audio controls autoPlay className="w-full" src={`data:audio/wav;base64,${audioResponse}`} />
                    </div>
                )}

                {severity === "Emergency" && emergency_advice && (
                    <div className="p-4 bg-rose-500/10 border border-rose-500/30 rounded-xl flex gap-3 text-rose-600 dark:text-rose-400">
                        <AlertCircle className="h-5 w-5 flex-shrink-0 mt-0.5" />
                        <div>
                            <p className="font-bold text-sm">Emergency Advice</p>
                            <p className="text-sm mt-1">{emergency_advice}</p>
                        </div>
                    </div>
                )}

                {precautions && precautions.length > 0 && (
                    <div className="p-4 bg-muted/50 border border-border rounded-xl">
                        <h3 className="font-semibold text-sm flex items-center gap-2 mb-3 text-card-foreground">
                            <FileText className="h-4 w-4 text-sky-500" /> Suggested Precautions
                        </h3>
                        <ul className="space-y-1.5">
                            {precautions.map((p, idx) => (
                                <li key={idx} className="text-sm text-muted-foreground flex items-start gap-2">
                                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-sky-500 flex-shrink-0" />{p}
                                </li>
                            ))}
                        </ul>
                    </div>
                )}

                {medicines && medicines.length > 0 && (
                    <div className="p-4 bg-muted/50 border border-border rounded-xl">
                        <h3 className="font-semibold text-sm flex items-center gap-2 mb-3 text-card-foreground">
                            <Pill className="h-4 w-4 text-emerald-500" /> Non-Prescription Suggestions (OTC)
                        </h3>
                        <ul className="space-y-1.5">
                            {medicines.map((m, idx) => (
                                <li key={idx} className="text-sm text-muted-foreground flex items-start gap-2">
                                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-emerald-500 flex-shrink-0" />{m}
                                </li>
                            ))}
                        </ul>
                        <p className="mt-3 text-xs text-muted-foreground/60 italic">*Consult a pharmacist or doctor before taking any medication.</p>
                    </div>
                )}
            </div>
        </div>
    );
}
