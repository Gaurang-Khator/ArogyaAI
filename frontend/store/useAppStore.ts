import { create } from 'zustand';

export type SeverityType = 'Low' | 'Moderate' | 'Emergency' | null;

export interface AiResponse {
    condition: string;
    severity: SeverityType;
    precautions: string[];
    medicines: string[];
    emergency_advice?: string;
}

export interface Consultation {
    id?: string;
    _id?: string;
    date?: string;
    createdAt?: string;
    originalLanguage: string;
    originalInput: string;
    aiResponse: AiResponse;
}

interface AppState {
    language: string;
    setLanguage: (lang: string) => void;
    symptoms: string;
    setSymptoms: (str: string) => void;
    isRecording: boolean;
    setIsRecording: (recording: boolean) => void;
    isLoading: boolean;
    setIsLoading: (loading: boolean) => void;
    aiResponse: AiResponse | null;
    setAiResponse: (res: AiResponse | null) => void;
    audioResponse: string | null;
    setAudioResponse: (res: string | null) => void;
    history: Consultation[];
    setHistory: (history: Consultation[]) => void;
}

export const useAppStore = create<AppState>((set) => ({
    language: 'English',
    setLanguage: (lang) => set({ language: lang }),
    symptoms: '',
    setSymptoms: (str) => set({ symptoms: str }),
    isRecording: false,
    setIsRecording: (recording) => set({ isRecording: recording }),
    isLoading: false,
    setIsLoading: (loading) => set({ isLoading: loading }),
    aiResponse: null,
    setAiResponse: (res) => set({ aiResponse: res }),
    audioResponse: null,
    setAudioResponse: (res) => set({ audioResponse: res }),
    history: [],
    setHistory: (history) => set({ history }),
}));
