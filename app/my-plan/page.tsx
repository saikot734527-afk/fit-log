"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Check,
  X,
  Clock,
  Flame,
  Star,
  ChevronDown,
} from "lucide-react";
import { usePlan } from "@/context/PlanContext";

type ActiveTab = "today" | "saved";
type SortOption = "duration" | "calories" | "rating";

export default function MyPlanPage() {
  const {
    plan,
    saved,
    isLoaded,
    removeFromPlan,
    toggleDone,
    removeFromSaved,
  } = usePlan();

  const [activeTab, setActiveTab] = useState<ActiveTab>("today");
  const [sortBy, setSortBy] = useState<SortOption>("duration");

  // Metrics summary calculations (Today's Plan)
  const totalExercises = plan.length;
  const totalMinutes = plan.reduce(
    (sum, item) => sum + item.workout.duration,
    0
  );
  const totalCalories = plan.reduce(
    (sum, item) => sum + item.workout.caloriesBurned,
    0
  );

  // Sorting
  const sortedPlanItems = [...plan].sort((a, b) => {
    if (sortBy === "duration") return a.workout.duration - b.workout.duration;
    if (sortBy === "calories") return b.workout.caloriesBurned - a.workout.caloriesBurned;
    if (sortBy === "rating") return b.workout.rating - a.workout.rating;
    return 0;
  });

  const sortedSavedItems = [...saved].sort((a, b) => {
    if (sortBy === "duration") return a.duration - b.duration;
    if (sortBy === "calories") return b.caloriesBurned - a.caloriesBurned;
    if (sortBy === "rating") return b.rating - a.rating;
    return 0;
  });

  return (
    <div className="min-h-screen bg-[#0c0d12] pb-24 pt-8">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header Title & Subtitle */}
        <div>
          <h1 className="text-3xl sm:text-4xl font-black uppercase tracking-tight text-white font-[family-name:var(--font-oswald)]">
            MY PLAN
          </h1>
          <p className="mt-2 text-sm text-zinc-400">
            Cap of five lifts for today. Finish them, then load more.
          </p>
        </div>

        {/* Metrics Summary Row (3 Stats) */}
        <div className="mt-6 overflow-hidden rounded-2xl border border-zinc-800/80 bg-[#12131b]">
          <div className="grid grid-cols-1 divide-y sm:grid-cols-3 sm:divide-y-0 sm:divide-x divide-zinc-800/60 p-6 sm:p-8">
            {/* Exercises */}
            <div className="flex flex-col justify-center py-2 sm:py-0 sm:px-4">
              <span className="text-xs font-semibold text-zinc-400">Exercises</span>
              <span className="mt-2 text-4xl sm:text-5xl font-black text-[#ccff00] font-[family-name:var(--font-oswald)]">
                {totalExercises}
              </span>
            </div>

            {/* Minutes */}
            <div className="flex flex-col justify-center py-2 sm:py-0 sm:px-8">
              <span className="text-xs font-semibold text-zinc-400">Minutes</span>
              <span className="mt-2 text-4xl sm:text-5xl font-black text-white font-[family-name:var(--font-oswald)]">
                {totalMinutes}
              </span>
            </div>

            {/* Calories */}
            <div className="flex flex-col justify-center py-2 sm:py-0 sm:px-8">
              <span className="text-xs font-semibold text-zinc-400">Calories</span>
              <span className="mt-2 text-4xl sm:text-5xl font-black text-white font-[family-name:var(--font-oswald)]">
                {totalCalories}
              </span>
            </div>
          </div>
        </div>

        {/* Tabs & Sort Controls Bar */}
        <div className="mt-8 flex flex-wrap items-center justify-between gap-4">
          {/* Tabs pill bar */}
          <div className="inline-flex rounded-xl bg-[#12131b] border border-zinc-800/80 p-1">
            <button
              onClick={() => setActiveTab("today")}
              className={`rounded-lg px-5 py-2 text-xs font-bold transition-all cursor-pointer ${
                activeTab === "today"
                  ? "bg-[#1d1f2a] text-white shadow-sm"
                  : "text-zinc-400 hover:text-white"
              }`}
            >
              Today's Plan
            </button>
            <button
              onClick={() => setActiveTab("saved")}
              className={`rounded-lg px-5 py-2 text-xs font-bold transition-all cursor-pointer ${
                activeTab === "saved"
                  ? "bg-[#1d1f2a] text-white shadow-sm"
                  : "text-zinc-400 hover:text-white"
              }`}
            >
              Saved
            </button>
          </div>

          {/* Sort By Dropdown */}
          <div className="flex items-center gap-2 text-xs text-zinc-400">
            <span>Sort By</span>
            <div className="relative flex items-center">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as SortOption)}
                className="appearance-none rounded-xl border border-zinc-800 bg-[#12131b] py-2 pl-3 pr-8 text-xs font-bold text-white cursor-pointer focus:outline-none"
              >
                <option value="duration">Duration</option>
                <option value="calories">Calories</option>
                <option value="rating">Rating</option>
              </select>
              <ChevronDown className="absolute right-2.5 h-3.5 w-3.5 text-zinc-400 pointer-events-none" />
            </div>
          </div>
        </div>

        {/* Workout Lists */}
        {isLoaded && (
          <div className="mt-6">
            {/* TODAY'S PLAN TAB */}
            {activeTab === "today" && (
              <>
                {sortedPlanItems.length > 0 ? (
                  <div className="space-y-4">
                    {sortedPlanItems.map(({ workout, completed }) => (
                      <div
                        key={workout.id}
                        className="flex flex-col sm:flex-row items-center justify-between rounded-2xl border border-zinc-800/80 bg-[#12131b] p-4 sm:p-5 transition-all"
                      >
                        {/* Left: Image & Info */}
                        <div className="flex w-full sm:w-auto items-center gap-4">
                          <img
                            src={workout.image}
                            alt={workout.name}
                            className="h-16 w-24 sm:h-20 sm:w-32 shrink-0 rounded-xl object-cover"
                          />

                          <div>
                            <h3 className="text-base sm:text-lg font-black uppercase tracking-tight text-white font-[family-name:var(--font-oswald)]">
                              {workout.name}
                            </h3>

                            <p className="text-xs text-zinc-500 mt-0.5">
                              {workout.equipment}
                            </p>

                            <div className="mt-2 flex items-center gap-3 text-xs font-semibold text-zinc-400">
                              <span className="flex items-center gap-1">
                                <Clock className="h-3.5 w-3.5 text-zinc-400" />
                                {workout.duration} min
                              </span>
                              <span className="flex items-center gap-1">
                                <Flame className="h-3.5 w-3.5 text-zinc-400" />
                                {workout.caloriesBurned} kcal
                              </span>
                              <span className="flex items-center gap-1">
                                <Star className="h-3.5 w-3.5 text-zinc-400" />
                                {workout.rating}
                              </span>
                            </div>
                          </div>
                        </div>

                        {/* Right: Actions */}
                        <div className="mt-4 sm:mt-0 flex w-full sm:w-auto items-center justify-end gap-2.5">
                          {/* View Details */}
                          <Link
                            href={`/workout/${workout.id}`}
                            className="rounded-full border border-zinc-700 bg-transparent px-4 py-2 text-xs font-bold text-white hover:border-zinc-500 transition-colors"
                          >
                            View Details
                          </Link>

                          {/* Mark as Done */}
                          <button
                            onClick={() => toggleDone(workout.id)}
                            className={`flex items-center gap-1.5 rounded-full px-4 py-2 text-xs font-extrabold transition-all cursor-pointer ${
                              completed
                                ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/40"
                                : "bg-[#ccff00] text-black hover:bg-[#b8e600]"
                            }`}
                          >
                            <Check className="h-3.5 w-3.5 stroke-[3]" />
                            <span>{completed ? "Done" : "Mark as Done"}</span>
                          </button>

                          {/* Remove (X) */}
                          <button
                            onClick={() => removeFromPlan(workout.id)}
                            className="p-2 text-zinc-500 hover:text-zinc-300 transition-colors cursor-pointer"
                            title="Remove"
                          >
                            <X className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  /* Empty State */
                  <div className="flex flex-col items-center justify-center py-20 text-center border border-dashed border-zinc-800/80 rounded-2xl bg-[#0e0f15] px-4">
                    <h3 className="text-2xl font-black uppercase text-white font-[family-name:var(--font-oswald)]">
                      NOTHING HERE YET
                    </h3>
                    <p className="mt-2 text-xs sm:text-sm text-zinc-400">
                      Browse the library and add a lift to get today moving.
                    </p>
                    <Link
                      href="/"
                      className="mt-6 inline-block rounded-full bg-[#ccff00] px-6 py-2.5 text-xs font-extrabold uppercase text-black hover:bg-[#b8e600] transition-transform hover:scale-105"
                    >
                      Go to workouts
                    </Link>
                  </div>
                )}
              </>
            )}

            {/* SAVED TAB */}
            {activeTab === "saved" && (
              <>
                {sortedSavedItems.length > 0 ? (
                  <div className="space-y-4">
                    {sortedSavedItems.map((workout) => (
                      <div
                        key={workout.id}
                        className="flex flex-col sm:flex-row items-center justify-between rounded-2xl border border-zinc-800/80 bg-[#12131b] p-4 sm:p-5 transition-all"
                      >
                        {/* Left: Image & Info */}
                        <div className="flex w-full sm:w-auto items-center gap-4">
                          <img
                            src={workout.image}
                            alt={workout.name}
                            className="h-16 w-24 sm:h-20 sm:w-32 shrink-0 rounded-xl object-cover"
                          />

                          <div>
                            <h3 className="text-base sm:text-lg font-black uppercase tracking-tight text-white font-[family-name:var(--font-oswald)]">
                              {workout.name}
                            </h3>

                            <p className="text-xs text-zinc-500 mt-0.5">
                              {workout.equipment}
                            </p>

                            <div className="mt-2 flex items-center gap-3 text-xs font-semibold text-zinc-400">
                              <span className="flex items-center gap-1">
                                <Clock className="h-3.5 w-3.5 text-zinc-400" />
                                {workout.duration} min
                              </span>
                              <span className="flex items-center gap-1">
                                <Flame className="h-3.5 w-3.5 text-zinc-400" />
                                {workout.caloriesBurned} kcal
                              </span>
                              <span className="flex items-center gap-1">
                                <Star className="h-3.5 w-3.5 text-zinc-400" />
                                {workout.rating}
                              </span>
                            </div>
                          </div>
                        </div>

                        {/* Right: Actions */}
                        <div className="mt-4 sm:mt-0 flex w-full sm:w-auto items-center justify-end gap-2.5">
                          <Link
                            href={`/workout/${workout.id}`}
                            className="rounded-full border border-zinc-700 bg-transparent px-4 py-2 text-xs font-bold text-white hover:border-zinc-500 transition-colors"
                          >
                            View Details
                          </Link>

                          <button
                            onClick={() => removeFromSaved(workout.id)}
                            className="p-2 text-zinc-500 hover:text-zinc-300 transition-colors cursor-pointer"
                            title="Remove"
                          >
                            <X className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  /* Empty State */
                  <div className="flex flex-col items-center justify-center py-20 text-center border border-dashed border-zinc-800/80 rounded-2xl bg-[#0e0f15] px-4">
                    <h3 className="text-2xl font-black uppercase text-white font-[family-name:var(--font-oswald)]">
                      NOTHING HERE YET
                    </h3>
                    <p className="mt-2 text-xs sm:text-sm text-zinc-400">
                      Browse the library and add a lift to get today moving.
                    </p>
                    <Link
                      href="/"
                      className="mt-6 inline-block rounded-full bg-[#ccff00] px-6 py-2.5 text-xs font-extrabold uppercase text-black hover:bg-[#b8e600] transition-transform hover:scale-105"
                    >
                      Go to workouts
                    </Link>
                  </div>
                )}
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
