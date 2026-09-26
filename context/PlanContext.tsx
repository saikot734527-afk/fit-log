"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import toast from "react-hot-toast";
import { Workout, PlanItem } from "@/types/workout";

interface PlanContextType {
  plan: PlanItem[];
  saved: Workout[];
  isLoaded: boolean;
  addToPlan: (workout: Workout) => boolean;
  removeFromPlan: (workoutId: number) => void;
  toggleDone: (workoutId: number) => void;
  addToSaved: (workout: Workout) => boolean;
  removeFromSaved: (workoutId: number) => void;
  isInPlan: (workoutId: number) => boolean;
  isInSaved: (workoutId: number) => boolean;
  isPlanFull: boolean;
}

const PlanContext = createContext<PlanContextType | undefined>(undefined);

const LOCAL_STORAGE_PLAN_KEY = "fitlog_today_plan_v1";
const LOCAL_STORAGE_SAVED_KEY = "fitlog_saved_workouts_v1";

export const PlanProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [plan, setPlan] = useState<PlanItem[]>([]);
  const [saved, setSaved] = useState<Workout[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load state from localStorage on mount
  useEffect(() => {
    try {
      const savedPlanData = localStorage.getItem(LOCAL_STORAGE_PLAN_KEY);
      const savedWorkoutsData = localStorage.getItem(LOCAL_STORAGE_SAVED_KEY);

      if (savedPlanData) {
        setPlan(JSON.parse(savedPlanData));
      }
      if (savedWorkoutsData) {
        setSaved(JSON.parse(savedWorkoutsData));
      }
    } catch (error) {
      console.error("Failed to load fitlog data from localStorage:", error);
    } finally {
      setIsLoaded(true);
    }
  }, []);

  // Save plan changes to localStorage
  const savePlanToStorage = (updatedPlan: PlanItem[]) => {
    setPlan(updatedPlan);
    try {
      localStorage.setItem(LOCAL_STORAGE_PLAN_KEY, JSON.stringify(updatedPlan));
    } catch (e) {
      console.error("Failed to save plan to localStorage:", e);
    }
  };

  // Save saved changes to localStorage
  const saveSavedToStorage = (updatedSaved: Workout[]) => {
    setSaved(updatedSaved);
    try {
      localStorage.setItem(LOCAL_STORAGE_SAVED_KEY, JSON.stringify(updatedSaved));
    } catch (e) {
      console.error("Failed to save workouts to localStorage:", e);
    }
  };

  const isInPlan = (workoutId: number) => {
    return plan.some((item) => item.workout.id === workoutId);
  };

  const isInSaved = (workoutId: number) => {
    return saved.some((item) => item.id === workoutId);
  };

  const isPlanFull = plan.length >= 5;

  const addToPlan = (workout: Workout): boolean => {
    if (isInPlan(workout.id)) {
      toast.error(`"${workout.name}" is already in today's plan!`, {
        style: { background: "#18181b", color: "#f4f4f5", border: "1px solid #3f3f46" },
      });
      return false;
    }

    if (plan.length >= 5) {
      toast.error("Cap reached! Today's plan is limited to 5 lifts.", {
        style: { background: "#18181b", color: "#f4f4f5", border: "1px solid #ef4444" },
      });
      return false;
    }

    const newItem: PlanItem = {
      workout,
      completed: false,
      addedAt: Date.now(),
    };

    const newPlan = [...plan, newItem];
    savePlanToStorage(newPlan);
    toast.success(`Added "${workout.name}" to today's plan`, {
      icon: "⚡",
      style: { background: "#18181b", color: "#ccff00", border: "1px solid #ccff00" },
    });
    return true;
  };

  const removeFromPlan = (workoutId: number) => {
    const itemToRemove = plan.find((item) => item.workout.id === workoutId);
    const newPlan = plan.filter((item) => item.workout.id !== workoutId);
    savePlanToStorage(newPlan);
    toast(`Removed ${itemToRemove ? itemToRemove.workout.name : "workout"} from plan`, {
      icon: "🗑️",
      style: { background: "#18181b", color: "#f4f4f5", border: "1px solid #3f3f46" },
    });
  };

  const toggleDone = (workoutId: number) => {
    const newPlan = plan.map((item) => {
      if (item.workout.id === workoutId) {
        const nextCompleted = !item.completed;
        if (nextCompleted) {
          toast.success(`Completed "${item.workout.name}"! Great work! 💪`, {
            style: { background: "#18181b", color: "#4ade80", border: "1px solid #22c55e" },
          });
        } else {
          toast(`Unmarked completion for "${item.workout.name}"`, {
            style: { background: "#18181b", color: "#f4f4f5", border: "1px solid #3f3f46" },
          });
        }
        return { ...item, completed: nextCompleted };
      }
      return item;
    });
    savePlanToStorage(newPlan);
  };

  const addToSaved = (workout: Workout): boolean => {
    if (isInSaved(workout.id)) {
      toast.error(`"${workout.name}" is already saved!`, {
        style: { background: "#18181b", color: "#f4f4f5", border: "1px solid #3f3f46" },
      });
      return false;
    }

    const newSaved = [...saved, workout];
    saveSavedToStorage(newSaved);
    toast.success(`Saved "${workout.name}" for later!`, {
      icon: "🔖",
      style: { background: "#18181b", color: "#60a5fa", border: "1px solid #3b82f6" },
    });
    return true;
  };

  const removeFromSaved = (workoutId: number) => {
    const itemToRemove = saved.find((w) => w.id === workoutId);
    const newSaved = saved.filter((w) => w.id !== workoutId);
    saveSavedToStorage(newSaved);
    toast(`Removed ${itemToRemove ? itemToRemove.name : "workout"} from saved`, {
      icon: "🗑️",
      style: { background: "#18181b", color: "#f4f4f5", border: "1px solid #3f3f46" },
    });
  };

  return (
    <PlanContext.Provider
      value={{
        plan,
        saved,
        isLoaded,
        addToPlan,
        removeFromPlan,
        toggleDone,
        addToSaved,
        removeFromSaved,
        isInPlan,
        isInSaved,
        isPlanFull,
      }}
    >
      {children}
    </PlanContext.Provider>
  );
};

export const usePlan = () => {
  const context = useContext(PlanContext);
  if (!context) {
    throw new Error("usePlan must be used within a PlanProvider");
  }
  return context;
};
