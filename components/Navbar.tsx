"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Dumbbell } from "lucide-react";
import { usePlan } from "@/context/PlanContext";

export default function Navbar() {
  const pathname = usePathname();
  const { plan, saved, isLoaded } = usePlan();

  const isWorkoutsActive = pathname === "/" || pathname.startsWith("/workout");
  const isMyPlanActive = pathname === "/my-plan";

  const planCount = isLoaded ? plan.length : 0;
  const savedCount = isLoaded ? saved.length : 0;

  return (
    <header className="sticky top-0 z-50 w-full border-b border-zinc-900 bg-[#0c0d12]/95 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Left: Brand Logo */}
        <Link
          href="/"
          className="flex items-center gap-2.5 text-lg font-black tracking-wider text-white transition-opacity hover:opacity-90"
        >
          <div className="flex h-7 w-7 items-center justify-center rounded bg-[#ccff00] text-black">
            <Dumbbell className="h-4 w-4 stroke-[3] -rotate-45" />
          </div>
          <span className="font-black uppercase tracking-widest text-white font-[family-name:var(--font-oswald)] text-xl">
            FIT<span className="text-white">LOG</span>
          </span>
        </Link>

        {/* Middle: Navigation Links */}
        <nav className="flex items-center gap-1 sm:gap-2">
          <Link
            href="/"
            className={`px-4 py-1.5 text-xs font-bold transition-all rounded-full ${
              isWorkoutsActive
                ? "bg-[#1d1f2a] text-[#ccff00]"
                : "text-zinc-400 hover:text-white"
            }`}
          >
            Workouts
          </Link>
          <Link
            href="/my-plan"
            className={`px-4 py-1.5 text-xs font-bold transition-all rounded-full ${
              isMyPlanActive
                ? "bg-[#1d1f2a] text-[#ccff00]"
                : "text-zinc-400 hover:text-white"
            }`}
          >
            My Plan
          </Link>
        </nav>

        {/* Right: Status Counters */}
        <div className="flex items-center gap-4 text-xs font-medium">
          {/* Plan Badge */}
          <Link
            href="/my-plan"
            className="flex items-center gap-1.5 text-zinc-300 hover:text-white transition-colors"
          >
            <span>Plan</span>
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#ccff00] text-[11px] font-extrabold text-black">
              {planCount}
            </span>
          </Link>

          {/* Saved Badge */}
          <Link
            href="/my-plan"
            className="flex items-center gap-1.5 text-zinc-300 hover:text-white transition-colors"
          >
            <span>Saved</span>
            <span className="flex h-5 w-5 items-center justify-center rounded-full border border-zinc-700 bg-transparent text-[11px] font-bold text-zinc-300">
              {savedCount}
            </span>
          </Link>
        </div>
      </div>
    </header>
  );
}
