import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { AlertCircle, ArrowLeft, Droplet, Syringe } from "lucide-react";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ActivityCard from "@/components/ActivityCard";
import { countries, activities } from "@/data/mockData";
import { loadProfile } from "@/utils/localStorage";

interface WaterDataType {
  page: number;
  pages: number;
  per_page: number;
  total: number;
  data: any[];
}

const Destination = () => {
  const { country } = useParams<{ country: string }>();
  const navigate = useNavigate();
  const [profile, setProfile] = useState(loadProfile());

  const [waterData, setWaterData] = useState<WaterDataType | null>(null);
  const [waterError, setWaterError] = useState<string | null>(null);
  const [loadingWater, setLoadingWater] = useState(true);

  const mapRef = useRef<L.Map | null>(null);
  const mapContainer = useRef<HTMLDivElement>(null);

  // Reload profile on mount
  useEffect(() => {
    setProfile(loadProfile());
  }, []);

  if (!country || !countries[country]) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Country not found</h1>
          <Button onClick={() => navigate("/")}>Go Home</Button>
        </div>
      </div>
    );
  }

  const countryData = countries[country];
  const countryActivities = activities[country] || [];

  /** 🌍 Fetch SDG 6 water data */
  useEffect(() => {
    const fetchWaterData = async () => {
      try {
        const apiUrl = `https://corsproxy.io/?https://sdg6data.org/api/indicator/6.1.1?_format=json&country=${encodeURIComponent(
          countryData.name
        )}`;
        const response = await fetch(apiUrl);
        if (!response.ok) throw new Error("Network error");
        const json = await response.json();
        setWaterData(json);
      } catch (err) {
        console.error("Failed to fetch SDG 6 data:", err);
        setWaterError("Failed to fetch SDG 6 water data");
      } finally {
        setLoadingWater(false);
      }
    };

    fetchWaterData();
  }, [countryData.name]);

  /** 🗺️ Initialize Leaflet map */
  useEffect(() => {
    if (!mapContainer.current || mapRef.current) return;

    const { latitude, longitude } = countryData;

    const map = L.map(mapContainer.current, {
      center: [latitude, longitude],
      zoom: 5,
      scrollWheelZoom: true,
    });

    mapRef.current = map;

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: "© OpenStreetMap contributors",
    }).addTo(map);

    L.circleMarker([latitude, longitude], {
      color: "#0077ff",
      fillColor: "#0077ff",
      fillOpacity: 0.8,
      radius: 8,
      weight: 1.5,
    }).addTo(map);

    return () => {
      map.remove();
      mapRef.current = null;
    };
  }, [countryData]);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 py-8 px-4 container max-w-6xl">
        <Button
          variant="ghost"
          onClick={() => navigate("/")}
          className="mb-6 flex items-center gap-2"
        >
          <ArrowLeft className="h-4 w-4" /> Back to Home
        </Button>

        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">{countryData.name}</h1>
          <p className="text-muted-foreground">
            Health information and accessible activities
          </p>
        </div>

        {/* Health Snapshot */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertCircle className="h-5 w-5" />
              Health & Safety Snapshot
            </CardTitle>
            <CardDescription>
              Important health information for {countryData.name}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid md:grid-cols-3 gap-4">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Syringe className="h-4 w-4 text-primary" />
                  <span className="font-medium">Recommended Vaccines</span>
                </div>
                <div className="space-y-1">
                  {countryData.vaccines.map((vaccine) => (
                    <Badge key={vaccine} variant="outline">
                      {vaccine}
                    </Badge>
                  ))}
                </div>
              </div>
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <AlertCircle className="h-4 w-4 text-warning" />
                  <span className="font-medium">Active Outbreaks</span>
                </div>
                {countryData.outbreaks.length > 0 ? (
                  countryData.outbreaks.map((outbreak) => (
                    <Badge key={outbreak} variant="destructive">
                      {outbreak}
                    </Badge>
                  ))
                ) : (
                  <span>No current outbreaks</span>
                )}
              </div>
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Droplet className="h-4 w-4 text-blue-500" />
                  <span className="font-medium">Water Safety (SDG 6.1.1)</span>
                </div>
                {loadingWater ? (
                  <span>Loading...</span>
                ) : waterError ? (
                  <span>{waterError}</span>
                ) : (
                  <span>
                    Access to safely managed water:{" "}
                    {waterData?.[1]?.[0]?.Value ?? "Data unavailable"}%
                  </span>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Map */}
        <div
          ref={mapContainer}
          className="w-full h-96 rounded-lg shadow-md mb-8"
        />

        {/* Activities */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Activities</h2>
          <div className="grid md:grid-cols-3 gap-4">
            {countryActivities.length > 0 ? (
              countryActivities.map((activity) => (
                <ActivityCard key={activity.id} activity={activity} country={undefined} profile={{
                  conditions: [],
                  created_at: "",
                  email: "",
                  full_name: "",
                  id: "",
                  mobility_level: "",
                  triggers: [],
                  updated_at: ""
                }} />
              ))
            ) : (
              <span>No activities available</span>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Destination;
