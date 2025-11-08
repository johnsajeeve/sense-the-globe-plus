import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { countries } from '@/data/mockData';

// Country coordinates for markers
const countryCoordinates: Record<string, [number, number]> = {
  JP: [138.2529, 36.2048],
  US: [-95.7129, 37.0902],
  GB: [-3.4360, 55.3781],
  ES: [-3.7492, 40.4637],
  IT: [12.5674, 41.8719],
  TH: [100.9925, 15.8700],
  AU: [133.7751, -25.2744],
  BR: [-51.9253, -14.2350],
  CA: [-106.3468, 56.1304],
  DE: [10.4515, 51.1657],
  MX: [-102.5528, 23.6345],
  AE: [53.8478, 23.4241],
  SG: [103.8198, 1.3521],
  IN: [78.9629, 20.5937],
  FR: [2.2137, 46.2276],
};

const InteractiveWorldMap = () => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const markers = useRef<mapboxgl.Marker[]>([]);
  const navigate = useNavigate();
  const [hoveredCountry, setHoveredCountry] = useState<string | null>(null);

  useEffect(() => {
    if (!mapContainer.current || map.current) return;

    const mapboxToken = import.meta.env.VITE_MAPBOX_PUBLIC_TOKEN;
    if (!mapboxToken) {
      console.error('Mapbox token not found');
      return;
    }

    mapboxgl.accessToken = mapboxToken;

    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/light-v11',
      projection: { name: 'globe' },
      zoom: 1.5,
      center: [20, 20],
      pitch: 0,
    });

    map.current.addControl(
      new mapboxgl.NavigationControl({
        visualizePitch: true,
      }),
      'top-right'
    );

    map.current.scrollZoom.disable();

    map.current.on('style.load', () => {
      map.current?.setFog({
        color: 'rgb(240, 245, 250)',
        'high-color': 'rgb(200, 220, 240)',
        'horizon-blend': 0.1,
      });
    });

    // Add markers for all countries
    Object.entries(countryCoordinates).forEach(([code, coords]) => {
      const countryData = countries[code];
      if (!countryData) return;

      const el = document.createElement('div');
      el.className = 'country-marker';
      el.style.cssText = `
        background: linear-gradient(135deg, hsl(195 85% 55%), hsl(195 85% 65%));
        width: 32px;
        height: 32px;
        border-radius: 50%;
        cursor: pointer;
        border: 3px solid white;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
        transition: all 0.3s ease;
        display: flex;
        align-items: center;
        justify-content: center;
        font-weight: bold;
        color: white;
        font-size: 11px;
      `;
      el.textContent = code;

      el.addEventListener('mouseenter', () => {
        setHoveredCountry(code);
        el.style.transform = 'scale(1.3)';
        el.style.boxShadow = '0 8px 24px rgba(26, 144, 255, 0.5)';
        el.style.zIndex = '1000';
      });

      el.addEventListener('mouseleave', () => {
        setHoveredCountry(null);
        el.style.transform = 'scale(1)';
        el.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.2)';
        el.style.zIndex = '1';
      });

      el.addEventListener('click', () => {
        navigate(`/destination/${code}`);
      });

      const marker = new mapboxgl.Marker(el)
        .setLngLat(coords)
        .addTo(map.current!);

      markers.current.push(marker);
    });

    // Gentle rotation animation
    const secondsPerRevolution = 180;
    const maxSpinZoom = 4;
    let userInteracting = false;
    let spinEnabled = true;

    function spinGlobe() {
      if (!map.current || !spinEnabled || userInteracting) return;
      
      const zoom = map.current.getZoom();
      if (zoom < maxSpinZoom) {
        const distancePerSecond = 360 / secondsPerRevolution;
        const center = map.current.getCenter();
        center.lng -= distancePerSecond;
        map.current.easeTo({ center, duration: 1000, easing: (n) => n });
      }
    }

    map.current.on('mousedown', () => { userInteracting = true; });
    map.current.on('dragstart', () => { userInteracting = true; });
    map.current.on('mouseup', () => { userInteracting = false; spinGlobe(); });
    map.current.on('touchend', () => { userInteracting = false; spinGlobe(); });
    map.current.on('moveend', () => { spinGlobe(); });

    spinGlobe();

    return () => {
      markers.current.forEach(marker => marker.remove());
      markers.current = [];
      map.current?.remove();
      map.current = null;
    };
  }, [navigate]);

  return (
    <div className="relative w-full h-[600px] rounded-2xl overflow-hidden shadow-elegant">
      <div ref={mapContainer} className="absolute inset-0" />
      
      {/* Overlay gradient */}
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-transparent via-transparent to-background/20 rounded-2xl" />
      
      {/* Hover info card */}
      {hoveredCountry && countries[hoveredCountry] && (
        <div className="absolute bottom-6 left-6 bg-card/95 backdrop-blur-md border border-border rounded-xl p-4 shadow-glow pointer-events-none animate-fade-in">
          <h3 className="font-bold text-lg mb-1 text-card-foreground">
            🌍 {countries[hoveredCountry].name}
          </h3>
          <p className="text-sm text-muted-foreground">
            Click to explore destination details
          </p>
        </div>
      )}

      {/* Map legend */}
      <div className="absolute top-6 left-6 bg-card/95 backdrop-blur-md border border-border rounded-xl p-4 shadow-elegant">
        <h3 className="font-semibold text-sm mb-2 text-card-foreground">
          🌍 {Object.keys(countryCoordinates).length} Destinations Available
        </h3>
        <p className="text-xs text-muted-foreground">
          Click any marker to explore
        </p>
      </div>
    </div>
  );
};

export default InteractiveWorldMap;
