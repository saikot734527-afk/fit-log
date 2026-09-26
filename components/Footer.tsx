import Link from "next/link";
import { Dumbbell } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-zinc-800/80 bg-zinc-950 py-8 text-zinc-400">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-4 sm:flex-row sm:px-6 lg:px-8">
        {/* Left: Logo */}
        <Link
          href="/"
          className="flex items-center gap-2 text-lg font-extrabold tracking-wider text-white transition-opacity hover:opacity-90"
        >
          <div className="flex h-7 w-7 items-center justify-center rounded bg-[#ccff00] text-black">
            <Dumbbell className="h-4 w-4 stroke-[2.5]" />
          </div>
          <span className="font-black uppercase tracking-widest text-white">
            FIT<span className="text-[#ccff00]">LOG</span>
          </span>
        </Link>

        {/* Right: Copyright line */}
        <p className="text-center text-xs text-zinc-500 sm:text-right">
          © 2026 FitLog — Workout Library. Train hard, log honest.
        </p>
      </div>
    </footer>
  );
}
