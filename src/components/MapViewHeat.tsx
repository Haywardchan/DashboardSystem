'use client'

import { useEffect, useRef } from 'react'
import { Card, CardContent } from "@/components/ui/card"
import 'leaflet/dist/leaflet.css'
import 'leaflet-defaulticon-compatibility'
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css'
import L from 'leaflet'
import 'leaflet.heat'
import { MapViewProps } from '@/types'

export default function MapViewHeat({ locations }: MapViewProps) {
  const mapContainer = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!mapContainer.current || !locations.length) return;

    // Initialize map centered on the first location
    const map = L.map(mapContainer.current, { 
      attributionControl: false 
    }).setView([locations[0].latitude, locations[0].longitude], 12);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 18,
      attribution: '© OpenStreetMap contributors'
    }).addTo(map);

    // Find max residence time for normalization
    const maxResidenceTime = Math.max(...locations.map(loc => 
      parseInt(loc.duration || '0')
    ));

    // Convert locations to heatmap data points with normalized intensity
    const heatData = locations.map(loc => {
      const residenceTime = parseInt(loc.duration || '0');
      // Normalize between 0.3 and 1.0 to ensure minimum visibility
      const intensity = residenceTime === 0 ? 0.3 : 
        0.3 + (0.7 * (residenceTime / maxResidenceTime));
      
      return [
        loc.latitude,
        loc.longitude,
        intensity
      ];
    });

    // Add additional points around each location for better heat spread
    locations.forEach(loc => {
      const residenceTime = parseInt(loc.duration || '0');
      const baseIntensity = residenceTime === 0 ? 0.15 : 
        0.15 + (0.15 * (residenceTime / maxResidenceTime));
      
      const radius = 0.005;
      for (let i = 0; i < 8; i++) {
        const angle = (i * Math.PI) / 4;
        heatData.push([
          loc.latitude + radius * Math.cos(angle),
          loc.longitude + radius * Math.sin(angle),
          baseIntensity
        ]);
      }
    });

    // Configure and add heatmap layer
    const heat = (L as any).heatLayer(heatData, {
      radius: 25,
      blur: 15,
      maxZoom: 15,
      max: 1.0,
      gradient: {
        0.3: 'blue',
        0.5: 'lime',
        0.7: 'yellow',
        1.0: 'red'
      }
    }).addTo(map);

    return () => {
      map.remove();
    };
  }, [locations]);

  return (
    <Card>
      <CardContent className="p-0">
        <div
          ref={mapContainer}
          style={{ height: '500px', width: '100%', borderRadius: '1rem', overflow: 'hidden' }}
        />
      </CardContent>
    </Card>
  )
} 