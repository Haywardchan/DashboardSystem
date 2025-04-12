'use client'

import { useEffect, useRef, useState } from 'react'
import { Card, CardContent } from "@/components/ui/card"
import 'leaflet/dist/leaflet.css'
import 'leaflet-defaulticon-compatibility'
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css'
import L from 'leaflet'
import 'leaflet.heat'
import { MapViewProps } from '@/types'
import useDrone from '@/hooks/useDrone'
import { useLocalization } from '@/hooks/useLocalization'

export default function MapViewHeat({target, locations }: MapViewProps) {
  const mapContainer = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<L.Map | null>(null);
  const {droneLocation} = useDrone()
  const {localization} = useLocalization({
    "gateway": [
        [
            22.336954387741777,
            114.26290529958185,
            -90,
            9
        ],
        [
            22.33845287278898,
            114.26281946889816,
            -95,
            9
        ],
        [
            22.33758705182435,
            114.26299069610249,
            -105,
            10
        ]
    ],
    "return_image": false
})

  useEffect(() => {
    if (!mapContainer.current || !locations.length) return;

    // Initialize map if it doesn't exist
    if (!mapRef.current) {
      mapRef.current = L.map(mapContainer.current, { 
        attributionControl: false 
      }).setView([locations[0].latitude, locations[0].longitude], 12);

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 18,
        attribution: '© OpenStreetMap contributors'
      }).addTo(mapRef.current);
    }

    const map = mapRef.current;

    // Clear existing layers
    map.eachLayer((layer) => {
      if (!(layer instanceof L.TileLayer)) {
        map.removeLayer(layer);
      }
    });

    // Find max residence time for normalization
    const maxResidenceTime = Math.max(...locations.map(loc => 
      parseInt(loc.duration || '0')
    ));

    // Convert locations to heatmap data points with normalized intensity
    const heatData = locations.map(loc => {
      const residenceTime = parseInt(loc.duration || '0');
      const zoomLevel = map.getZoom();
      const intensity = residenceTime === 0 ? 0.3 : 
        (0.3 + (0.7 * (residenceTime / maxResidenceTime))) / (zoomLevel/10);
      
      return [
        loc.latitude,
        loc.longitude,
        intensity
      ];
    });

    // Add additional points around each location for better heat spread
    locations.forEach(loc => {
      const residenceTime = parseInt(loc.duration || '0');
      const zoomLevel = map.getZoom();
      const baseIntensity = residenceTime === 0 ? 0.15 : 
        (0.15 + (0.15 * (residenceTime / maxResidenceTime))) / (zoomLevel/10);
      
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

    // Add target marker if exists
    if (target) {
      L.circleMarker(target.next_target, {
        radius: 12,
        fillColor: '#4CAF50',
        color: '#388E3C',
        weight: 2,
        opacity: 1,
        fillOpacity: 0.6
      }).addTo(map);
    }

    // Add drone location marker if exists
    if (droneLocation) {
      L.circleMarker([droneLocation.latitude, droneLocation.longitude], {
        radius: 10,
        fillColor: '#FF5722',
        color: '#E64A19',
        weight: 2,
        opacity: 1,
        fillOpacity: 0.6
      }).addTo(map);
    }

    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, [locations, target, droneLocation]);

  return (
    <Card>
      <CardContent className="p-0">
        <div
          ref={mapContainer}
          style={{ height: '500px', width: '100%', borderRadius: '1rem', overflow: 'hidden' }}
        />
      </CardContent>
    </Card>
  );
} 