'use client'

import { useEffect, useRef, useState } from 'react'
import { Card, CardContent } from "@/components/ui/card"
import 'leaflet/dist/leaflet.css'
import L from 'leaflet'
import { MapViewProps } from '@/types'
import useDrone from '@/hooks/useDrone'
import { useLocalization } from '@/hooks/useLocalization'
import gatewayFiles, { getJsonValue } from '@/data/json_reader';

export default function MapView({target, locations, localization, onLocationSelect }: MapViewProps) {
  const mapContainer = useRef<HTMLDivElement | null>(null);
  const [map, setMap] = useState<L.Map | null>(null);
  const {droneLocation} = useDrone()

  useEffect(() => {
    // Initialize the map
    const mapInstance = L.map(mapContainer.current!, { attributionControl: false }).setView([droneLocation?.latitude ?? locations[0].latitude, droneLocation?.longitude ?? locations[0].longitude], 12);
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
        if (layer instanceof L.Marker || layer instanceof L.CircleMarker) {
          map.removeLayer(layer);
        }
      });

      // Add new markers as blue circles
      locations.forEach((location) => {
        const circleMarker = L.circleMarker([location.latitude, location.longitude], {
          radius: 8,
          fillColor: '#2196F3',
          color: '#1976D2',
          weight: 2,
          opacity: 1,
          fillOpacity: 0.6
        }).addTo(map);
        
        circleMarker.on('click', () => {
          // Create a popup that stays longer
          const popup = L.popup({
            closeButton: true,
            autoClose: false,
            closeOnClick: false
          }).setLatLng([location.latitude, location.longitude])
          .setContent(location.name)
          .openOn(map);
          setTimeout(() => {
            popup.close();
          }, 3000); // Close the popup after 3 seconds
        });
      });

      const truthMarker = L.circleMarker([gatewayFiles.gw1.json.gateway_lat, gatewayFiles.gw1.json.gateway_lon], {
        radius: 8,
        fillColor: '#FFFF00', // Yellow color
        color: '#FFFF00',
        weight: 2,
        opacity: 1,
        fillOpacity: 0.6
      }).addTo(map);

      truthMarker.bindPopup("Ground Truth");

      const startpos = L.circleMarker(gatewayFiles.gw1.json.init_object.start_loc, {
        radius: 8,
        fillColor: '#FF0000', // Red color
        color: '#FF0000',
        weight: 2,
        opacity: 1,
        fillOpacity: 0.6
      }).addTo(map);

      startpos.bindPopup("Starting Position");

      // Show target with a different styled circle
      if(target){
        // const droneIcon = L.icon({
        //   iconUrl: 'images/icons/drone.png',
        //   iconSize: [64, 64], // size in pixels
        //   iconAnchor: [16, 16] // center point
        // });

        // // Create marker
        // L.marker(target.next_target, {
        //   icon: droneIcon
        // }).addTo(map)
        L.circleMarker(target.next_target, {
          radius: 8,
          fillColor: '#008000', // Green color
          color: '#008000',
          weight: 2,
          opacity: 1,
          fillOpacity: 0.6
        }).addTo(map);
      }

      // Show drone location with a different styled circle
      if (droneLocation){
        const droneIcon = L.icon({
          iconUrl: "https://cdn-icons-png.flaticon.com/512/6221/6221857.png",
          iconSize: [32, 32], // size in pixels
          iconAnchor: [16, 16] // center point
        });

        // Create marker
        const drone = L.marker([droneLocation.latitude, droneLocation.longitude], {
          icon: droneIcon
        }).addTo(map)
        const location_latlong = `${droneLocation.latitude}, ${droneLocation.longitude}`
        // drone.bindPopup(location_latlong)
        drone.on('click', () => {
          // Create a popup that stays longer
          const popup = L.popup({
            closeButton: true,
            autoClose: false,
            closeOnClick: false
          }).setLatLng([droneLocation.latitude, droneLocation.longitude])
          .setContent(location_latlong)
          .openOn(map);
          setTimeout(() => {
            popup.close();
          }, 3000); // Close the popup after 3 seconds
        });
      }

      if (localization){
        // Create custom icon
        const droneIcon = L.icon({
          // iconUrl: 'images/icons/drone.png',
          iconUrl: "https://cdn-icons-png.flaticon.com/512/2450/2450825.png",
          iconSize: [32, 32], // size in pixels
          iconAnchor: [16, 16] // center point
        });

        // Create marker
        L.marker(localization, {
          icon: droneIcon
        }).addTo(map)
      }
    }
  }, [locations, map, onLocationSelect, droneLocation, localization, target]);

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