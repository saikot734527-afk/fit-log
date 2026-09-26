"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
  CalendarCheck,
  Bookmark,
  Check,
  Clock,
  Flame,
  Star,
  Layers,
  Dumbbell,
  Target,
  Gauge,
  ListOrdered,
  AlertCircle,
  Loader2,
} from "lucide-react";
import { usePlan } from "@/context/PlanContext";
import { Workout } from "@/types/workout";

export default function WorkoutDetailPage() {
  const params = useParams();
  const router = useRouter();
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
      try {
        // Try fetching single workout endpoint
        const res = await fetch(`https://api.abcz.workers.dev/api/fitlog/${workoutId}`);
        if (res.ok) {
          const data: Workout = await res.json();
          setWorkout(data);
        } else {
          // Fallback to searching all workouts
          const allRes = await fetch("https://api.abcz.workers.dev/api/fitlog");
          if (!allRes.ok) throw new Error("Failed to fetch workouts.");
          const allData: Workout[] = await allRes.json();
          const found = allData.find((w) => w.id === workoutId);
          if (found) {
            setWorkout(found);
          } else {
            setError("Workout not found.");
          }
        }
      } catch (err: any) {
        console.error("Error fetching detail:", err);
        setError("Unable to load workout details.");
      } finally {
        setLoading(false);
      }
    };

    fetchWorkoutDetail();
  }, [workoutId]);

  if (loading) {
    return (
      <div className="flex min-h-[70vh] flex-col items-center justify-center bg-zinc-950 px-4 text-center">
        <Loader2 className="h-10 w-10 animate-spin text-[#ccff00]" />
        <p className="mt-4 text-sm font-bold uppercase tracking-wider text-zinc-400">
          Loading lift details...
        </p>
      </div>
    );
  }

  if (error || !workout) {
    return (
      <div className="flex min-h-[70vh] flex-col items-center justify-center bg-zinc-950 px-4 text-center">
        <AlertCircle className="h-12 w-12 text-red-500" />
        <h2 className="mt-4 text-2xl font-black uppercase text-white font-[family-name:var(--font-oswald)]">
          Lift Not Found
        </h2>
        <p className="mt-2 text-sm text-zinc-400">
          {error || "The requested exercise does not exist in the library."}
        </p>
        <Link
          href="/"
          className="mt-6 inline-flex items-center gap-2 rounded-xl bg-[#ccff00] px-5 py-3 text-xs font-extrabold uppercase text-black hover:bg-[#b8e600]"
        >
          <ArrowLeft className="h-4 w-4" /> Back to Library
        </Link>
      </div>
    );
  }

  const alreadyInPlan = isInPlan(workout.id);
  const alreadySaved = isInSaved(workout.id);

  return (
    <div className="min-h-screen bg-zinc-950 pb-20 pt-8 sm:pt-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Back Button Navigation */}
        <div className="mb-8">
          <button
            onClick={() => router.back()}
            className="inline-flex items-center gap-2 rounded-lg border border-zinc-800 bg-zinc-900/80 px-4 py-2 text-xs font-bold uppercase text-zinc-400 hover:border-zinc-700 hover:text-white transition-all cursor-pointer"
          >
            <ArrowLeft className="h-4 w-4" /> Back
          </button>
        </div>

        {/* Two-Column Main Details Layout */}
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-12 items-start">
          {/* Left Side: Visual / Media Container */}
          <div className="lg:col-span-6">
            <div className="relative overflow-hidden rounded-3xl border border-zinc-800 bg-zinc-900 shadow-2xl">
              <img
                src={workout.image}
                alt={workout.name}
                className="h-[380px] sm:h-[480px] lg:h-[560px] w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-transparent opacity-80" />

              {/* Bottom Quick Badges on Image */}
              <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between rounded-2xl border border-zinc-800/90 bg-zinc-950/85 p-4 backdrop-blur-md">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#ccff00]/10 text-[#ccff00]">
                    <Gauge className="h-5 w-5" />
                  </div>
                  <div>
                    <span className="text-[10px] font-bold uppercase text-zinc-400">Difficulty</span>
                    <p className="text-sm font-black text-white uppercase">{workout.difficulty}</p>
                  </div>
                </div>

                <div className="flex items-center gap-4 text-xs font-bold text-zinc-300">
                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4 text-[#ccff00]" />
                    <span>{workout.duration}m</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Flame className="h-4 w-4 text-orange-400" />
                    <span>{workout.caloriesBurned} kcal</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side: Details & Actions */}
          <div className="flex flex-col lg:col-span-6">
            {/* Category Tag Pills */}
            <div className="flex flex-wrap gap-2">
              {workout.muscleGroups.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full bg-[#ccff00]/10 border border-[#ccff00]/30 px-3 py-1 text-xs font-black uppercase tracking-wider text-[#ccff00]"
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* Title */}
            <h1 className="mt-4 text-3xl font-black uppercase tracking-tight text-white sm:text-5xl font-[family-name:var(--font-oswald)] leading-tight">
              {workout.name}
            </h1>

            {/* Subtitle / Description */}
            <p className="mt-4 text-base leading-relaxed text-zinc-300">
              {workout.description}
            </p>

            {/* Key Specs Table / Panel */}
            <div className="mt-8 rounded-2xl border border-zinc-800 bg-zinc-900/80 p-5 backdrop-blur-sm">
              <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-400 border-b border-zinc-800 pb-3 flex items-center gap-2">
                <Target className="h-4 w-4 text-[#ccff00]" /> KEY SPECS
              </h3>

              <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 gap-4 text-xs">
                <div className="rounded-xl bg-zinc-950/60 p-3 border border-zinc-800/60">
                  <span className="text-[10px] font-bold uppercase text-zinc-500 block">EQUIPMENT</span>
                  <span className="mt-1 text-sm font-bold text-white block truncate">{workout.equipment}</span>
                </div>

                <div className="rounded-xl bg-zinc-950/60 p-3 border border-zinc-800/60">
                  <span className="text-[10px] font-bold uppercase text-zinc-500 block">DIFFICULTY</span>
                  <span className="mt-1 text-sm font-bold text-white block">{workout.difficulty}</span>
                </div>

                <div className="rounded-xl bg-zinc-950/60 p-3 border border-zinc-800/60">
                  <span className="text-[10px] font-bold uppercase text-zinc-500 block">TARGET SETS</span>
                  <span className="mt-1 text-sm font-bold text-[#ccff00] block">{workout.sets} Sets</span>
                </div>

                <div className="rounded-xl bg-zinc-950/60 p-3 border border-zinc-800/60">
                  <span className="text-[10px] font-bold uppercase text-zinc-500 block">REPS RANGE</span>
                  <span className="mt-1 text-sm font-bold text-white block">{workout.reps}</span>
                </div>

                <div className="rounded-xl bg-zinc-950/60 p-3 border border-zinc-800/60">
                  <span className="text-[10px] font-bold uppercase text-zinc-500 block">DURATION</span>
                  <span className="mt-1 text-sm font-bold text-white block">{workout.duration} min</span>
                </div>

                <div className="rounded-xl bg-zinc-950/60 p-3 border border-zinc-800/60">
                  <span className="text-[10px] font-bold uppercase text-zinc-500 block">CALORIES</span>
                  <span className="mt-1 text-sm font-bold text-orange-400 block">{workout.caloriesBurned} kcal</span>
                </div>
              </div>

              <div className="mt-4 flex items-center justify-between border-t border-zinc-800/60 pt-3 text-xs">
                <span className="font-semibold text-zinc-400">COMMUNITY RATING</span>
                <span className="flex items-center gap-1 font-bold text-amber-400">
                  <Star className="h-4 w-4 fill-amber-400" /> {workout.rating} / 5.0
                </span>
              </div>
            </div>

            {/* INSTRUCTIONS Section */}
            <div className="mt-8">
              <h3 className="text-sm font-bold uppercase tracking-wider text-white flex items-center gap-2">
                <ListOrdered className="h-4 w-4 text-[#ccff00]" /> INSTRUCTIONS
              </h3>

              <ol className="mt-4 space-y-3">
                {workout.instructions.map((step, index) => (
                  <li
                    key={index}
                    className="flex items-start gap-3.5 rounded-xl border border-zinc-800/60 bg-zinc-900/40 p-4 transition-colors hover:border-zinc-700"
                  >
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#ccff00] text-xs font-black text-black">
                      {index + 1}
                    </span>
                    <p className="text-sm leading-relaxed text-zinc-300">{step}</p>
                  </li>
                ))}
              </ol>
            </div>

            {/* Call To Action Buttons */}
            <div className="mt-10 flex flex-col sm:flex-row items-center gap-4">
              {/* Primary Button: Add to today's plan */}
              <button
                onClick={() => addToPlan(workout)}
                disabled={alreadyInPlan || (isPlanFull && !alreadyInPlan)}
                className={`flex-1 w-full group inline-flex items-center justify-center gap-2.5 rounded-xl px-6 py-4 text-sm font-extrabold uppercase tracking-wide transition-all shadow-lg cursor-pointer ${
                  alreadyInPlan
                    ? "bg-zinc-800 text-zinc-400 border border-zinc-700 cursor-not-allowed opacity-80"
                    : isPlanFull
                    ? "bg-zinc-800 text-zinc-500 border border-zinc-800 cursor-not-allowed"
                    : "bg-[#ccff00] text-black hover:bg-[#b8e600] shadow-[#ccff00]/10 hover:scale-[1.02] active:scale-[0.98]"
                }`}
              >
                {alreadyInPlan ? (
                  <>
                    <Check className="h-5 w-5 stroke-[2.5]" />
                    <span>In Today's Plan</span>
                  </>
                ) : isPlanFull ? (
                  <>
                    <CalendarCheck className="h-5 w-5 stroke-[2.5]" />
                    <span>Plan Full (Max 5)</span>
                  </>
                ) : (
                  <>
                    <CalendarCheck className="h-5 w-5 stroke-[2.5]" />
                    <span>Add to today's plan</span>
                  </>
                )}
              </button>

              {/* Secondary Button: Save for later */}
              <button
                onClick={() => addToSaved(workout)}
                disabled={alreadySaved}
                className={`flex-1 w-full group inline-flex items-center justify-center gap-2.5 rounded-xl border px-6 py-4 text-sm font-bold uppercase tracking-wide transition-all cursor-pointer ${
                  alreadySaved
                    ? "border-zinc-800 bg-zinc-900/60 text-zinc-500 cursor-not-allowed"
                    : "border-zinc-700 bg-zinc-900/90 text-zinc-200 hover:border-zinc-500 hover:bg-zinc-800 hover:text-white hover:scale-[1.02] active:scale-[0.98]"
                }`}
              >
                {alreadySaved ? (
                  <>
                    <Check className="h-5 w-5 text-blue-400" />
                    <span>Saved for Later</span>
                  </>
                ) : (
                  <>
                    <Bookmark className="h-5 w-5 text-blue-400" />
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
