// Decorative background glow blobs — used on every page for visual consistency.
// Pass different color combos via the `variant` prop.

type GlowVariant = "rose" | "indigo" | "sky" | "default";

interface PageGlowProps {
    variant?: GlowVariant;
}

const variantClasses: Record<GlowVariant, string[]> = {
    rose: [
        "fixed top-0 left-1/2 -z-10 -translate-x-1/2 w-[800px] h-[500px] bg-rose-500/15 dark:bg-rose-700/10 rounded-full blur-[130px] pointer-events-none",
        "fixed bottom-0 right-0 -z-10 w-[500px] h-[400px] bg-purple-500/10 dark:bg-purple-700/10 rounded-full blur-[100px] pointer-events-none",
    ],
    indigo: [
        "fixed top-16 left-0 -z-10 w-[500px] h-[400px] bg-indigo-500/10 dark:bg-indigo-700/10 rounded-full blur-[100px] pointer-events-none",
        "fixed bottom-0 right-0 -z-10 w-[400px] h-[300px] bg-rose-500/10 dark:bg-rose-700/10 rounded-full blur-[100px] pointer-events-none",
    ],
    sky: [
        "fixed top-16 right-0 -z-10 w-[500px] h-[500px] bg-sky-500/10 dark:bg-sky-700/10 rounded-full blur-[100px] pointer-events-none",
        "fixed bottom-0 left-0 -z-10 w-[400px] h-[400px] bg-rose-500/10 dark:bg-rose-700/10 rounded-full blur-[100px] pointer-events-none",
    ],
    default: [
        "fixed top-16 right-0 -z-10 w-[500px] h-[400px] bg-indigo-500/10 dark:bg-indigo-700/10 rounded-full blur-[100px] pointer-events-none",
        "fixed bottom-0 left-0 -z-10 w-[400px] h-[300px] bg-rose-500/10 dark:bg-rose-700/10 rounded-full blur-[100px] pointer-events-none",
    ],
};

export function PageGlow({ variant = "default" }: PageGlowProps) {
    const classes = variantClasses[variant];
    return (
        <>
            {classes.map((cls, i) => (
                <div key={i} className={cls} />
            ))}
        </>
    );
}
