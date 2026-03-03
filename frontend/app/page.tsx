import Link from "next/link";
import { SignedIn, SignedOut } from "@clerk/nextjs";
import { ArrowRight, HeartPulse, Brain, AudioLines, ActivitySquare, ShieldAlert } from "lucide-react";
import { PageGlow } from "@/components/PageGlow";
import { FeatureCard } from "@/components/FeatureCard";

export default function Home() {
  return (
    <div className="page-wrapper flex flex-col">
      <PageGlow variant="rose" />

      <main className="flex-1 flex flex-col items-center w-full">
        {/* ── HERO ── */}
        <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-28 md:pt-32 md:pb-40 flex flex-col items-center text-center">
          <div className="inline-flex items-center rounded-full border border-rose-200/60 bg-rose-50 dark:border-rose-800/40 dark:bg-rose-950/30 px-4 py-1.5 text-sm font-medium text-rose-600 dark:text-rose-400 mb-8 shadow-sm">
            <span className="flex h-2 w-2 rounded-full bg-rose-500 animate-pulse mr-2.5" />
            Empowering global healthcare through AI
          </div>

          <h1 className="text-5xl font-extrabold tracking-tight sm:text-6xl md:text-7xl xl:text-8xl mb-6 text-foreground max-w-5xl leading-[1.1]">
            Healthcare without <br />
            <span className="gradient-text">language barriers.</span>
          </h1>

          <p className="max-w-2xl text-muted-foreground text-lg md:text-xl mb-10">
            ArogyaAI listens to your symptoms in your native language — voice or text — and delivers precise AI-powered diagnoses, severity levels, and remedies instantly.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 items-center">
            <SignedIn>
              <Link href="/consult">
                <button className="h-14 px-8 rounded-full bg-rose-600 hover:bg-rose-700 text-white font-semibold text-base shadow-lg shadow-rose-500/30 transition-all hover:scale-[1.02] flex items-center gap-2">
                  Start Consultation <ArrowRight className="h-4 w-4" />
                </button>
              </Link>
              <Link href="/dashboard">
                <button className="h-14 px-8 rounded-full border border-border bg-background/80 backdrop-blur-sm hover:bg-accent text-foreground font-semibold text-base transition-all">
                  Go to Dashboard
                </button>
              </Link>
            </SignedIn>
            <SignedOut>
              <Link href="/sign-up">
                <button className="h-14 px-8 rounded-full bg-rose-600 hover:bg-rose-700 text-white font-semibold text-base shadow-lg shadow-rose-500/30 transition-all hover:scale-[1.02] flex items-center gap-2">
                  Get Started Free <HeartPulse className="h-4 w-4" />
                </button>
              </Link>
              <Link href="/sign-in">
                <button className="h-14 px-8 rounded-full border border-border bg-background/80 backdrop-blur-sm hover:bg-accent text-foreground font-semibold text-base transition-all">
                  Log In
                </button>
              </Link>
            </SignedOut>
          </div>

          <p className="mt-10 text-xs text-muted-foreground/70 font-medium">Powered by Gemini · SarvamAI · Clerk Auth · MongoDB</p>
        </section>

        {/* ── FEATURES ── */}
        <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 border-t border-border/40">
          <div className="text-center mb-14">
            <h2 className="text-3xl font-bold tracking-tight md:text-4xl text-foreground">Advanced intelligence. Natural feel.</h2>
            <p className="mt-4 text-muted-foreground max-w-xl mx-auto">Everything you need for intelligent, multilingual symptom analysis — built with clinical precision.</p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <FeatureCard
              icon={Brain}
              iconBg="bg-violet-500/10 dark:bg-violet-900/20 text-violet-500"
              title="AI-Powered Diagnosis"
              desc="Uses advanced LLMs to analyze complex symptom patterns and surface the most likely conditions with clinical accuracy."
            />
            <FeatureCard
              icon={AudioLines}
              iconBg="bg-emerald-500/10 dark:bg-emerald-900/20 text-emerald-500"
              title="Multilingual Voice & Text"
              desc="Supports 12+ Indian regional languages via SarvamAI. Speak or type — ArogyaAI understands you perfectly."
            />
            <FeatureCard
              icon={ActivitySquare}
              iconBg="bg-rose-500/10 dark:bg-rose-900/20 text-rose-500"
              title="Severity Indexing"
              desc="Conditions ranked by urgency — from home remedies for minor issues to immediate emergency service direction."
            />
          </div>
        </section>

        {/* ── DISCLAIMER ── */}
        <section className="w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="glass-card p-5 flex items-start gap-4 text-amber-800 dark:text-amber-300 border-amber-300/40 dark:border-amber-700/30 bg-amber-50/60 dark:bg-amber-950/20">
            <ShieldAlert className="h-5 w-5 flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold text-sm">Medical Disclaimer</p>
              <p className="text-sm mt-1 leading-relaxed opacity-90">
                ArogyaAI is for informational purposes only and does not replace professional medical advice, diagnosis, or treatment. In emergencies, call your local emergency services immediately.
              </p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
