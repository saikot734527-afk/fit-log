"use client";

import { useState } from "react";
import Link from "next/link";
import {
  CalendarCheck,
  Bookmark,
  CheckCircle2,
  Circle,
  Trash2,
  ExternalLink,
  Flame,
  Clock,
  Star,
  Search,
  Dumbbell,
  ArrowRight,
  Loader2,
  Sparkles,
} from "lucide-react";
import { usePlan } from "@/context/PlanContext";
import { Workout } from "@/types/workout";

type ActiveTab = "today" | "saved";

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
  const [searchQuery, setSearchQuery] = useState("");

  // Live Metrics Summary calculation (from Today's Plan)
  const totalExercises = plan.length;
  const totalMinutes = plan.reduce(
    (sum, item) => sum + item.workout.duration,
    0
  );
  const totalCalories = plan.reduce(
    (sum, item) => sum + item.workout.caloriesBurned,
    0
  );
  const completedCount = plan.filter((item) => item.completed).length;

  // Search filtering
  const filteredPlanItems = plan.filter((item) => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    return (
      item.workout.name.toLowerCase().includes(q) ||
      item.workout.equipment.toLowerCase().includes(q) ||
      item.workout.muscleGroups.some((m) => m.toLowerCase().includes(q))
    );
  });

  const filteredSavedItems = saved.filter((workout) => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    return (
      workout.name.toLowerCase().includes(q) ||
      workout.equipment.toLowerCase().includes(q) ||
      workout.muscleGroups.some((m) => m.toLowerCase().includes(q))
    );
  });

  return (
    <div className="min-h-screen bg-zinc-950 pb-24 pt-8 sm:pt-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header Title & Subtitle */}
        <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#ccff00]">
              <Sparkles className="h-3.5 w-3.5" />
              <span>LOG & PROGRESS</span>
            </div>
            <h1 className="mt-1 text-3xl font-black uppercase tracking-tight text-white sm:text-5xl font-[family-name:var(--font-oswald)]">
              MY PLAN
            </h1>
            <p className="mt-2 text-base text-zinc-400">
              Cap of five lifts for today. Finish them, then load more.
            </p>
          </div>

          {/* Search Input for Plan / Saved */}
          <div className="w-full sm:w-72">
            <div className="relative">
              <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-400" />
              <input
                type="text"
                placeholder="Search plan or saved..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full rounded-xl border border-zinc-800 bg-zinc-900/90 py-2.5 pl-10 pr-4 text-xs font-medium text-white placeholder-zinc-500 transition-colors focus:border-[#ccff00] focus:outline-none"
              />
            </div>
          </div>
        </div>

        {/* Metrics Summary Row (3 Stat Cards) */}
        <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
          {/* Exercises Card */}
          <div className="relative overflow-hidden rounded-2xl border border-zinc-800/80 bg-zinc-900/70 p-5 backdrop-blur-md transition-all hover:border-zinc-700">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-zinc-400">
                Exercises
              </span>
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#ccff00]/10 text-[#ccff00]">
                <CalendarCheck className="h-4 w-4" />
              </div>
            </div>
            <div className="mt-4 flex items-baseline gap-2">
              <span className="text-3xl font-black text-white font-[family-name:var(--font-oswald)]">
                {totalExercises}
              </span>
              <span className="text-xs font-bold text-zinc-500">/ 5 Cap</span>
            </div>
            {totalExercises > 0 && (
              <p className="mt-2 text-xs font-medium text-emerald-400">
                {completedCount} of {totalExercises} completed
              </p>
            )}
          </div>

          {/* Minutes Card */}
          <div className="relative overflow-hidden rounded-2xl border border-zinc-800/80 bg-zinc-900/70 p-5 backdrop-blur-md transition-all hover:border-zinc-700">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-zinc-400">
                Minutes
              </span>
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#ccff00]/10 text-[#ccff00]">
                <Clock className="h-4 w-4" />
              </div>
            </div>
            <div className="mt-4 flex items-baseline gap-1">
              <span className="text-3xl font-black text-white font-[family-name:var(--font-oswald)]">
                {totalMinutes}
              </span>
              <span className="text-xs font-bold text-zinc-400">min</span>
            </div>
            <p className="mt-2 text-xs text-zinc-500">Estimated duration</p>
          </div>

          {/* Calories Card */}
          <div className="relative overflow-hidden rounded-2xl border border-zinc-800/80 bg-zinc-900/70 p-5 backdrop-blur-md transition-all hover:border-zinc-700">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-zinc-400">
                Calories
              </span>
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-orange-500/10 text-orange-400">
                <Flame className="h-4 w-4" />
              </div>
            </div>
            <div className="mt-4 flex items-baseline gap-1">
              <span className="text-3xl font-black text-white font-[family-name:var(--font-oswald)]">
                {totalCalories}
              </span>
              <span className="text-xs font-bold text-zinc-400">kcal</span>
            </div>
            <p className="mt-2 text-xs text-zinc-500">Target energy burn</p>
          </div>
        </div>

        {/* Tabs: Today's Plan / Saved */}
        <div className="mt-10 border-b border-zinc-800">
          <div className="flex gap-4">
            <button
              onClick={() => setActiveTab("today")}
              className={`flex items-center gap-2 border-b-2 pb-4 text-sm font-extrabold uppercase tracking-wider transition-all cursor-pointer ${
                activeTab === "today"
                  ? "border-[#ccff00] text-[#ccff00]"
                  : "border-transparent text-zinc-400 hover:text-white"
              }`}
            >
              <CalendarCheck className="h-4 w-4" />
              <span>Today's Plan ({plan.length})</span>
            </button>

            <button
              onClick={() => setActiveTab("saved")}
              className={`flex items-center gap-2 border-b-2 pb-4 text-sm font-extrabold uppercase tracking-wider transition-all cursor-pointer ${
                activeTab === "saved"
                  ? "border-[#ccff00] text-[#ccff00]"
                  : "border-transparent text-zinc-400 hover:text-white"
              }`}
            >
              <Bookmark className="h-4 w-4" />
              <span>Saved ({saved.length})</span>
            </button>
          </div>
        </div>

        {/* Loading State requirement */}
        {!isLoaded && (
          <div className="mt-16 flex flex-col items-center justify-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-[#ccff00]" />
            <p className="mt-3 text-sm font-bold uppercase tracking-wider text-zinc-400">
              Loading workouts…
            </p>
          </div>
        )}

        {/* Content Lists */}
        {isLoaded && (
          <div className="mt-8">
            {/* TODAY'S PLAN TAB */}
            {activeTab === "today" && (
              <>
                {filteredPlanItems.length > 0 ? (
                  <div className="space-y-4">
                    {filteredPlanItems.map(({ workout, completed }) => (
                      <div
                        key={workout.id}
                        className={`group relative flex flex-col sm:flex-row items-center justify-between rounded-2xl border p-4 sm:p-5 transition-all ${
                          completed
                            ? "border-emerald-900/50 bg-emerald-950/10 opacity-80"
                            : "border-zinc-800 bg-zinc-900/80 hover:border-zinc-700"
                        }`}
                      >
                        {/* Left: Thumbnail & Details */}
                        <div className="flex w-full sm:w-auto items-center gap-4">
                          <div className="relative h-16 w-16 sm:h-20 sm:w-20 shrink-0 overflow-hidden rounded-xl border border-zinc-800 bg-zinc-950">
                            <img
                              src={workout.image}
                              alt={workout.name}
                              className="h-full w-full object-cover"
                            />
                            {completed && (
                              <div className="absolute inset-0 flex items-center justify-center bg-black/60 backdrop-blur-xs">
                                <CheckCircle2 className="h-8 w-8 text-emerald-400" />
                              </div>
                            )}
                          </div>

                          <div>
                            <div className="flex items-center gap-2">
                              <h3
                                className={`text-lg font-extrabold uppercase tracking-tight font-[family-name:var(--font-oswald)] ${
                                  completed ? "text-zinc-400 line-through" : "text-white"
                                }`}
                              >
                                {workout.name}
                              </h3>
                              {completed && (
                                <span className="rounded bg-emerald-500/20 px-2 py-0.5 text-[10px] font-black uppercase text-emerald-400 border border-emerald-500/30">
                                  Done
                                </span>
                              )}
                            </div>

                            {/* Equipment line */}
                            <p className="mt-1 text-xs text-zinc-400 flex items-center gap-1.5">
                              <Dumbbell className="h-3.5 w-3.5 text-zinc-500 shrink-0" />
                              <span>{workout.equipment}</span>
                            </p>

                            {/* Stats Row */}
                            <div className="mt-2 flex items-center gap-4 text-xs font-semibold text-zinc-400">
                              <span className="flex items-center gap-1">
                                <Clock className="h-3.5 w-3.5 text-[#ccff00]" />
                                {workout.duration} min
                              </span>
                              <span className="flex items-center gap-1">
                                <Flame className="h-3.5 w-3.5 text-orange-400" />
                                {workout.caloriesBurned} kcal
                              </span>
                              <span className="flex items-center gap-1">
                                <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                                {workout.rating}
                              </span>
                            </div>
                          </div>
                        </div>

                        {/* Right: Action Buttons */}
                        <div className="mt-4 sm:mt-0 flex w-full sm:w-auto items-center justify-end gap-2 border-t sm:border-t-0 pt-3 sm:pt-0 border-zinc-800">
                          {/* View Details */}
                          <Link
                            href={`/workout/${workout.id}`}
                            className="inline-flex items-center gap-1.5 rounded-xl border border-zinc-700 bg-zinc-800/80 px-3.5 py-2 text-xs font-bold text-zinc-200 hover:border-zinc-500 hover:text-white transition-all"
                          >
                            <ExternalLink className="h-3.5 w-3.5" />
                            <span>View Details</span>
                          </Link>

                          {/* Mark as Done (Challenge C3) */}
                          <button
                            onClick={() => toggleDone(workout.id)}
                            className={`inline-flex items-center gap-1.5 rounded-xl px-3.5 py-2 text-xs font-bold transition-all cursor-pointer ${
                              completed
                                ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 hover:bg-emerald-500/30"
                                : "bg-zinc-800 text-zinc-200 border border-zinc-700 hover:bg-[#ccff00] hover:text-black hover:border-[#ccff00]"
                            }`}
                            title={completed ? "Mark as incomplete" : "Mark as completed"}
                          >
                            <CheckCircle2 className="h-4 w-4" />
                            <span>{completed ? "Done" : "Mark as Done"}</span>
                          </button>

                          {/* Remove (X) Button (Challenge C3) */}
                          <button
                            onClick={() => removeFromPlan(workout.id)}
                            className="inline-flex h-9 w-9 items-center justify-center rounded-xl border border-zinc-800 bg-zinc-900 text-zinc-400 hover:border-red-900/80 hover:bg-red-950/40 hover:text-red-400 transition-all cursor-pointer"
                            title="Remove from plan"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  /* Empty State */
                  <div className="flex flex-col items-center justify-center py-20 text-center border border-dashed border-zinc-800 rounded-3xl bg-zinc-900/30 px-4">
                    <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-zinc-900 text-zinc-500 border border-zinc-800">
                      <CalendarCheck className="h-8 w-8 stroke-[1.5]" />
                    </div>
                    <h3 className="mt-5 text-2xl font-black uppercase text-white font-[family-name:var(--font-oswald)] tracking-tight">
                      NOTHING HERE YET
                    </h3>
                    <p className="mt-2 max-w-sm text-sm text-zinc-400">
                      Browse the library and add a lift to get today moving.
                    </p>
                    <Link
                      href="/"
                      className="mt-6 inline-flex items-center gap-2 rounded-xl bg-[#ccff00] px-6 py-3.5 text-xs font-extrabold uppercase text-black hover:bg-[#b8e600] transition-all shadow-lg shadow-[#ccff00]/10"
                    >
                      <span>Go to workouts</span>
                      <ArrowRight className="h-4 w-4 stroke-[2.5]" />
                    </Link>
                  </div>
                )}
              </>
            )}

            {/* SAVED TAB */}
            {activeTab === "saved" && (
              <>
                {filteredSavedItems.length > 0 ? (
                  <div className="space-y-4">
                    {filteredSavedItems.map((workout) => (
                      <div
                        key={workout.id}
                        className="group relative flex flex-col sm:flex-row items-center justify-between rounded-2xl border border-zinc-800 bg-zinc-900/80 p-4 sm:p-5 transition-all hover:border-zinc-700"
                      >
                        {/* Left: Thumbnail & Details */}
                        <div className="flex w-full sm:w-auto items-center gap-4">
                          <div className="relative h-16 w-16 sm:h-20 sm:w-20 shrink-0 overflow-hidden rounded-xl border border-zinc-800 bg-zinc-950">
                            <img
                              src={workout.image}
                              alt={workout.name}
                              className="h-full w-full object-cover"
                            />
                          </div>

                          <div>
                            <h3 className="text-lg font-extrabold uppercase tracking-tight text-white font-[family-name:var(--font-oswald)]">
                              {workout.name}
                            </h3>

                            {/* Equipment line */}
                            <p className="mt-1 text-xs text-zinc-400 flex items-center gap-1.5">
                              <Dumbbell className="h-3.5 w-3.5 text-zinc-500 shrink-0" />
                              <span>{workout.equipment}</span>
                            </p>

                            {/* Stats Row */}
                            <div className="mt-2 flex items-center gap-4 text-xs font-semibold text-zinc-400">
                              <span className="flex items-center gap-1">
                                <Clock className="h-3.5 w-3.5 text-[#ccff00]" />
                                {workout.duration} min
                              </span>
                              <span className="flex items-center gap-1">
                                <Flame className="h-3.5 w-3.5 text-orange-400" />
                                {workout.caloriesBurned} kcal
                              </span>
                              <span className="flex items-center gap-1">
                                <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                                {workout.rating}
                              </span>
                            </div>
                          </div>
                        </div>

                        {/* Right: Action Buttons */}
                        <div className="mt-4 sm:mt-0 flex w-full sm:w-auto items-center justify-end gap-2 border-t sm:border-t-0 pt-3 sm:pt-0 border-zinc-800">
                          {/* View Details */}
                          <Link
                            href={`/workout/${workout.id}`}
                            className="inline-flex items-center gap-1.5 rounded-xl border border-zinc-700 bg-zinc-800/80 px-3.5 py-2 text-xs font-bold text-zinc-200 hover:border-zinc-500 hover:text-white transition-all"
                          >
                            <ExternalLink className="h-3.5 w-3.5" />
                            <span>View Details</span>
                          </Link>

                          {/* Remove (X) Button */}
                          <button
                            onClick={() => removeFromSaved(workout.id)}
                            className="inline-flex h-9 w-9 items-center justify-center rounded-xl border border-zinc-800 bg-zinc-900 text-zinc-400 hover:border-red-900/80 hover:bg-red-950/40 hover:text-red-400 transition-all cursor-pointer"
                            title="Remove from saved"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  /* Empty State */
                  <div className="flex flex-col items-center justify-center py-20 text-center border border-dashed border-zinc-800 rounded-3xl bg-zinc-900/30 px-4">
                    <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-zinc-900 text-zinc-500 border border-zinc-800">
                      <Bookmark className="h-8 w-8 stroke-[1.5]" />
                    </div>
                    <h3 className="mt-5 text-2xl font-black uppercase text-white font-[family-name:var(--font-oswald)] tracking-tight">
                      NO SAVED LIFTS
                    </h3>
                    <p className="mt-2 max-w-sm text-sm text-zinc-400">
                      Bookmark exercises from the library to save them for future workouts.
                    </p>
                    <Link
                      href="/"
                      className="mt-6 inline-flex items-center gap-2 rounded-xl bg-[#ccff00] px-6 py-3.5 text-xs font-extrabold uppercase text-black hover:bg-[#b8e600] transition-all shadow-lg shadow-[#ccff00]/10"
                    >
                      <span>Go to workouts</span>
                      <ArrowRight className="h-4 w-4 stroke-[2.5]" />
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
