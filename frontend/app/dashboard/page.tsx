"use client";

import { useEffect } from "react";
import { useAuth } from "@clerk/nextjs";
import Link from "next/link";
import { useAppStore } from "@/store/useAppStore";
import api from "@/lib/axios";
import { History, Stethoscope, ClipboardList, ArrowRight } from "lucide-react";
import { PageGlow } from "@/components/PageGlow";
import { PageHeader } from "@/components/PageHeader";
import { ConsultationRow } from "@/components/ConsultationRow";
import { EmptyState } from "@/components/EmptyState";
import { Activity } from "lucide-react";

export default function Dashboard() {
    const { getToken } = useAuth();
    const { history, setHistory } = useAppStore();

    useEffect(() => {
        fetchHistory();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const fetchHistory = async () => {
        try {
            const token = await getToken();
            if (!token) return;
            const res = await api.get("/api/consultations", {
                headers: { Authorization: `Bearer ${token}` }
            });
            setHistory(res.data.data || []);
        } catch (error) {
            console.error("Failed to fetch history:", error);
        }
    };

    const recentConsultations = history?.slice(0, 3) ?? [];

    return (
        <div className="page-wrapper relative">
            <PageGlow variant="default" />

            <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 flex flex-col gap-10">
                <PageHeader title="Dashboard" subtitle="Your health journey at a glance." />

                {/* Quick Action Cards */}
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    <Link href="/consult" className="glass-card p-6 hover:shadow-lg hover:border-rose-300/50 dark:hover:border-rose-700/50 transition-all group flex flex-col gap-4">
                        <div className="w-12 h-12 rounded-2xl bg-rose-500/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                            <Stethoscope className="h-6 w-6 text-rose-500" />
                        </div>
                        <div>
                            <h3 className="font-semibold text-lg text-card-foreground">New Consultation</h3>
                            <p className="text-muted-foreground text-sm mt-1">Describe your symptoms via voice or text and get an instant AI analysis.</p>
                        </div>
                        <div className="mt-auto flex items-center text-rose-500 text-sm font-medium">
                            Start now <ArrowRight className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform" />
                        </div>
                    </Link>

                    <Link href="/history" className="glass-card p-6 hover:shadow-lg hover:border-indigo-300/50 dark:hover:border-indigo-700/50 transition-all group flex flex-col gap-4">
                        <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                            <History className="h-6 w-6 text-indigo-500" />
                        </div>
                        <div>
                            <h3 className="font-semibold text-lg text-card-foreground">Consultation History</h3>
                            <p className="text-muted-foreground text-sm mt-1">Review all your previous AI diagnoses, prescriptions, and recommendations.</p>
                        </div>
                        <div className="mt-auto flex items-center text-indigo-500 text-sm font-medium">
                            View all <ArrowRight className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform" />
                        </div>
                    </Link>

                    <div className="glass-card p-6 flex flex-col gap-4 opacity-60">
                        <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 flex items-center justify-center">
                            <ClipboardList className="h-6 w-6 text-emerald-500" />
                        </div>
                        <div>
                            <h3 className="font-semibold text-lg text-card-foreground">Health Reports</h3>
                            <p className="text-muted-foreground text-sm mt-1">Detailed health summaries and trend reports.</p>
                        </div>
                        <div className="mt-auto">
                            <span className="text-xs bg-muted text-muted-foreground rounded-full px-3 py-1 font-medium">Coming soon</span>
                        </div>
                    </div>
                </div>

                {/* Recent Consultations */}
                <div>
                    <div className="flex items-center justify-between mb-5">
                        <h2 className="text-xl font-bold text-foreground">Recent Consultations</h2>
                        <Link href="/history" className="text-sm text-rose-500 hover:text-rose-600 font-medium flex items-center gap-1">
                            View all <ArrowRight className="h-3.5 w-3.5" />
                        </Link>
                    </div>

                    {recentConsultations.length === 0 ? (
                        <EmptyState
                            icon={Activity}
                            title="No consultations yet"
                            description="Start your first AI consultation to see results here."
                            actionLabel="Start consulting"
                            actionHref="/consult"
                        />
                    ) : (
                        <div className="flex flex-col gap-4">
                            {recentConsultations.map((item: any, i: number) => (
                                <ConsultationRow key={i} item={item} compact />
                            ))}
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
}
