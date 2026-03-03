import { ShieldAlert } from "lucide-react";

export function Disclaimer() {
    return (
        <div className="glass-card p-4 flex items-start gap-3 text-amber-800 dark:text-amber-300 border-amber-300/40 dark:border-amber-700/30 bg-amber-50/60 dark:bg-amber-950/20">
            <ShieldAlert className="h-5 w-5 mt-0.5 flex-shrink-0" />
            <div className="text-sm">
                <span className="font-semibold block mb-1">Medical Disclaimer</span>
                This AI assistant does not replace professional medical advice, diagnosis, or treatment. Always consult a qualified health provider.
                <strong className="block mt-1">In a medical emergency, call your local emergency services immediately.</strong>
            </div>
        </div>
    );
}
