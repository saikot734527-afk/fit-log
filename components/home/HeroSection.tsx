export default function HeroSection() {
  return (
    <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-6">
      <div className="relative overflow-hidden rounded-none border border-zinc-800/60 bg-[#12131b] p-8 sm:p-12 lg:p-14 shadow-2xl">
        <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-12">
          {/* Left Side Content */}
          <div className="flex flex-col items-start lg:col-span-7">
            <span className="text-xs font-bold uppercase tracking-wider text-[#ccff00]">
              WORKOUT LIBRARY
            </span>

            <h1 className="mt-4 text-3xl sm:text-5xl lg:text-6xl font-black uppercase tracking-tight text-white font-[family-name:var(--font-oswald)] leading-none">
              TRAIN WITH INTENT. <br />
              LOG EVERY SET.
            </h1>

            <p className="mt-5 max-w-xl text-sm sm:text-base leading-relaxed text-zinc-400">
              FitLog is a dark, no-nonsense gym companion: pick a lift, lock it into today's plan, and watch the week's work add up.
            </p>

            <a
              href="#library"
              className="mt-8 inline-block rounded-none bg-[#ccff00] px-6 py-3 text-xs font-extrabold uppercase tracking-wide text-black transition-transform hover:scale-105 active:scale-95 shadow-md shadow-[#ccff00]/10"
            >
              BROWSE WORKOUTS
            </a>
          </div>

          {/* Right Side Hero Banner Image */}
          <div className="flex justify-center lg:col-span-5 lg:justify-end">
            <div className="relative h-64 w-64 sm:h-80 sm:w-80 lg:h-96 lg:w-96">
              <img
                src="/assets/banner.png"
                alt="FitLog Hero Banner"
                className="h-full w-full object-contain rounded-none filter drop-shadow-[0_20px_30px_rgba(0,0,0,0.8)]"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
