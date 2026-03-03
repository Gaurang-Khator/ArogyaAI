import { LucideIcon } from "lucide-react";

interface FeatureCardProps {
    icon: LucideIcon;
    iconBg: string;
    title: string;
    desc: string;
}

export function FeatureCard({ icon: Icon, iconBg, title, desc }: FeatureCardProps) {
    return (
        <div className="glass-card p-6 hover:shadow-md hover:border-border/80 transition-all group">
            <div className={`w-12 h-12 rounded-2xl ${iconBg} flex items-center justify-center mb-5 group-hover:scale-110 transition-transform`}>
                <Icon className="h-6 w-6" />
            </div>
            <h3 className="font-semibold text-base mb-2 text-card-foreground">{title}</h3>
            <p className="text-muted-foreground text-sm leading-relaxed">{desc}</p>
        </div>
    );
}
