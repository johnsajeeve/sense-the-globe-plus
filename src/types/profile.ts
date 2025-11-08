export interface UserProfile {
  mobilityLevel: "none" | "low" | "moderate" | "high";
  conditions: string[];
  triggers: string[];
}

export const defaultProfile: UserProfile = {
  mobilityLevel: "none",
  conditions: [],
  triggers: [],
};

export const mobilityOptions = [
  { value: "none", label: "No mobility issues" },
  { value: "low", label: "Minor mobility concerns" },
  { value: "moderate", label: "Moderate mobility needs" },
  { value: "high", label: "Significant mobility requirements" },
];

export const commonConditions = [
  "Asthma",
  "Diabetes",
  "Epilepsy",
  "Heart condition",
  "Anxiety",
  "Chronic illness",
  "Visual impairment",
  "Hearing impairment",
];

export const commonTriggers = [
  "Heat",
  "Altitude",
  "Noise",
  "Strobe lights",
  "Crowds",
  "Pollution",
  "Allergens",
  "Cold weather",
];
