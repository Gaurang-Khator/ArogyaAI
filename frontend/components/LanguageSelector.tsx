"use client";

import { useAppStore } from "@/store/useAppStore";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";

const LANGUAGES = [
    "English",
    "Hindi",
    "Gujarati",
    "Tamil",
    "Telugu",
    "Marathi",
];

export function LanguageSelector() {
    const { language, setLanguage } = useAppStore();

    return (
        <div className="flex flex-col space-y-2 mb-4">
            <Label htmlFor="language">Select your preferred language</Label>
            <Select value={language} onValueChange={setLanguage}>
                <SelectTrigger id="language" className="w-[200px]">
                    <SelectValue placeholder="Select Language" />
                </SelectTrigger>
                <SelectContent>
                    {LANGUAGES.map((lang) => (
                        <SelectItem key={lang} value={lang}>
                            {lang}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>
        </div>
    );
}
