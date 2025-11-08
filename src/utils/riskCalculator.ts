import { UserProfile } from "@/types/profile";
import { Activity, Country } from "@/data/mockData";

export interface RiskAssessment {
  level: "low" | "moderate" | "high";
  reasons: string[];
  mitigations: string[];
  score: number;
}

export const calculateRisk = (
  activity: Activity,
  country: Country,
  profile: UserProfile
): RiskAssessment => {
  const reasons: string[] = [];
  const mitigations: string[] = [];
  let score = 0;

  // Environmental factors
  if (activity.environmental.altitude > 2000 && profile.triggers.includes("Altitude")) {
    score += 30;
    reasons.push("High altitude may trigger symptoms");
    mitigations.push("Acclimatize gradually, stay hydrated, consult doctor about altitude medication");
  }

  if (activity.environmental.temperature === "hot" && profile.triggers.includes("Heat")) {
    score += 20;
    reasons.push("High temperatures detected");
    mitigations.push("Stay in shade, drink plenty of water, avoid midday sun");
  }

  if (activity.environmental.noiseLevel === "loud" && profile.triggers.includes("Noise")) {
    score += 15;
    reasons.push("High noise levels present");
    mitigations.push("Bring noise-cancelling headphones or earplugs");
  }

  // Accessibility mismatch
  if (profile.mobilityLevel === "high" || profile.mobilityLevel === "moderate") {
    if (activity.accessibility.stairs && !activity.accessibility.hasElevator) {
      score += 25;
      reasons.push("Multiple stairs without elevator access");
      mitigations.push("Contact venue in advance to discuss accessibility options");
    }
    
    if (!activity.accessibility.wheelchairAccessible) {
      score += 20;
      reasons.push("Limited wheelchair accessibility");
      mitigations.push("Research alternative entrances or assisted access");
    }
  }

  // Health factors from country
  if (country.outbreaks.length > 0) {
    score += 15;
    reasons.push(`Active outbreaks: ${country.outbreaks.join(", ")}`);
    mitigations.push("Use insect repellent, avoid standing water, consult travel clinic");
  }

  if (country.waterSafety === "unsafe") {
    score += 10;
    reasons.push("Water safety concerns in region");
    mitigations.push("Drink only bottled water, avoid ice in drinks");
  }

  // Condition-specific risks
  if (profile.conditions.includes("Asthma") && activity.environmental.altitude > 1500) {
    score += 15;
    reasons.push("Altitude may affect respiratory conditions");
    mitigations.push("Bring all medications, have rescue inhaler accessible");
  }

  if (profile.conditions.includes("Anxiety") && activity.environmental.noiseLevel === "loud") {
    score += 10;
    reasons.push("Crowded/loud environment may cause anxiety");
    mitigations.push("Visit during off-peak hours, plan quiet breaks nearby");
  }

  // Determine risk level
  let level: "low" | "moderate" | "high";
  if (score >= 50) {
    level = "high";
  } else if (score >= 25) {
    level = "moderate";
  } else {
    level = "low";
  }

  // Add general mitigations
  if (level === "low" && reasons.length === 0) {
    reasons.push("Activity matches your profile well");
    mitigations.push("Enjoy your experience! Keep emergency contacts handy.");
  }

  return {
    level,
    reasons,
    mitigations,
    score,
  };
};
