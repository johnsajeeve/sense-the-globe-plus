import { UserProfile, defaultProfile } from "@/types/profile";

const PROFILE_KEY = "senstheworld_profile";

export const saveProfile = (profile: UserProfile): void => {
  localStorage.setItem(PROFILE_KEY, JSON.stringify(profile));
};

export const loadProfile = (): UserProfile => {
  const stored = localStorage.getItem(PROFILE_KEY);
  if (stored) {
    try {
      return JSON.parse(stored);
    } catch {
      return defaultProfile;
    }
  }
  return defaultProfile;
};

export const clearProfile = (): void => {
  localStorage.removeItem(PROFILE_KEY);
};
