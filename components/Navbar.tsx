"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Dumbbell, Bookmark, CalendarCheck } from "lucide-react";
import { usePlan } from "@/context/PlanContext";

export default function Navbar() {
  const pathname = usePathname();
  const { plan, saved, isLoaded } = usePlan();

  const isWorkoutActive = pathname === "/" || pathname.startsWith("/workout");
  const isMyPlanActive = pathname === "/my-plan";

  const planCount = isLoaded ? plan.length : 0;
  const savedCount = isLoaded ? saved.length : 0;

  return (
    <header className="sticky top-0 z-50 w-full border-b border-zinc-800/80 bg-zinc-950/90 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Left: Brand Logo */}
        <Link
          href="/"
          className="flex items-center gap-2 text-xl font-extrabold tracking-wider text-white transition-opacity hover:opacity-90"
        >
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#ccff00] text-black">
            <Dumbbell className="h-5 w-5 stroke-[2.5]" />
          </div>
          <span className="font-black uppercase tracking-widest text-white">
            FIT<span className="text-[#ccff00]">LOG</span>
          </span>
        </Link>

        {/* Middle: Navigation Links */}
        <nav className="flex items-center gap-1 sm:gap-6">
          <Link
            href="/"
            className={`px-3 py-1.5 text-sm font-semibold uppercase tracking-wider transition-colors rounded-md ${
              isWorkoutActive
                ? "bg-zinc-800/80 text-[#ccff00] shadow-sm border border-zinc-700/50"
                : "text-zinc-400 hover:text-white hover:bg-zinc-900/60"
            }`}
          >
            Workout
          </Link>
          <Link
            href="/my-plan"
            className={`px-3 py-1.5 text-sm font-semibold uppercase tracking-wider transition-colors rounded-md ${
              isMyPlanActive
                ? "bg-zinc-800/80 text-[#ccff00] shadow-sm border border-zinc-700/50"
                : "text-zinc-400 hover:text-white hover:bg-zinc-900/60"
            }`}
          >
            My Plan
          </Link>
        </nav>

        {/* Right: Counter Badges */}
        <div className="flex items-center gap-2.5 sm:gap-3">
          {/* Plan Badge (Filled pill with accent background #ccff00) */}
          <Link
            href="/my-plan"
            className="group flex items-center gap-1.5 rounded-full bg-[#ccff00] px-3.5 py-1 text-xs font-bold uppercase text-black shadow-md transition-all hover:bg-[#b8e600] hover:scale-105 active:scale-95"
            title="Today's Plan"
          >
            <CalendarCheck className="h-3.5 w-3.5 stroke-[2.5]" />
            <span>Plan</span>
            <span className="ml-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-black px-1 text-[10px] font-black text-[#ccff00]">
              {planCount}
            </span>
          </Link>

          {/* Saved Badge (Pill with outline/border only) */}
          <Link
            href="/my-plan"
            className="group flex items-center gap-1.5 rounded-full border border-zinc-700 bg-zinc-900/80 px-3.5 py-1 text-xs font-semibold uppercase text-zinc-300 backdrop-blur-sm transition-all hover:border-zinc-500 hover:text-white hover:scale-105 active:scale-95"
            title="Saved Lifts"
          >
            <Bookmark className="h-3.5 w-3.5" />
            <span>Saved</span>
            <span className="ml-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-zinc-800 border border-zinc-700 px-1 text-[10px] font-bold text-zinc-300 group-hover:text-white">
              {savedCount}
            </span>
          </Link>
        </div>
      </div>
    </header>
  );
}
