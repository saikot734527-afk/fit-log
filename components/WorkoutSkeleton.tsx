export default function WorkoutSkeleton() {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: 6 }).map((_, i) => (
        <div
          key={i}
          className="animate-pulse overflow-hidden rounded-2xl border border-zinc-800/80 bg-zinc-900/60 p-0"
        >
          <div className="aspect-[4/3] w-full bg-zinc-800/70" />
          <div className="p-5 space-y-4">
            <div className="h-6 w-3/4 rounded bg-zinc-800" />
            <div className="h-4 w-1/2 rounded bg-zinc-800/60" />
            <div className="pt-4 border-t border-zinc-800/60 flex justify-between">
              <div className="h-4 w-16 rounded bg-zinc-800" />
              <div className="h-4 w-16 rounded bg-zinc-800" />
              <div className="h-4 w-12 rounded bg-zinc-800" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
