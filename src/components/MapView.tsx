'use client'

import { useEffect, useRef, useState } from 'react'
import { Card, CardContent } from "@/components/ui/card"
import 'leaflet/dist/leaflet.css'
import 'leaflet-defaulticon-compatibility'
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css'
import L from 'leaflet'
import { MapViewProps } from '@/types'
import useDrone from '@/hooks/useDrone'
import { useLocalization } from '@/hooks/useLocalization'

export default function MapView({target, locations, onLocationSelect }: MapViewProps) {
  const mapContainer = useRef<HTMLDivElement | null>(null);
  const [map, setMap] = useState<L.Map | null>(null);
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
    // Initialize the map
    // const mapInstance = L.map(mapContainer.current!, { attributionControl: false }).setView([locations[0].latitude, locations[0].longitude], 12);
    // const mapInstance = L.map(mapContainer.current!, { attributionControl: false }).setView(target?.next_target, 12);
    // const mapInstance = L.map(mapContainer.current!, { attributionControl: false }).setView([22.08116760485257, 37.422], 12);
    const mapInstance = L.map(mapContainer.current!, { attributionControl: false }).setView([droneLocation?.latitude ?? locations[0].latitude, droneLocation?.longitude ?? locations[0].longitude], 12);
    //22.08116760485257,37.422
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

      // Show target
      if(target){
        // const lat = target.next_target[0];
        // const lng = target.next_target[1]; 
        // const sizeOffset = 0.0002;
        // const imageBounds = [
        //   [lat - sizeOffset, lng - sizeOffset], // SW corner
        //   [lat + sizeOffset, lng + sizeOffset]  // NE corner
        // ];
        // // Create drone image overlay
        // const droneIcon = L.imageOverlay('icons/drone.png', imageBounds, {
        //   opacity: 0.9,
        //   interactive: true,
        //   className: 'drone-overlay'
        // }).addTo(map);

        // // Add click handler
        // droneIcon.on('click', () => onLocationSelect(target));

        //alternative approach
        const droneIcon = L.icon({
          iconUrl: 'images/icons/drone.png',
          // iconUrl: "https://cdn-icons-png.flaticon.com/512/6221/6221857.png",
          iconSize: [64, 64], // size in pixels
          iconAnchor: [16, 16] // center point
        });

        // Create marker
        L.marker(target.next_target, {
          icon: droneIcon
        }).addTo(map)
        
      }
    }
      if (droneLocation){
        // Create custom icon
        const droneIcon = L.icon({
          // iconUrl: 'images/icons/drone.png',
          iconUrl: "https://cdn-icons-png.flaticon.com/512/6221/6221857.png",
          iconSize: [32, 32], // size in pixels
          iconAnchor: [16, 16] // center point
        });

        // Create marker
        L.marker([droneLocation.latitude, droneLocation.longitude], {
          icon: droneIcon
        }).addTo(map)
      }

      if (localization.estimated_location){
        // Create custom icon
        const droneIcon = L.icon({
          // iconUrl: 'images/icons/drone.png',
          iconUrl: "https://cdn-icons-png.flaticon.com/512/2450/2450825.png",
          iconSize: [32, 32], // size in pixels
          iconAnchor: [16, 16] // center point
        });

        // Create marker
        L.marker(localization.estimated_location, {
          icon: droneIcon
        }).addTo(map)
      }

  }, [locations, map, onLocationSelect, droneLocation, localization]);

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