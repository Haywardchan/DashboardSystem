'use client'

import { useEffect, useRef, useState } from 'react'
import { Card, CardContent } from "@/components/ui/card"
import 'leaflet/dist/leaflet.css'
import 'leaflet-defaulticon-compatibility'
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css'
import L from 'leaflet'
import { MapViewProps } from '@/types'

export default function MapView({ locations, onLocationSelect }: MapViewProps) {
  const mapContainer = useRef<HTMLDivElement | null>(null);
  const [map, setMap] = useState<L.Map | null>(null);

  useEffect(() => {
    // Initialize the map
    const mapInstance = L.map(mapContainer.current!, { attributionControl: false }).setView([locations[0].latitude, locations[0].longitude], 12);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 18,
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(mapInstance);

    // Store the map instance
    setMap(mapInstance);

    // Cleanup function to remove the map instance
    return () => {
      if (mapInstance) {
        mapInstance.off(); // Remove all event listeners
        mapInstance.remove(); // Remove the map instance
      }
    };
  }, []);

  useEffect(() => {
    if (map) {
      // Clear existing markers if needed
      map.eachLayer((layer) => {
        if (layer instanceof L.Marker) {
          map.removeLayer(layer);
        }
      });

      // Add new markers
      locations.forEach((location) => {
        const marker = L.marker([location.latitude, location.longitude]).addTo(map);
        marker.on('click', () => onLocationSelect(location));
        marker.bindPopup(location.name);
      });
    }
  }, [locations, map, onLocationSelect]);

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