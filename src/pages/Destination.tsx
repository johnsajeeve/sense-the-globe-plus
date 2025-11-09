import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { waterAccessData } from "@/data/mockData";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { AlertCircle, ArrowLeft, Droplet, Syringe, Accessibility } from "lucide-react";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { countries } from "@/data/mockData";
import { loadProfile } from "@/utils/localStorage";

interface OSMPlace {
  id: number;
  lat: number;
  lon: number;
  name: string;
  wheelchair: string;
  tourism?: string;
}

const Destination = () => {
  const { country } = useParams<{ country: string }>();
  const navigate = useNavigate();
  const [profile, setProfile] = useState(loadProfile());
  const [osmPlaces, setOsmPlaces] = useState<OSMPlace[]>([]);
  const [loadingPlaces, setLoadingPlaces] = useState(true);
  const [osmError, setOsmError] = useState<string | null>(null);

  const [waterError, setWaterError] = useState<string | null>(null);
  const [loadingWater, setLoadingWater] = useState(true);
  const [waterData, setWaterData] = useState<any>(null);

  const mapRef = useRef<L.Map | null>(null);
  const mapContainer = useRef<HTMLDivElement>(null);

  useEffect(() => setProfile(loadProfile()), []);

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

  /** 🌍 Load water access data (mock for now) */
  useEffect(() => {
    const iso = countryData.iso;
    const waterInfo = waterAccessData[iso] || {
      value: 80.0,
      source: "Estimated (no data)",
    };
    setWaterData(waterInfo);
    setLoadingWater(false);
  }, [countryData.iso]);

  /** 🗺️ Initialize map */
  useEffect(() => {
    if (!mapContainer.current) return;

    if (mapRef.current) mapRef.current.remove();

    const { latitude, longitude } = countryData;

    const map = L.map(mapContainer.current, {
      center: [latitude, longitude],
      zoom: 5,
      scrollWheelZoom: true,
    });

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

    mapRef.current = map;
    return () => map.remove();
  }, [countryData]);

  /** 🦽 Fetch accessible attractions from OpenStreetMap */
  useEffect(() => {
    const fetchOSMData = async () => {
      setLoadingPlaces(true);
      setOsmError(null);

      const lat = countryData.latitude;
      const lon = countryData.longitude;
      const delta = 0.5;
      const minLat = lat - delta;
      const maxLat = lat + delta;
      const minLon = lon - delta;
      const maxLon = lon + delta;

      const query = `
        [out:json][timeout:25];
        (
          node["tourism"="attraction"]["wheelchair"](${minLat},${minLon},${maxLat},${maxLon});
          node["tourism"="museum"]["wheelchair"](${minLat},${minLon},${maxLat},${maxLon});
          node["historic"]["wheelchair"](${minLat},${minLon},${maxLat},${maxLon});
        );
        out body;
      `;

      try {
        const response = await fetch("https://overpass.kumi.systems/api/interpreter", {
          method: "POST",
          body: query,
        });
        if (!response.ok) throw new Error("Network error fetching OSM data");

        const json = await response.json();
        const results = (json.elements || []).map((el: any) => ({
          id: el.id,
          lat: el.lat,
          lon: el.lon,
          name: el.tags?.name || "Unnamed place",
          wheelchair: el.tags?.wheelchair || "unknown",
          tourism: el.tags?.tourism,
        }));

        setOsmPlaces(results);
      } catch {
        setOsmError("Failed to load OpenStreetMap accessibility data");
      } finally {
        setLoadingPlaces(false);
      }
    };

    fetchOSMData();
  }, [countryData.latitude, countryData.longitude]);

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

        {/* ✅ Hero Banner Added Here */}
        <div className="mb-10">
          <div className="w-full h-64 md:h-72 lg:h-80 rounded-2xl overflow-hidden shadow-[0_12px_35px_-10px_rgba(0,170,255,0.25)] mb-6 relative group">
            <img
              src={`https://source.unsplash.com/1600x900/?${countryData.name},travel,landscape`}
              alt={`${countryData.name} landscape`}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
          </div>

          <h1 className="text-5xl font-extrabold tracking-tight mb-2">
            {countryData.name}
          </h1>
          <p className="text-muted-foreground text-lg">
            Health information and accessible attractions
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
                {countryData.vaccines.map((vaccine) => (
                  <Badge key={vaccine} variant="outline">{vaccine}</Badge>
                ))}
              </div>

              <div>
                <div className="flex items-center gap-2 mb-2">
                  <AlertCircle className="h-4 w-4 text-yellow-500" />
                  <span className="font-medium">Active Outbreaks</span>
                </div>
                {countryData.outbreaks.length > 0 ? (
                  countryData.outbreaks.map((o) => <Badge key={o} variant="destructive">{o}</Badge>)
                ) : (
                  <span>No current outbreaks</span>
                )}
              </div>

              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Droplet className="h-4 w-4 text-blue-500" />
                  <span className="font-medium">Water Safety (SDG 6.1.1)</span>
                </div>
                {loadingWater ? "Loading..." : (
                  <p>
                    Access to drinking water: <strong>{waterData?.value}%</strong>{" "}
                    <small className="text-gray-500">({waterData?.source})</small>
                  </p>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Map */}
        <div ref={mapContainer} className="w-full h-96 rounded-lg shadow-md mb-8" />

        {/* Accessible Attractions */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-4">
            Accessible Attractions in {countryData.name}
          </h2>

          {loadingPlaces ? (
            <p>Loading attractions...</p>
          ) : osmError ? (
            <p className="text-red-500">{osmError}</p>
          ) : osmPlaces.length === 0 ? (
            <p>No accessible attractions found nearby.</p>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {osmPlaces.map((place) => (
                <Card key={place.id} className="hover:shadow-lg transition">
                  <CardHeader>
                    <CardTitle>{place.name}</CardTitle>
                    <CardDescription className="flex items-center gap-2">
                      <Accessibility className="h-4 w-4 text-blue-500" />
                      {place.tourism || "Attraction"}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Badge variant="outline" className="mb-3">
                      {place.wheelchair === "yes"
                        ? "♿ Wheelchair Accessible"
                        : place.wheelchair === "limited"
                        ? "♿ Limited Access"
                        : place.wheelchair === "no"
                        ? "🚫 Not Accessible"
                        : "❓ Unknown"}
                    </Badge>

                    <Button
                      variant="secondary"
                      className="w-full"
                      onClick={() =>
                        window.open(
                          `https://www.openstreetmap.org/?mlat=${place.lat}&mlon=${place.lon}#map=18/${place.lat}/${place.lon}`,
                          "_blank"
                        )
                      }
                    >
                      View on Map
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Destination;
