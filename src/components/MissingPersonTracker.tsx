"use client";

import { useState, useMemo } from "react";
import dynamic from "next/dynamic";
import PersonInfo from "./PersonInfo";
import LocationDetails from "./LocationDetails";
import RecentLocations from "./RecentLocations";
import { Location } from "@/types";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { useMissingPerson } from "@/hooks/useMissingPerson";
import { useLocation } from "@/hooks/useLocation";
import { ToggleButton } from "@/components/ui/toggle-button";
import { Map, Flame } from 'lucide-react';
import { DatePicker } from "@/components/ui/date-picker"
import Header from "./Header";
import Drawer from "./Drawer";

interface MissingPersonTrackerProps {
  devEUI: string;
}

export default function MissingPersonTracker({
  devEUI,
}: MissingPersonTrackerProps) {
  const [selectedLocation, setSelectedLocation] = useState<Location | null>(
    null
  );
  const router = useRouter();
  const { username } = useAuth();
  const { person, loading, error } = useMissingPerson(devEUI as string);
  const {locations} = useLocation(devEUI as string)
  const [showHeatmap, setShowHeatmap] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date>()
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  
  const DynamicMapView = useMemo(
    () =>
      dynamic(() => import("./MapView"), {
        loading: () => <p>A map is loading</p>,
        ssr: false,
      }),
    []
  );

  const HeatMapView = useMemo(
    () =>
      dynamic(() => import("./MapViewHeat"), {
        loading: () => <p>A map is loading</p>,
        ssr: false,
      }),
    []
  );

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!person) return <p>No person found.</p>;

  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-8 z-10">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          <div className="lg:col-span-3">
            <div className="flex items-center gap-4 mb-4">
              <div className="flex gap-2">
                <ToggleButton
                  isActive={!showHeatmap}
                  label="Map View"
                  icon={<Map className="w-4 h-4" />}
                  onClick={() => setShowHeatmap(false)}
                />
                <ToggleButton
                  isActive={showHeatmap}
                  label="Heat Map"
                  icon={<Flame className="w-4 h-4" />}
                  onClick={() => setShowHeatmap(true)}
                />
              </div>
              <DatePicker
                date={selectedDate}
                onSelect={setSelectedDate}
              />
            </div>
            {showHeatmap ? (
              <HeatMapView
                locations={locations}
                onLocationSelect={setSelectedLocation}
              />
            ) : (
              <DynamicMapView
                locations={locations}
                onLocationSelect={setSelectedLocation}
              />
            )}
          </div>
          <div className="lg:col-span-2 space-y-6">
            <PersonInfo devEUI={person.devEUI} />
            {selectedLocation && (
              <LocationDetails location={selectedLocation} />
            )}
            <RecentLocations
              locations={locations}
              selectedLocation={selectedLocation}
              onLocationSelect={setSelectedLocation}
            />
          </div>
        </div>
      </main>
    </div>
  );
}
