"use client";

import Link from "next/link";
import { Clock, Flame, Star } from "lucide-react";
import { Workout } from "@/types/workout";

interface WorkoutCardProps {
  workout: Workout;
}

export default function WorkoutCard({ workout }: WorkoutCardProps) {
  return (
    <Link
      href={`/workout/${workout.id}`}
      className="group flex flex-col overflow-hidden rounded-none border border-zinc-800/80 bg-[#12131b] transition-all duration-300 hover:border-zinc-700 hover:shadow-xl hover:-translate-y-1"
    >
      {/* Thumbnail Container */}
      <div className="relative aspect-[16/9] w-full overflow-hidden bg-zinc-950 rounded-none">
        <img
          src={workout.image}
          alt={workout.name}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105 rounded-none"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#12131b] via-transparent to-transparent opacity-60" />
      </div>

      {/* Card Details */}
      <div className="flex flex-1 flex-col justify-between p-5">
        <div>
          {/* Category Tag Pills */}
          <div className="flex flex-wrap gap-1.5 mb-3">
            {workout.muscleGroups.map((tag) => (
              <span
                key={tag}
                className="rounded-none bg-[#ccff00] px-2.5 py-0.5 text-[10px] font-extrabold uppercase text-black"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Workout Name */}
          <h3 className="text-lg font-black uppercase tracking-tight text-white font-[family-name:var(--font-oswald)]">
            {workout.name}
          </h3>

          {/* Equipment */}
          <p className="mt-1 text-xs text-zinc-500 font-medium truncate">
            {workout.equipment}
          </p>
        </div>

        {/* Stats Row */}
        <div className="mt-6 flex items-center gap-4 text-xs font-semibold text-zinc-400">
          <div className="flex items-center gap-1">
            <Clock className="h-3.5 w-3.5 text-zinc-400" />
            <span>{workout.duration} min</span>
          </div>

          <div className="flex items-center gap-1">
            <Flame className="h-3.5 w-3.5 text-zinc-400" />
            <span>{workout.caloriesBurned} kcal</span>
          </div>

          <div className="flex items-center gap-1">
            <Star className="h-3.5 w-3.5 text-zinc-400" />
            <span>{workout.rating}</span>
          </div>
        </div>
      </div>
    </Link>
  );
}
