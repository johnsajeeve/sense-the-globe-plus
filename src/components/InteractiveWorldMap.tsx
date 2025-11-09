import { useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-control-geocoder/dist/Control.Geocoder.css";
import "leaflet-control-geocoder";

const InteractiveHealthMap = () => {
  const mapRef = useRef<L.Map | null>(null);
  const mapContainer = useRef<HTMLDivElement>(null);
  const userLayer = useRef<L.LayerGroup | null>(null);
  const healthLayer = useRef<L.LayerGroup | null>(null);

  useEffect(() => {
    if (!mapContainer.current) return;

    const map = L.map(mapContainer.current, {
      zoomSnap: 0.1,
      zoomDelta: 0.5,
      wheelPxPerZoomLevel: 60,
      minZoom: 2,
      maxZoom: 18,
    }).setView([20, 0], 2);

    mapRef.current = map;

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: "© OpenStreetMap contributors",
    }).addTo(map);

    userLayer.current = L.layerGroup().addTo(map);
    healthLayer.current = L.layerGroup().addTo(map);

    // Search bar
    const geocoder = (L.Control as any).Geocoder.nominatim();
    const control = (L.Control as any).geocoder({
      geocoder,
      defaultMarkGeocode: false,
      placeholder: "Search for a location...",
    })
      .on("markgeocode", function (e: any) {
        const center = e.geocode.center;
        map.flyTo(center, 14, { duration: 2 });

        // Clear previous markers
        userLayer.current?.clearLayers();
        healthLayer.current?.clearLayers();

        // Add a blue marker for searched location
        L.circleMarker(center, {
          color: "#0077ff",
          fillColor: "#0077ff",
          fillOpacity: 0.9,
          radius: 10,
          weight: 2,
        })
          .addTo(userLayer.current!)
          .bindPopup(e.geocode.name)
          .openPopup();

        // Fetch nearby health facilities
        fetchNearbyHealth(center.lat, center.lng);
      })
      .addTo(map);

    // Get user location initially
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const { latitude, longitude } = pos.coords;

          // Add user marker
          L.circleMarker([latitude, longitude], {
            color: "#0077ff",
            fillColor: "#0077ff",
            fillOpacity: 0.9,
            radius: 10,
            weight: 2,
          })
            .addTo(userLayer.current!)
            .bindPopup("You are here")
            .openPopup();

          map.flyTo([latitude, longitude], 14, { duration: 2 });

          fetchNearbyHealth(latitude, longitude);
        },
        (err) => alert("Unable to get your location.")
      );
    }

    return () => map.remove();
  }, []);

  const fetchNearbyHealth = async (lat: number, lng: number) => {
    if (!healthLayer.current) return;

    healthLayer.current.clearLayers();

    const radius = 5000; // 5km
    const query = `
      [out:json][timeout:25];
      node(around:${radius},${lat},${lng})["amenity"~"hospital|clinic|pharmacy"];
      out body;
    `;
    const url = `https://overpass-api.de/api/interpreter?data=${encodeURIComponent(
      query
    )}`;

    try {
      const res = await fetch(url);
      const data = await res.json();

      if (!data.elements) return;

      data.elements.forEach((el: any) => {
        if (!el.lat || !el.lon) return;
        const name = el.tags?.name || "Unnamed";
        const type = el.tags?.amenity || "Unknown";

        L.circleMarker([el.lat, el.lon], {
          color: "#ff4d4f",
          fillColor: "#ff4d4f",
          fillOpacity: 0.9,
          radius: 6,
        })
          .addTo(healthLayer.current!)
          .bindPopup(`<b>${name}</b><br>${type}`)
          .on("mouseover", function () {
            this.openPopup();
          })
          .on("mouseout", function () {
            this.closePopup();
          });
      });
    } catch (err) {
      console.error(err);
      alert("Failed to fetch health facilities.");
    }
  };

  return (
    <div className="relative w-full h-[700px] md:h-[800px] rounded-3xl overflow-hidden shadow-glow border border-border/50">
      <div ref={mapContainer} className="absolute inset-0" />
    </div>
  );
};

export default InteractiveHealthMap;