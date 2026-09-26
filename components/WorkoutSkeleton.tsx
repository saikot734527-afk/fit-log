export default function WorkoutSkeleton() {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: 6 }).map((_, i) => (
        <div
          key={i}
          className="animate-pulse overflow-hidden rounded-none border border-zinc-800/80 bg-zinc-900/60 p-0"
        >
          <div className="aspect-[16/9] w-full bg-zinc-800/70 rounded-none" />
          <div className="p-5 space-y-4">
            <div className="h-6 w-3/4 bg-zinc-800 rounded-none" />
            <div className="h-4 w-1/2 bg-zinc-800/60 rounded-none" />
            <div className="pt-4 border-t border-zinc-800/60 flex justify-between">
              <div className="h-4 w-16 bg-zinc-800 rounded-none" />
              <div className="h-4 w-16 bg-zinc-800 rounded-none" />
              <div className="h-4 w-12 bg-zinc-800 rounded-none" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
