"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import {
  CalendarCheck,
  Bookmark,
  Check,
  AlertCircle,
  Loader2,
} from "lucide-react";
import { usePlan } from "@/context/PlanContext";
import { Workout } from "@/types/workout";
import { FALLBACK_WORKOUTS } from "@/data/workouts";

export default function WorkoutDetailView() {
  const params = useParams();
  const workoutId = params?.id ? Number(params.id) : null;

  const { addToPlan, addToSaved, isInPlan, isInSaved, isPlanFull } = usePlan();

  const [workout, setWorkout] = useState<Workout | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!workoutId) return;

    const fetchWorkoutDetail = async () => {
      setLoading(true);
      setError(null);

      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 3000);

      try {
        const res = await fetch(`https://api.abcz.workers.dev/api/fitlog/${workoutId}`, {
          signal: controller.signal,
        });
        clearTimeout(timeoutId);

        if (res.ok) {
          const data: Workout = await res.json();
          setWorkout(data);
        } else {
          throw new Error("Detail endpoint error");
        }
      } catch (err) {
        const found = FALLBACK_WORKOUTS.find((w) => w.id === workoutId);
        if (found) {
          setWorkout(found);
        } else {
          setError("Workout not found.");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchWorkoutDetail();
  }, [workoutId]);

  if (loading) {
    return (
      <div className="flex min-h-[70vh] flex-col items-center justify-center bg-[#0c0d12] px-4 text-center">
        <Loader2 className="h-10 w-10 animate-spin text-[#ccff00]" />
        <p className="mt-4 text-sm font-bold uppercase tracking-wider text-zinc-400">
          Loading workout...
        </p>
      </div>
    );
  }

  if (error || !workout) {
    return (
      <div className="flex min-h-[70vh] flex-col items-center justify-center bg-[#0c0d12] px-4 text-center">
        <AlertCircle className="h-12 w-12 text-red-500" />
        <h2 className="mt-4 text-2xl font-black uppercase text-white font-[family-name:var(--font-oswald)]">
          Lift Not Found
        </h2>
        <p className="mt-2 text-sm text-zinc-400">
          {error || "The requested exercise does not exist in the library."}
        </p>
        <Link
          href="/"
          className="mt-6 inline-flex items-center gap-2 rounded-none bg-[#ccff00] px-5 py-2.5 text-xs font-extrabold uppercase text-black hover:bg-[#b8e600]"
        >
          Back to Workouts
        </Link>
      </div>
    );
  }

  const alreadyInPlan = isInPlan(workout.id);
  const alreadySaved = isInSaved(workout.id);

  return (
    <div className="min-h-screen bg-[#0c0d12] pb-24 pt-8">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-12 items-start">
          {/* Left Column: Media Container */}
          <div className="lg:col-span-6">
            <div className="relative overflow-hidden rounded-none border border-zinc-800 bg-[#12131b] shadow-2xl">
              <img
                src={workout.image}
                alt={workout.name}
                className="aspect-square w-full object-cover rounded-none"
              />
            </div>
          </div>

          {/* Right Column: Details & Actions */}
          <div className="flex flex-col lg:col-span-6">
            <h1 className="text-3xl sm:text-4xl font-black uppercase tracking-tight text-white font-[family-name:var(--font-oswald)]">
              {workout.name}
            </h1>

            <p className="mt-3 text-sm leading-relaxed text-zinc-400">
              {workout.description}
            </p>

            <div className="mt-4 flex flex-wrap gap-2">
              {workout.muscleGroups.map((tag) => (
                <span
                  key={tag}
                  className="rounded-none bg-[#ccff00] px-3 py-1 text-xs font-black text-black"
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* Key Specs Table */}
            <div className="mt-8 overflow-hidden rounded-none border border-zinc-800/80 bg-[#12131b]">
              <div className="divide-y divide-zinc-800/60 text-xs">
                <div className="flex items-center justify-between p-4">
                  <span className="font-bold uppercase tracking-wider text-zinc-500">EQUIPMENT</span>
                  <span className="font-semibold text-white">{workout.equipment}</span>
                </div>

                <div className="flex items-center justify-between p-4">
                  <span className="font-bold uppercase tracking-wider text-zinc-500">DIFFICULTY</span>
                  <span className="font-semibold text-white">{workout.difficulty}</span>
                </div>

                <div className="flex items-center justify-between p-4">
                  <span className="font-bold uppercase tracking-wider text-zinc-500">SETS</span>
                  <span className="font-semibold text-white">{workout.sets}</span>
                </div>

                <div className="flex items-center justify-between p-4">
                  <span className="font-bold uppercase tracking-wider text-zinc-500">REPS</span>
                  <span className="font-semibold text-white">{workout.reps}</span>
                </div>

                <div className="flex items-center justify-between p-4">
                  <span className="font-bold uppercase tracking-wider text-zinc-500">DURATION</span>
                  <span className="font-semibold text-white">{workout.duration} min</span>
                </div>

                <div className="flex items-center justify-between p-4">
                  <span className="font-bold uppercase tracking-wider text-zinc-500">CALORIES</span>
                  <span className="font-semibold text-white">{workout.caloriesBurned} kcal</span>
                </div>

                <div className="flex items-center justify-between p-4">
                  <span className="font-bold uppercase tracking-wider text-zinc-500">RATING</span>
                  <span className="font-semibold text-white">{workout.rating}</span>
                </div>
              </div>
            </div>

            {/* INSTRUCTIONS */}
            <div className="mt-8">
              <h3 className="text-sm font-bold uppercase tracking-wider text-white">
                INSTRUCTIONS
              </h3>

              <ol className="mt-4 space-y-2.5 text-xs sm:text-sm text-zinc-300">
                {workout.instructions.map((step, index) => (
                  <li key={index} className="flex items-start gap-2 leading-relaxed">
                    <span className="font-bold text-zinc-400">{index + 1}.</span>
                    <span>{step}</span>
                  </li>
                ))}
              </ol>
            </div>

            {/* Action Buttons */}
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <button
                onClick={() => addToPlan(workout)}
                disabled={alreadyInPlan || (isPlanFull && !alreadyInPlan)}
                className={`flex items-center justify-center gap-2 rounded-none px-5 py-3 text-xs font-extrabold transition-all cursor-pointer ${
                  alreadyInPlan
                    ? "bg-zinc-800 text-zinc-400 border border-zinc-700 cursor-not-allowed"
                    : isPlanFull
                    ? "bg-zinc-800 text-zinc-500 border border-zinc-800 cursor-not-allowed"
                    : "bg-[#ccff00] text-black hover:bg-[#b8e600] active:scale-95"
                }`}
              >
                {alreadyInPlan ? (
                  <>
                    <Check className="h-4 w-4" />
                    <span>In Today's Plan</span>
                  </>
                ) : (
                  <>
                    <CalendarCheck className="h-4 w-4" />
                    <span>Add to today's plan</span>
                  </>
                )}
              </button>

              <button
                onClick={() => addToSaved(workout)}
                disabled={alreadySaved}
                className={`flex items-center justify-center gap-2 rounded-none border border-zinc-800 bg-[#12131b] px-5 py-3 text-xs font-bold text-zinc-200 transition-all cursor-pointer ${
                  alreadySaved
                    ? "text-zinc-500 cursor-not-allowed"
                    : "hover:border-zinc-700 hover:text-white active:scale-95"
                }`}
              >
                {alreadySaved ? (
                  <>
                    <Check className="h-4 w-4" />
                    <span>Saved for later</span>
                  </>
                ) : (
                  <>
                    <Bookmark className="h-4 w-4" />
                    <span>Save for later</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
