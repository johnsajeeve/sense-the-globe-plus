import type { Tables } from "@/integrations/supabase/types";

interface Activity {
  name: string;
  mobility_required?: "none" | "low" | "moderate" | "high";
  triggers?: string[];
  environment?: string[];
}

export function getComfortScore(profile: Tables<"profiles">, activity: Activity) {
  let score = 100;

  // Mobility penalty
  if (activity.mobility_required && profile.mobility_level) {
    const levels = ["none", "low", "moderate", "high"];
    const userLevel = levels.indexOf(profile.mobility_level);
    const reqLevel = levels.indexOf(activity.mobility_required);

    if (reqLevel > userLevel) score -= (reqLevel - userLevel) * 20;
  }

  // Trigger penalty
  if (activity.triggers && profile.triggers) {
    const conflicts = activity.triggers.filter((t) => profile.triggers!.includes(t));
    score -= conflicts.length * 15;
  }

  // Environmental / health considerations
  if (activity.environment && profile.conditions) {
    if (profile.conditions.includes("asthma") && activity.environment.includes("high-pollen"))
      score -= 20;

    if (profile.conditions.includes("epilepsy") && activity.environment.includes("strobe-lights"))
      score -= 30;
  }

  // Clamp score
  if (score < 0) score = 0;
  if (score > 100) score = 100;

  return Math.round(score);
}
