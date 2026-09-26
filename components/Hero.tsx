export default function Hero() {
  return (
    <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-6">
      <div className="relative overflow-hidden rounded-3xl border border-zinc-800/60 bg-[#12131b] p-8 sm:p-12 lg:p-14 shadow-2xl">
        <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-12">
          {/* Left Side Content */}
          <div className="flex flex-col items-start lg:col-span-7">
            {/* Eyebrow */}
            <span className="text-xs font-bold uppercase tracking-wider text-[#ccff00]">
              WORKOUT LIBRARY
            </span>

            {/* Main Heading */}
            <h1 className="mt-4 text-3xl sm:text-5xl lg:text-6xl font-black uppercase tracking-tight text-white font-[family-name:var(--font-oswald)] leading-none">
              TRAIN WITH INTENT. <br />
              LOG EVERY SET.
            </h1>

            {/* Subtitle */}
            <p className="mt-5 max-w-xl text-sm sm:text-base leading-relaxed text-zinc-400">
              FitLog is a dark, no-nonsense gym companion: pick a lift, lock it into today's plan, and watch the week's work add up.
            </p>

            {/* CTA Button */}
            <a
              href="#library"
              className="mt-8 inline-block rounded-xl bg-[#ccff00] px-6 py-3 text-xs font-extrabold uppercase tracking-wide text-black transition-transform hover:scale-105 active:scale-95 shadow-md shadow-[#ccff00]/10"
            >
              BROWSE WORKOUTS
            </a>
          </div>

          {/* Right Side Illustration */}
          <div className="flex justify-center lg:col-span-5 lg:justify-end">
            <div className="relative h-56 w-56 sm:h-72 sm:w-72 lg:h-80 lg:w-80">
              <img
                src="https://img.magnific.com/free-photo/3d-cartoon-fitness-man_23-2151691400.jpg?w=740"
                alt="FitLog Hero Illustration"
                className="h-full w-full object-contain rounded-2xl filter drop-shadow-[0_20px_30px_rgba(0,0,0,0.8)]"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
