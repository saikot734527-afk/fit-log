import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-zinc-900 bg-[#0c0d12] py-6 text-zinc-500 text-xs">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-4 sm:flex-row sm:px-6 lg:px-8">
        {/* Left: Brand Logo from assets */}
        <Link
          href="/"
          className="flex items-center gap-2 font-black tracking-wider text-white transition-opacity hover:opacity-90"
        >
          <img
            src="/assets/logo.png"
            alt="FITLOG Logo"
            className="h-5 w-auto object-contain"
          />
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
