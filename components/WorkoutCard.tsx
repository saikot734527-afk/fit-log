"use client";

import Link from "next/link";
import { Clock, Flame, Star, ChevronRight, Dumbbell } from "lucide-react";
import { Workout } from "@/types/workout";

interface WorkoutCardProps {
  workout: Workout;
}

export default function WorkoutCard({ workout }: WorkoutCardProps) {
  return (
    <Link
      href={`/workout/${workout.id}`}
      className="group relative flex flex-col overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-900/90 transition-all duration-300 hover:-translate-y-1 hover:border-zinc-700 hover:shadow-xl hover:shadow-[#ccff00]/5"
    >
      {/* Top Image Container */}
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-zinc-950">
        <img
          src={workout.image}
          alt={workout.name}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105 opacity-90 group-hover:opacity-100"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 via-transparent to-black/20" />

        {/* Category Tag Pills (Top Left) */}
        <div className="absolute top-3 left-3 flex flex-wrap gap-1.5 max-w-[80%]">
          {workout.muscleGroups.map((tag) => (
            <span
              key={tag}
              className="rounded-md bg-black/75 backdrop-blur-md px-2.5 py-1 text-[10px] font-black uppercase tracking-wider text-[#ccff00] border border-[#ccff00]/30"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Difficulty Badge (Top Right) */}
        <div className="absolute top-3 right-3">
          <span className="rounded-md bg-zinc-950/80 backdrop-blur-md px-2 py-1 text-[10px] font-bold uppercase text-zinc-300 border border-zinc-700">
            {workout.difficulty}
          </span>
        </div>
      </div>

      {/* Card Content Body */}
      <div className="flex flex-1 flex-col justify-between p-5">
        <div>
          {/* Workout Name */}
          <h3 className="text-xl font-extrabold uppercase tracking-tight text-white font-[family-name:var(--font-oswald)] group-hover:text-[#ccff00] transition-colors">
            {workout.name}
          </h3>

          {/* Equipment line */}
          <div className="mt-1.5 flex items-center gap-1.5 text-xs text-zinc-400">
            <Dumbbell className="h-3.5 w-3.5 text-zinc-500 shrink-0" />
            <span className="truncate">{workout.equipment}</span>
          </div>
        </div>

        {/* Stats Row with Icons */}
        <div className="mt-5 flex items-center justify-between border-t border-zinc-800/80 pt-4 text-xs font-semibold text-zinc-300">
          {/* Duration */}
          <div className="flex items-center gap-1" title="Duration">
            <Clock className="h-3.5 w-3.5 text-[#ccff00]" />
            <span>{workout.duration} min</span>
          </div>

          {/* Calories */}
          <div className="flex items-center gap-1" title="Calories burned">
            <Flame className="h-3.5 w-3.5 text-orange-400" />
            <span>{workout.caloriesBurned} kcal</span>
          </div>

          {/* Rating */}
          <div className="flex items-center gap-1" title="Rating">
            <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
            <span>{workout.rating}</span>
          </div>
        </div>
      </div>
    </Link>
  );
}
