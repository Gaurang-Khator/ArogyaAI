interface PageHeaderProps {
    title: string;
    subtitle?: string;
    className?: string;
}

export function PageHeader({ title, subtitle, className = "" }: PageHeaderProps) {
    return (
        <div className={className}>
            <h1 className="text-4xl font-extrabold tracking-tight text-foreground">{title}</h1>
            {subtitle && <p className="text-muted-foreground mt-2 text-lg">{subtitle}</p>}
        </div>
    );
}
