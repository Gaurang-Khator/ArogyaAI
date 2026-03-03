"use client";

import { useAppStore } from "@/store/useAppStore";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import { Activity } from "lucide-react";
import { ConsultationRow } from "./ConsultationRow";
import { EmptyState } from "./EmptyState";

export function HistoryList() {
    const { history } = useAppStore();

    if (!history || history.length === 0) {
        return (
            <EmptyState
                icon={Activity}
                title="No consultations yet"
                description="Your previous analyses will appear here."
            />
        );
    }

    return (
        <div className="flex flex-col gap-3 mt-4">
            {history.map((item) => (
                <ConsultationRow
                    key={item._id || item.id || Math.random().toString()}
                    item={item}
                    compact
                />
            ))}
        </div>
    );
}
