export interface Country {
  iso: string;
  name: string;
  vaccines: string[];
  outbreaks: string[];
  waterSafety: "safe" | "moderate" | "unsafe";
  riskLevel: "low" | "moderate" | "high";
  latitude: number;
  longitude: number;
}

export interface Activity {
  id: string;
  name: string;
  description: string;
  location: string;
  accessibility: {
    wheelchairAccessible: boolean;
    hasElevator: boolean;
    stairs: boolean;
    stepFreeAccess: boolean;
  };
  environmental: {
    altitude: number;
    temperature: "cool" | "moderate" | "hot";
    noiseLevel: "quiet" | "moderate" | "loud";
  };
  image?: string;
}

export const countries: Record<string, Country> = {
  JP: {
    iso: "JP",
    name: "Japan",
    vaccines: ["Routine vaccines", "Hepatitis A"],
    outbreaks: [],
    waterSafety: "safe",
    riskLevel: "low",
    latitude: 35.6762,
    longitude: 139.6503,
  },
  IN: {
    iso: "IN",
    name: "India",
    vaccines: ["Routine vaccines", "Hepatitis A", "Typhoid", "Japanese Encephalitis"],
    outbreaks: ["Dengue (seasonal)"],
    waterSafety: "unsafe",
    riskLevel: "moderate",
    latitude: 28.6139,
    longitude: 77.2090,
  },
  FR: {
    iso: "FR",
    name: "France",
    vaccines: ["Routine vaccines"],
    outbreaks: [],
    waterSafety: "safe",
    riskLevel: "low",
    latitude: 48.8566,
    longitude: 2.3522,
  },
};

export const activities: Record<string, Activity[]> = {
  JP: [
    {
      id: "jp-1",
      name: "Mount Takao Hiking Trail",
      description: "Scenic hiking trail with multiple routes of varying difficulty",
      location: "Tokyo, Japan",
      accessibility: {
        wheelchairAccessible: false,
        hasElevator: false,
        stairs: true,
        stepFreeAccess: false,
      },
      environmental: {
        altitude: 599,
        temperature: "moderate",
        noiseLevel: "quiet",
      },
    },
    {
      id: "jp-2",
      name: "Tokyo National Museum",
      description: "Japan's oldest and largest museum showcasing Japanese art",
      location: "Tokyo, Japan",
      accessibility: {
        wheelchairAccessible: true,
        hasElevator: true,
        stairs: false,
        stepFreeAccess: true,
      },
      environmental: {
        altitude: 0,
        temperature: "moderate",
        noiseLevel: "quiet",
      },
    },
    {
      id: "jp-3",
      name: "Shibuya Crossing Experience",
      description: "Visit the world's busiest pedestrian crossing",
      location: "Tokyo, Japan",
      accessibility: {
        wheelchairAccessible: true,
        hasElevator: false,
        stairs: false,
        stepFreeAccess: true,
      },
      environmental: {
        altitude: 0,
        temperature: "moderate",
        noiseLevel: "loud",
      },
    },
  ],
  IN: [
    {
      id: "in-1",
      name: "Taj Mahal Visit",
      description: "Explore the iconic marble mausoleum",
      location: "Agra, India",
      accessibility: {
        wheelchairAccessible: true,
        hasElevator: false,
        stairs: false,
        stepFreeAccess: true,
      },
      environmental: {
        altitude: 171,
        temperature: "hot",
        noiseLevel: "moderate",
      },
    },
    {
      id: "in-2",
      name: "Ladakh Mountain Trek",
      description: "High-altitude trekking through Himalayan landscapes",
      location: "Ladakh, India",
      accessibility: {
        wheelchairAccessible: false,
        hasElevator: false,
        stairs: true,
        stepFreeAccess: false,
      },
      environmental: {
        altitude: 3500,
        temperature: "cool",
        noiseLevel: "quiet",
      },
    },
  ],
  FR: [
    {
      id: "fr-1",
      name: "Louvre Museum",
      description: "World's largest art museum and historic monument",
      location: "Paris, France",
      accessibility: {
        wheelchairAccessible: true,
        hasElevator: true,
        stairs: false,
        stepFreeAccess: true,
      },
      environmental: {
        altitude: 0,
        temperature: "moderate",
        noiseLevel: "moderate",
      },
    },
    {
      id: "fr-2",
      name: "Eiffel Tower Tour",
      description: "Iconic iron lattice tower with panoramic views",
      location: "Paris, France",
      accessibility: {
        wheelchairAccessible: true,
        hasElevator: true,
        stairs: true,
        stepFreeAccess: false,
      },
      environmental: {
        altitude: 0,
        temperature: "moderate",
        noiseLevel: "moderate",
      },
    },
  ],
};

export interface CommunityMember {
  id: string;
  name: string;
  city: string;
  country: string;
  interests: string[];
  mobilityLevel: string;
  image?: string;
}

export const communityMembers: CommunityMember[] = [
  {
    id: "1",
    name: "Sarah Chen",
    city: "Tokyo",
    country: "Japan",
    interests: ["Museums", "Accessible dining", "Cultural sites"],
    mobilityLevel: "Wheelchair user",
  },
  {
    id: "2",
    name: "Marcus Johnson",
    city: "Paris",
    country: "France",
    interests: ["Art galleries", "Quiet cafes", "Historical tours"],
    mobilityLevel: "Low mobility needs",
  },
  {
    id: "3",
    name: "Priya Sharma",
    city: "Delhi",
    country: "India",
    interests: ["Temple visits", "Cooking classes", "Gardens"],
    mobilityLevel: "Visual impairment support",
  },
  {
    id: "4",
    name: "Emma Rodriguez",
    city: "Barcelona",
    country: "Spain",
    interests: ["Beach access", "Adaptive sports", "Local markets"],
    mobilityLevel: "Moderate mobility needs",
  },
];
