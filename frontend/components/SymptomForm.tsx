"use client";

import { useState, useRef } from "react";
import { useAppStore } from "@/store/useAppStore";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Mic, Square, Send, Loader2 } from "lucide-react";

interface SymptomFormProps {
    onSubmitText: (text: string) => Promise<void>;
    onSubmitAudio: (blob: Blob) => Promise<void>;
}

export function SymptomForm({ onSubmitText, onSubmitAudio }: SymptomFormProps) {
    const { symptoms, setSymptoms, isRecording, setIsRecording, isLoading } = useAppStore();
    const mediaRecorderRef = useRef<MediaRecorder | null>(null);
    const audioChunksRef = useRef<Blob[]>([]);

    const startRecording = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
            mediaRecorderRef.current = new MediaRecorder(stream);
            audioChunksRef.current = [];

            mediaRecorderRef.current.ondataavailable = (event) => {
                if (event.data.size > 0) {
                    audioChunksRef.current.push(event.data);
                }
            };

            mediaRecorderRef.current.onstop = async () => {
                const audioBlob = new Blob(audioChunksRef.current, { type: "audio/webm" });
                await onSubmitAudio(audioBlob);
                stream.getTracks().forEach((track) => track.stop());
            };

            mediaRecorderRef.current.start();
            setIsRecording(true);
        } catch (error) {
            console.error("Error accessing microphone:", error);
            alert("Microphone access denied or unavailable.");
        }
    };

    const stopRecording = () => {
        if (mediaRecorderRef.current && mediaRecorderRef.current.state === "recording") {
            mediaRecorderRef.current.stop();
            setIsRecording(false);
        }
    };

    const handleSubmit = async () => {
        if (!symptoms.trim()) return;
        await onSubmitText(symptoms);
    };

    return (
        <div className="flex flex-col space-y-4">
            <Textarea
                placeholder="E.g., I have a headache and a mild fever since yesterday..."
                className="min-h-[130px] resize-none bg-background border-border text-foreground placeholder:text-muted-foreground focus:ring-primary"
                value={symptoms}
                onChange={(e) => setSymptoms(e.target.value)}
                disabled={isLoading || isRecording}
            />
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
                <div className="flex items-center gap-2 w-full sm:w-auto">
                    {!isRecording ? (
                        <Button
                            variant="outline"
                            type="button"
                            onClick={startRecording}
                            disabled={isLoading}
                            className="border-border text-foreground hover:bg-accent"
                        >
                            <Mic className="h-4 w-4 mr-2 text-rose-500" />
                            Speak Symptoms
                        </Button>
                    ) : (
                        <Button
                            variant="destructive"
                            type="button"
                            onClick={stopRecording}
                            className="animate-pulse"
                        >
                            <Square className="h-4 w-4 mr-2" />
                            Stop & Analyze
                        </Button>
                    )}
                    {isRecording && (
                        <span className="text-sm text-rose-500 font-medium flex items-center gap-1.5">
                            <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse" />
                            Listening...
                        </span>
                    )}
                </div>
                <Button
                    className="w-full sm:w-auto bg-rose-600 hover:bg-rose-700 text-white shadow-sm shadow-rose-500/30"
                    onClick={handleSubmit}
                    disabled={isLoading || isRecording || !symptoms.trim()}
                >
                    {isLoading ? (
                        <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    ) : (
                        <Send className="h-4 w-4 mr-2" />
                    )}
                    {isLoading ? "Analyzing..." : "Analyze Symptoms"}
                </Button>
            </div>
        </div>
    );
}
