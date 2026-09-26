import Link from "next/link";
import { Dumbbell } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-zinc-900 bg-[#0c0d12] py-6 text-zinc-500 text-xs">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-4 sm:flex-row sm:px-6 lg:px-8">
        {/* Left: Brand Logo */}
        <Link
          href="/"
          className="flex items-center gap-2 font-black tracking-wider text-white transition-opacity hover:opacity-90"
        >
          <div className="flex h-5 w-5 items-center justify-center rounded bg-[#ccff00] text-black">
            <Dumbbell className="h-3 w-3 stroke-[3] -rotate-45" />
          </div>
          <span className="font-black uppercase tracking-widest text-white font-[family-name:var(--font-oswald)] text-sm">
            FIT<span className="text-white">LOG</span>
          </span>
        </Link>

        {/* Right: Copyright */}
        <p className="text-center sm:text-right text-zinc-500">
          © 2026 FitLog — Workout Library. Train hard, log honest.
        </p>
      </div>
    </footer>
  );
}
