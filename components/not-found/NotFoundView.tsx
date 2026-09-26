import Link from "next/link";
import { Dumbbell, ArrowLeft } from "lucide-react";

export default function NotFoundView() {
  return (
    <div className="flex min-h-[75vh] flex-col items-center justify-center bg-[#0c0d12] px-4 text-center">
      <div className="flex h-20 w-20 items-center justify-center rounded-none border border-zinc-800 bg-[#12131b] text-[#ccff00] shadow-2xl">
        <Dumbbell className="h-10 w-10 stroke-[2.5]" />
      </div>

      <span className="mt-6 rounded-none bg-[#ccff00] px-3.5 py-1 text-xs font-black uppercase text-black">
        404 ERROR
      </span>

      <h1 className="mt-4 text-4xl font-black uppercase tracking-tight text-white sm:text-6xl font-[family-name:var(--font-oswald)]">
        LIFT NOT FOUND
      </h1>

      <p className="mt-3 max-w-md text-base text-zinc-400">
        You've wandered off the gym floor. The route or workout you are looking for does not exist or has been moved.
      </p>

      <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
        <Link
          href="/"
          className="inline-flex items-center gap-2 rounded-none bg-[#ccff00] px-6 py-3.5 text-xs font-extrabold uppercase text-black hover:bg-[#b8e600] transition-all shadow-lg shadow-[#ccff00]/10"
        >
          <ArrowLeft className="h-4 w-4 stroke-[2.5]" />
          <span>Return to Library</span>
        </Link>
        <Link
          href="/my-plan"
          className="inline-flex items-center gap-2 rounded-none border border-zinc-800 bg-[#12131b] px-6 py-3.5 text-xs font-bold uppercase text-zinc-300 hover:border-zinc-700 hover:text-white transition-all"
        >
          <span>View My Plan</span>
        </Link>
      </div>
    </div>
  );
}
