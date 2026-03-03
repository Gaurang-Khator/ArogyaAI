"use client";

import { useEffect } from "react";
import { useAuth } from "@clerk/nextjs";
import { useAppStore } from "@/store/useAppStore";
import api from "@/lib/axios";
import { Activity } from "lucide-react";
import { PageGlow } from "@/components/PageGlow";
import { PageHeader } from "@/components/PageHeader";
import { StatCard } from "@/components/StatCard";
import { ConsultationRow } from "@/components/ConsultationRow";
import { EmptyState } from "@/components/EmptyState";

export default function HistoryPage() {
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

    const thisMonthCount = history?.filter((h: any) => {
        const d = new Date(h.createdAt);
        const now = new Date();
        return d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear();
    }).length ?? 0;

    return (
        <div className="page-wrapper relative">
            <PageGlow variant="indigo" />

            <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 flex flex-col gap-8">
                <PageHeader title="Consultation History" subtitle="All your past AI medical consultations in one place." />

                {/* Stats bar */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                    <StatCard label="Total Consultations" value={history?.length ?? 0} />
                    <StatCard label="This Month" value={thisMonthCount} />
                    <StatCard label="Status" value="Active" className="col-span-2 sm:col-span-1 [&_p:last-child]:text-emerald-500 [&_p:last-child]:text-lg" />
                </div>

                {/* History List */}
                {!history || history.length === 0 ? (
                    <EmptyState
                        icon={Activity}
                        title="No consultations yet"
                        description="Your consultation history will appear here once you've had your first AI-powered symptom analysis."
                    />
                ) : (
                    <div className="flex flex-col gap-4">
                        {history.map((item: any, i: number) => (
                            <ConsultationRow key={i} item={item} compact={false} />
                        ))}
                    </div>
                )}
            </main>
        </div>
    );
}
