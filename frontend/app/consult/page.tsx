"use client";

import { useEffect } from "react";
import { useAuth } from "@clerk/nextjs";
import { Disclaimer } from "@/components/Disclaimer";
import { LanguageSelector } from "@/components/LanguageSelector";
import { SymptomForm } from "@/components/SymptomForm";
import { ResponseCard } from "@/components/ResponseCard";
import { PageGlow } from "@/components/PageGlow";
import { PageHeader } from "@/components/PageHeader";
import { useAppStore } from "@/store/useAppStore";
import api from "@/lib/axios";

export default function ConsultPage() {
    const { getToken } = useAuth();
    const { language, setAiResponse, setAudioResponse, setIsLoading, setHistory } = useAppStore();

    useEffect(() => {
        fetchHistory();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const fetchHistory = async () => {
        try {
            const token = await getToken();
            if (!token) return;
            const res = await api.get("/api/consultations", { headers: { Authorization: `Bearer ${token}` } });
            setHistory(res.data.data || []);
        } catch (error) {
            console.error("Failed to fetch history:", error);
        }
    };

    const onSubmitText = async (text: string) => {
        setIsLoading(true);
        try {
            const token = await getToken();
            const res = await api.post("/api/consultations/text", { symptoms: text, language }, { headers: { Authorization: `Bearer ${token}` } });
            setAiResponse(res.data.data.aiResponse);
            setAudioResponse(null);
            fetchHistory();
        } catch (error) {
            console.error(error);
            alert("Failed to analyze symptoms. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    const onSubmitAudio = async (blob: Blob) => {
        setIsLoading(true);
        try {
            const token = await getToken();
            const formData = new FormData();
            formData.append("audio", blob, "audio.webm");
            formData.append("language", language);
            const res = await api.post("/api/consultations/audio", formData, { headers: { Authorization: `Bearer ${token}`, "Content-Type": "multipart/form-data" } });
            setAiResponse(res.data.data.aiResponse);
            setAudioResponse(res.data.audioResponse || null);
            fetchHistory();
        } catch (error) {
            console.error(error);
            alert("Failed to process audio. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="page-wrapper relative">
            <PageGlow variant="sky" />

            <main className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12 flex flex-col gap-6">
                <PageHeader title="New Consultation" subtitle="Describe your symptoms and receive an instant AI-powered medical assessment." />

                <div className="glass-card p-6">
                    <h2 className="text-base font-semibold text-foreground mb-1">Step 1 — Select Language</h2>
                    <p className="text-muted-foreground text-sm mb-4">Choose the language you&apos;ll use to describe your symptoms.</p>
                    <LanguageSelector />
                </div>

                <div className="glass-card p-6">
                    <h2 className="text-base font-semibold text-foreground mb-1">Step 2 — Describe Your Symptoms</h2>
                    <p className="text-muted-foreground text-sm mb-4">Type or speak your symptoms clearly for the most accurate analysis.</p>
                    <SymptomForm onSubmitText={onSubmitText} onSubmitAudio={onSubmitAudio} />
                </div>

                <ResponseCard />
                <Disclaimer />
            </main>
        </div>
    );
}
