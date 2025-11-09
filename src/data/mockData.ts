// 🌍 Fake but realistic water access data (SDG 6.1.1)
export const waterAccessData: Record<string, { value: number; source: string }> = {
  JP: { value: 99.5, source: "(OECD avg)" },
  IN: { value: 72.3, source: "(developing region)" },
  FR: { value: 98.9, source: "(EU avg)" },
  US: { value: 99.2, source: "(CDC model)" },
  GB: { value: 99.0, source: "(UK report)" },
  ES: { value: 98.4, source: "(EU data)" },
  IT: { value: 97.7, source: "(World Bank est.)" },
  TH: { value: 89.3, source: "(Asia avg)" },
  AU: { value: 99.8, source: "(Australia report)" },
  BR: { value: 86.1, source: "(Latin America avg)" },
  CA: { value: 99.7, source: "(Canada health data)" },
  DE: { value: 99.1, source: "(Germany env. report)" },
  MX: { value: 87.2, source: "(UNICEF est.)" },
  AE: { value: 96.5, source: "(Middle East avg)" },
  SG: { value: 100.0, source: "Singapore PUB)" },
};


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
  US: {
    iso: "US",
    name: "United States",
    vaccines: ["Routine vaccines"],
    outbreaks: [],
    waterSafety: "safe",
    riskLevel: "low",
    latitude: 40.7128,
    longitude: -74.0060,
  },
  GB: {
    iso: "GB",
    name: "United Kingdom",
    vaccines: ["Routine vaccines"],
    outbreaks: [],
    waterSafety: "safe",
    riskLevel: "low",
    latitude: 51.5074,
    longitude: -0.1278,
  },
  ES: {
    iso: "ES",
    name: "Spain",
    vaccines: ["Routine vaccines", "Hepatitis A"],
    outbreaks: [],
    waterSafety: "safe",
    riskLevel: "low",
    latitude: 40.4168,
    longitude: -3.7038,
  },
  IT: {
    iso: "IT",
    name: "Italy",
    vaccines: ["Routine vaccines"],
    outbreaks: [],
    waterSafety: "safe",
    riskLevel: "low",
    latitude: 41.9028,
    longitude: 12.4964,
  },
  TH: {
    iso: "TH",
    name: "Thailand",
    vaccines: ["Routine vaccines", "Hepatitis A", "Typhoid", "Japanese Encephalitis"],
    outbreaks: ["Dengue (year-round)"],
    waterSafety: "moderate",
    riskLevel: "moderate",
    latitude: 13.7563,
    longitude: 100.5018,
  },
  AU: {
    iso: "AU",
    name: "Australia",
    vaccines: ["Routine vaccines"],
    outbreaks: [],
    waterSafety: "safe",
    riskLevel: "low",
    latitude: -33.8688,
    longitude: 151.2093,
  },
  BR: {
    iso: "BR",
    name: "Brazil",
    vaccines: ["Routine vaccines", "Yellow Fever", "Hepatitis A", "Typhoid"],
    outbreaks: ["Dengue (seasonal)", "Zika"],
    waterSafety: "unsafe",
    riskLevel: "moderate",
    latitude: -23.5505,
    longitude: -46.6333,
  },
  CA: {
    iso: "CA",
    name: "Canada",
    vaccines: ["Routine vaccines"],
    outbreaks: [],
    waterSafety: "safe",
    riskLevel: "low",
    latitude: 43.6532,
    longitude: -79.3832,
  },
  DE: {
    iso: "DE",
    name: "Germany",
    vaccines: ["Routine vaccines"],
    outbreaks: [],
    waterSafety: "safe",
    riskLevel: "low",
    latitude: 52.5200,
    longitude: 13.4050,
  },
  MX: {
    iso: "MX",
    name: "Mexico",
    vaccines: ["Routine vaccines", "Hepatitis A", "Typhoid"],
    outbreaks: ["Dengue (seasonal)"],
    waterSafety: "moderate",
    riskLevel: "moderate",
    latitude: 19.4326,
    longitude: -99.1332,
  },
  AE: {
    iso: "AE",
    name: "United Arab Emirates",
    vaccines: ["Routine vaccines"],
    outbreaks: [],
    waterSafety: "safe",
    riskLevel: "low",
    latitude: 25.2048,
    longitude: 55.2708,
  },
  SG: {
    iso: "SG",
    name: "Singapore",
    vaccines: ["Routine vaccines", "Hepatitis A"],
    outbreaks: [],
    waterSafety: "safe",
    riskLevel: "low",
    latitude: 1.3521,
    longitude: 103.8198,
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
  US: [
    {
      id: "us-1",
      name: "Central Park Walk",
      description: "Urban park with accessible paths and scenic views",
      location: "New York, USA",
      accessibility: {
        wheelchairAccessible: true,
        hasElevator: false,
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
      id: "us-2",
      name: "Statue of Liberty Tour",
      description: "Visit America's iconic symbol of freedom",
      location: "New York, USA",
      accessibility: {
        wheelchairAccessible: true,
        hasElevator: true,
        stairs: true,
        stepFreeAccess: false,
      },
      environmental: {
        altitude: 0,
        temperature: "moderate",
        noiseLevel: "loud",
      },
    },
  ],
  GB: [
    {
      id: "gb-1",
      name: "British Museum",
      description: "World-famous museum of art and antiquities",
      location: "London, UK",
      accessibility: {
        wheelchairAccessible: true,
        hasElevator: true,
        stairs: false,
        stepFreeAccess: true,
      },
      environmental: {
        altitude: 0,
        temperature: "cool",
        noiseLevel: "moderate",
      },
    },
    {
      id: "gb-2",
      name: "Tower of London",
      description: "Historic castle on the River Thames",
      location: "London, UK",
      accessibility: {
        wheelchairAccessible: false,
        hasElevator: false,
        stairs: true,
        stepFreeAccess: false,
      },
      environmental: {
        altitude: 0,
        temperature: "cool",
        noiseLevel: "moderate",
      },
    },
  ],
  ES: [
    {
      id: "es-1",
      name: "Sagrada Familia",
      description: "Gaudí's masterpiece basilica",
      location: "Barcelona, Spain",
      accessibility: {
        wheelchairAccessible: true,
        hasElevator: true,
        stairs: false,
        stepFreeAccess: true,
      },
      environmental: {
        altitude: 0,
        temperature: "hot",
        noiseLevel: "moderate",
      },
    },
    {
      id: "es-2",
      name: "Park Güell",
      description: "Colorful park with Gaudí architecture",
      location: "Barcelona, Spain",
      accessibility: {
        wheelchairAccessible: false,
        hasElevator: false,
        stairs: true,
        stepFreeAccess: false,
      },
      environmental: {
        altitude: 150,
        temperature: "hot",
        noiseLevel: "moderate",
      },
    },
  ],
  IT: [
    {
      id: "it-1",
      name: "Colosseum Tour",
      description: "Ancient Roman amphitheater",
      location: "Rome, Italy",
      accessibility: {
        wheelchairAccessible: true,
        hasElevator: true,
        stairs: true,
        stepFreeAccess: false,
      },
      environmental: {
        altitude: 0,
        temperature: "hot",
        noiseLevel: "loud",
      },
    },
    {
      id: "it-2",
      name: "Vatican Museums",
      description: "Papal art collections and Sistine Chapel",
      location: "Vatican City, Italy",
      accessibility: {
        wheelchairAccessible: true,
        hasElevator: true,
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
  TH: [
    {
      id: "th-1",
      name: "Grand Palace Bangkok",
      description: "Ornate royal palace complex",
      location: "Bangkok, Thailand",
      accessibility: {
        wheelchairAccessible: false,
        hasElevator: false,
        stairs: true,
        stepFreeAccess: false,
      },
      environmental: {
        altitude: 0,
        temperature: "hot",
        noiseLevel: "loud",
      },
    },
    {
      id: "th-2",
      name: "Floating Market Tour",
      description: "Traditional market on the canal",
      location: "Bangkok, Thailand",
      accessibility: {
        wheelchairAccessible: false,
        hasElevator: false,
        stairs: false,
        stepFreeAccess: false,
      },
      environmental: {
        altitude: 0,
        temperature: "hot",
        noiseLevel: "loud",
      },
    },
  ],
  AU: [
    {
      id: "au-1",
      name: "Sydney Opera House",
      description: "Iconic performing arts venue",
      location: "Sydney, Australia",
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
      id: "au-2",
      name: "Bondi Beach",
      description: "Famous beach with accessible facilities",
      location: "Sydney, Australia",
      accessibility: {
        wheelchairAccessible: true,
        hasElevator: false,
        stairs: false,
        stepFreeAccess: true,
      },
      environmental: {
        altitude: 0,
        temperature: "hot",
        noiseLevel: "moderate",
      },
    },
  ],
  BR: [
    {
      id: "br-1",
      name: "Christ the Redeemer",
      description: "Iconic statue overlooking Rio",
      location: "Rio de Janeiro, Brazil",
      accessibility: {
        wheelchairAccessible: true,
        hasElevator: true,
        stairs: false,
        stepFreeAccess: true,
      },
      environmental: {
        altitude: 710,
        temperature: "hot",
        noiseLevel: "moderate",
      },
    },
    {
      id: "br-2",
      name: "Amazon Rainforest Tour",
      description: "Guided tour through the rainforest",
      location: "Manaus, Brazil",
      accessibility: {
        wheelchairAccessible: false,
        hasElevator: false,
        stairs: false,
        stepFreeAccess: false,
      },
      environmental: {
        altitude: 92,
        temperature: "hot",
        noiseLevel: "quiet",
      },
    },
  ],
  CA: [
    {
      id: "ca-1",
      name: "CN Tower",
      description: "Iconic observation tower",
      location: "Toronto, Canada",
      accessibility: {
        wheelchairAccessible: true,
        hasElevator: true,
        stairs: false,
        stepFreeAccess: true,
      },
      environmental: {
        altitude: 0,
        temperature: "cool",
        noiseLevel: "moderate",
      },
    },
    {
      id: "ca-2",
      name: "Niagara Falls",
      description: "Spectacular waterfalls with viewing platforms",
      location: "Niagara, Canada",
      accessibility: {
        wheelchairAccessible: true,
        hasElevator: true,
        stairs: false,
        stepFreeAccess: true,
      },
      environmental: {
        altitude: 0,
        temperature: "cool",
        noiseLevel: "loud",
      },
    },
  ],
  DE: [
    {
      id: "de-1",
      name: "Brandenburg Gate",
      description: "Historic monument and symbol of Berlin",
      location: "Berlin, Germany",
      accessibility: {
        wheelchairAccessible: true,
        hasElevator: false,
        stairs: false,
        stepFreeAccess: true,
      },
      environmental: {
        altitude: 0,
        temperature: "cool",
        noiseLevel: "moderate",
      },
    },
    {
      id: "de-2",
      name: "Neuschwanstein Castle",
      description: "Fairytale castle in the Bavarian Alps",
      location: "Bavaria, Germany",
      accessibility: {
        wheelchairAccessible: false,
        hasElevator: false,
        stairs: true,
        stepFreeAccess: false,
      },
      environmental: {
        altitude: 965,
        temperature: "cool",
        noiseLevel: "quiet",
      },
    },
  ],
  MX: [
    {
      id: "mx-1",
      name: "Chichen Itza",
      description: "Ancient Mayan pyramid complex",
      location: "Yucatan, Mexico",
      accessibility: {
        wheelchairAccessible: false,
        hasElevator: false,
        stairs: true,
        stepFreeAccess: false,
      },
      environmental: {
        altitude: 0,
        temperature: "hot",
        noiseLevel: "moderate",
      },
    },
    {
      id: "mx-2",
      name: "Frida Kahlo Museum",
      description: "Former home of iconic artist Frida Kahlo",
      location: "Mexico City, Mexico",
      accessibility: {
        wheelchairAccessible: true,
        hasElevator: false,
        stairs: true,
        stepFreeAccess: false,
      },
      environmental: {
        altitude: 2240,
        temperature: "moderate",
        noiseLevel: "quiet",
      },
    },
  ],
  AE: [
    {
      id: "ae-1",
      name: "Burj Khalifa",
      description: "World's tallest building with observation deck",
      location: "Dubai, UAE",
      accessibility: {
        wheelchairAccessible: true,
        hasElevator: true,
        stairs: false,
        stepFreeAccess: true,
      },
      environmental: {
        altitude: 0,
        temperature: "hot",
        noiseLevel: "moderate",
      },
    },
    {
      id: "ae-2",
      name: "Dubai Mall Aquarium",
      description: "Indoor aquarium with accessible viewing",
      location: "Dubai, UAE",
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
  ],
  SG: [
    {
      id: "sg-1",
      name: "Gardens by the Bay",
      description: "Futuristic nature park with Supertree Grove",
      location: "Singapore",
      accessibility: {
        wheelchairAccessible: true,
        hasElevator: true,
        stairs: false,
        stepFreeAccess: true,
      },
      environmental: {
        altitude: 0,
        temperature: "hot",
        noiseLevel: "moderate",
      },
    },
    {
      id: "sg-2",
      name: "Marina Bay Sands",
      description: "Iconic hotel with rooftop observation deck",
      location: "Singapore",
      accessibility: {
        wheelchairAccessible: true,
        hasElevator: true,
        stairs: false,
        stepFreeAccess: true,
      },
      environmental: {
        altitude: 0,
        temperature: "hot",
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