"use client";

import { useEffect, useState, useMemo } from "react";
import Hero from "@/components/Hero";
import WorkoutCard from "@/components/WorkoutCard";
import WorkoutSkeleton from "@/components/WorkoutSkeleton";
import { Workout } from "@/types/workout";
import { FALLBACK_WORKOUTS } from "@/data/workouts";
import { ChevronDown, Search, Filter, AlertCircle, RefreshCw } from "lucide-react";

type SortOption = "duration" | "calories" | "rating";

export default function Home() {
  const [workouts, setWorkouts] = useState<Workout[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Filtering & Sorting States
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedMuscle, setSelectedMuscle] = useState<string>("All");
  const [sortBy, setSortBy] = useState<SortOption>("duration");

  const fetchWorkouts = async () => {
    setLoading(true);
    setError(null);

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 4000);

    try {
      const res = await fetch("https://api.abcz.workers.dev/api/fitlog", {
        signal: controller.signal,
      });
      clearTimeout(timeoutId);

      if (!res.ok) {
        throw new Error(`Server returned ${res.status}`);
      }
      const data: Workout[] = await res.json();
      setWorkouts(data);
    } catch (err: any) {
      console.warn("API fetch failed or timed out, using fallback workouts:", err);
      // Fallback data ensures app always functions smoothly even if external API is slow/down
      setWorkouts(FALLBACK_WORKOUTS);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWorkouts();
  }, []);

  // Extract all unique muscle groups
  const allMuscleGroups = useMemo(() => {
    const groups = new Set<string>();
    workouts.forEach((w) => {
      w.muscleGroups.forEach((m) => groups.add(m));
    });
    return ["All", ...Array.from(groups)];
  }, [workouts]);

  // Filtered and Sorted Workouts
  const filteredAndSortedWorkouts = useMemo(() => {
    let result = [...workouts];

    // Search filter
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      result = result.filter(
        (w) =>
          w.name.toLowerCase().includes(q) ||
          w.equipment.toLowerCase().includes(q) ||
          w.muscleGroups.some((m) => m.toLowerCase().includes(q))
      );
    }

    // Muscle group tag filter
    if (selectedMuscle !== "All") {
      result = result.filter((w) =>
        w.muscleGroups.some(
          (m) => m.toLowerCase() === selectedMuscle.toLowerCase()
        )
      );
    }

    // Sort By logic (Challenge C1)
    result.sort((a, b) => {
      if (sortBy === "duration") {
        return a.duration - b.duration;
      }
      if (sortBy === "calories") {
        return b.caloriesBurned - a.caloriesBurned; // higher calories first
      }
      if (sortBy === "rating") {
        return b.rating - a.rating; // higher rating first
      }
      return 0;
    });

    return result;
  }, [workouts, searchQuery, selectedMuscle, sortBy]);

  return (
    <div className="min-h-screen bg-zinc-950 pb-20">
      {/* Hero Banner Section */}
      <Hero />

      {/* Library Section */}
      <section id="library" className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-16 sm:pt-24 scroll-mt-20">
        {/* Section Header */}
        <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-end">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#ccff00]">
              <span>CURATED EXERCISES</span>
            </div>
            <h2 className="mt-1 text-3xl font-black uppercase tracking-tight text-white sm:text-5xl font-[family-name:var(--font-oswald)]">
              THE LIBRARY
            </h2>
            <p className="mt-2 text-base text-zinc-400">
              Twelve lifts covering every major muscle group.
            </p>
          </div>

          {/* Controls Bar: Sort Dropdown & Search */}
          <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
            {/* Search Input */}
            <div className="relative flex-1 md:w-64">
              <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-400" />
              <input
                type="text"
                placeholder="Search lifts or muscles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full rounded-xl border border-zinc-800 bg-zinc-900/90 py-2.5 pl-10 pr-4 text-xs font-medium text-white placeholder-zinc-500 transition-colors focus:border-[#ccff00] focus:outline-none focus:ring-1 focus:ring-[#ccff00]"
              />
            </div>

            {/* Sort Dropdown (Challenge C1) */}
            <div className="relative">
              <label htmlFor="sort-select" className="sr-only">
                Sort By
              </label>
              <div className="relative flex items-center">
                <span className="absolute left-3 text-xs font-bold uppercase text-zinc-400 pointer-events-none">
                  Sort By:
                </span>
                <select
                  id="sort-select"
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as SortOption)}
                  className="appearance-none rounded-xl border border-zinc-800 bg-zinc-900/90 py-2.5 pl-20 pr-9 text-xs font-bold uppercase text-[#ccff00] transition-colors hover:border-zinc-700 focus:border-[#ccff00] focus:outline-none cursor-pointer"
                >
                  <option value="duration">Duration</option>
                  <option value="calories">Calories</option>
                  <option value="rating">Rating</option>
                </select>
                <ChevronDown className="absolute right-3 h-4 w-4 text-zinc-400 pointer-events-none" />
              </div>
            </div>
          </div>
        </div>

        {/* Muscle Group Tag Filter Pills */}
        {!loading && workouts.length > 0 && (
          <div className="mt-6 flex flex-wrap gap-2 border-b border-zinc-800/80 pb-6">
            {allMuscleGroups.map((muscle) => (
              <button
                key={muscle}
                onClick={() => setSelectedMuscle(muscle)}
                className={`rounded-full px-4 py-1.5 text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                  selectedMuscle === muscle
                    ? "bg-[#ccff00] text-black shadow-md shadow-[#ccff00]/10 scale-105"
                    : "bg-zinc-900/80 text-zinc-400 hover:bg-zinc-800 hover:text-white border border-zinc-800"
                }`}
              >
                {muscle}
              </button>
            ))}
          </div>
        )}

        {/* Loading State Animation */}
        {loading && (
          <div className="mt-8">
            <WorkoutSkeleton />
          </div>
        )}

        {/* Workouts 3x4 Grid */}
        {!loading && (
          <div className="mt-8">
            {filteredAndSortedWorkouts.length > 0 ? (
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {filteredAndSortedWorkouts.map((workout) => (
                  <WorkoutCard key={workout.id} workout={workout} />
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-16 text-center border border-dashed border-zinc-800 rounded-2xl bg-zinc-900/40">
                <Search className="h-10 w-10 text-zinc-600" />
                <h3 className="mt-4 text-lg font-bold text-white uppercase font-[family-name:var(--font-oswald)]">
                  No Lifts Found
                </h3>
                <p className="mt-1 text-sm text-zinc-400">
                  No workouts match your current filter query.
                </p>
                <button
                  onClick={() => {
                    setSearchQuery("");
                    setSelectedMuscle("All");
                  }}
                  className="mt-4 rounded-xl bg-[#ccff00] px-4 py-2 text-xs font-extrabold uppercase text-black hover:bg-[#b8e600]"
                >
                  Reset Filters
                </button>
              </div>
            )}
          </div>
        )}
      </section>
    </div>
  );
}
