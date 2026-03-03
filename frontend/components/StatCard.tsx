interface StatCardProps {
    label: string;
    value: string | number;
    className?: string;
}

export function StatCard({ label, value, className = "" }: StatCardProps) {
    return (
        <div className={`glass-card p-4 flex flex-col gap-1 ${className}`}>
            <p className="text-sm text-muted-foreground">{label}</p>
            <p className="text-3xl font-bold text-foreground">{value}</p>
        </div>
    );
}
