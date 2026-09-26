import Link from "next/link";
import { ArrowDown, Flame, ShieldAlert, Zap } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative overflow-hidden border-b border-zinc-800/60 bg-gradient-to-b from-zinc-950 via-zinc-900/60 to-zinc-950 py-12 sm:py-20 lg:py-24">
      {/* Glow Effects */}
      <div className="pointer-events-none absolute left-1/2 top-0 -translate-x-1/2 blur-3xl opacity-20">
        <div className="h-96 w-[40rem] rounded-full bg-gradient-to-tr from-[#ccff00] to-emerald-500"></div>
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-8">
          {/* Left Column: Content */}
          <div className="flex flex-col items-start lg:col-span-7">
            {/* Eyebrow */}
            <div className="inline-flex items-center gap-2 rounded-full border border-[#ccff00]/30 bg-[#ccff00]/10 px-3.5 py-1.5 text-xs font-bold uppercase tracking-wider text-[#ccff00] backdrop-blur-md">
              <Zap className="h-3.5 w-3.5 fill-[#ccff00]" />
              <span>WORKOUT LIBRARY</span>
            </div>

            {/* Main Heading */}
            <h1 className="mt-6 text-4xl font-black uppercase tracking-tight text-white sm:text-6xl lg:text-7xl font-[family-name:var(--font-oswald)] leading-[1.05]">
              TRAIN WITH INTENT. <br className="hidden sm:inline" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-zinc-200 to-[#ccff00]">
                LOG EVERY SET.
              </span>
            </h1>

            {/* Subtitle */}
            <p className="mt-6 max-w-2xl text-base sm:text-lg leading-relaxed text-zinc-400">
              FitLog is a dark, no-nonsense gym companion: pick a lift, lock it into today's plan, and watch the week's work add up.
            </p>

            {/* Action Button */}
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <a
                href="#library"
                className="group inline-flex items-center gap-3 rounded-xl bg-[#ccff00] px-7 py-4 text-base font-extrabold uppercase tracking-wide text-black shadow-lg shadow-[#ccff00]/20 transition-all hover:bg-[#b8e600] hover:shadow-[#ccff00]/30 hover:scale-[1.02] active:scale-[0.98]"
              >
                <span>BROWSE WORKOUTS</span>
                <ArrowDown className="h-5 w-5 stroke-[3] transition-transform group-hover:translate-y-1" />
              </a>
            </div>

            {/* Highlights */}
            <div className="mt-10 grid grid-cols-3 gap-6 border-t border-zinc-800/80 pt-6 w-full max-w-lg">
              <div>
                <span className="text-2xl font-black text-white font-[family-name:var(--font-oswald)]">12</span>
                <p className="text-xs text-zinc-500 uppercase font-semibold">Core Lifts</p>
              </div>
              <div>
                <span className="text-2xl font-black text-[#ccff00] font-[family-name:var(--font-oswald)]">5</span>
                <p className="text-xs text-zinc-500 uppercase font-semibold">Daily Lift Cap</p>
              </div>
              <div>
                <span className="text-2xl font-black text-white font-[family-name:var(--font-oswald)]">100%</span>
                <p className="text-xs text-zinc-500 uppercase font-semibold">No Excuses</p>
              </div>
            </div>
          </div>

          {/* Right Column: Hero Image / Visual Banner */}
          <div className="relative lg:col-span-5">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              {/* Outer Decorative Border */}
              <div className="absolute -inset-1 rounded-3xl bg-gradient-to-r from-[#ccff00]/40 via-zinc-800 to-emerald-500/30 opacity-70 blur-lg transition duration-500 group-hover:opacity-100"></div>

              {/* Main Image Container */}
              <div className="relative overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-900 shadow-2xl">
                <img
                  src="https://images.unsplash.com/photo-1517838277536-f5f99be501cd?q=80&w=1000&auto=format&fit=crop"
                  alt="FitLog Gym Hero"
                  className="h-80 sm:h-96 w-full object-cover opacity-85 transition-transform duration-700 hover:scale-105"
                />

                {/* Dark Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/40 to-transparent"></div>

                {/* Floating Glass Badges */}
                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between rounded-xl border border-zinc-800/80 bg-zinc-950/80 p-4 backdrop-blur-md">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#ccff00]/20 text-[#ccff00]">
                      <Flame className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-xs font-bold uppercase text-zinc-400">Target Intense Lifts</p>
                      <p className="text-sm font-black text-white uppercase font-[family-name:var(--font-oswald)]">
                        Full-Body Performance
                      </p>
                    </div>
                  </div>
                  <span className="rounded bg-[#ccff00] px-2 py-1 text-[10px] font-black uppercase text-black">
                    PRO
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
