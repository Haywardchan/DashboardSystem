"use client";

import { useState, useMemo, useEffect, useRef } from "react";
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
import { fetchNextTarget, performSearch, SearchClient } from "@/hooks/useEvent";
import useDrone from "@/hooks/useDrone";
import { Localization, useLocalization } from "@/hooks/useLocalization";
import { deployMission, getLocalization } from "@/services/userService";
import gatewayFiles, { getJsonValue, drone } from '@/data/json_reader';

interface MissingPersonTrackerProps {
  devEUI: string;
}

export default function MissingPersonTracker({
  devEUI,
}: MissingPersonTrackerProps) {
  const [selectedLocation, setSelectedLocation] = useState<Location | null>(
    null
  );
  const { person, loading, error } = useMissingPerson(devEUI as string);
  const {locations} = useLocation(devEUI as string)
  const [showHeatmap, setShowHeatmap] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date>()
  const [data, setData] = useState()
  const [target, setTarget] = useState()
  const hasRun = useRef(false);
  const [localization, setLocalization] = useState([])
  const client = useRef(new SearchClient())
  const {droneLocation} = useDrone()
  const [missionStatus, setMissionStatus] = useState() 
  // const [latitude, setLatitude] = useState()
  // const [longitude, setLongitude] = useState()

  useEffect(()=>{
    // console.log("jefiejafo")
    if (droneLocation && !hasRun.current){
      console.log("In THE LOOP")
      const dronelat = droneLocation.latitude
      const dronelong = droneLocation.longitude
      fetchdata([parseFloat(dronelat), parseFloat(dronelong)])
      client.connected = true
      hasRun.current = true
    }
  }, [droneLocation])

  // async function fetchTarget(curr: [number, number]){
  //   console.log("Search Target")
  //   const target = await fetchNextTarget({
  //     current_loc: curr,
  //     rssi: -110,
  //     model_version: 'v2',
  //     guide_weight: 2.0
  //   }, client.current)
  //   console.log(JSON.stringify(target))
  //   setTarget(target)
  // }

  // async function fetchdata(curr: [number, number]){
  //   console.log("Init search")
  //   const data = await performSearch({
  //     agent: 'heatmap_greedy',
  //     origin_loc: curr,
  //     start_loc: curr,
  //     grid_size: 250,
  //     num_canvas: 56
  //   }, client.current)
  //   setData(data)
  // }
  async function fetchdata(init_object: string){
    console.log("Init search")
    const data = await performSearch(JSON.parse(init_object), client.current)
    setData(data)
  }

  async function fetchTarget(curr: [number, number], rssi: number){
    console.log("Search Target")
    const target = await fetchNextTarget({
      current_loc: curr,
      rssi: rssi,
      model_version: 'v2',
      guide_weight: 2.0
    }, client.current)
    console.log(JSON.stringify(target))
    setTarget(target)
  }

  // const [isFetching, setIsFetching] = useState(false);
  const targetRef = useRef(target);
  useEffect(() => {
    targetRef.current = target;
  }, [target]);

  const handleButtonClick = async () => {
    // setIsFetching(true);
    if(targetRef.current){
      await fetchTarget(targetRef.current.data.next_target, getJsonValue(targetRef.current.data.demo_data.current_loc_idx, "gw_1"))
      console.log("using target")
    }else{
      await fetchTarget(gatewayFiles.gw1.json.init_object.start_loc, getJsonValue(data.data.demo_data.current_loc_idx, "gw_1"))
    }
    // await fetchTarget(target.data.next_target, getJsonValue(target.data.demo_data.current_loc_idx, "gw_1"))
    setTimeout(() => {}, 3000); // wait for 1 second
    handleButtonClick()
  };

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
                target={target?.data}
                locations={locations}
                onLocationSelect={setSelectedLocation}
              />
            ) : (
              <DynamicMapView
                target={target?.data}
                locations={locations}
                localization={localization.estimated_location}
                onLocationSelect={setSelectedLocation}
              />
            )}
            
          <div className="flex flex-col mt-4">
            {/* <div className="flex justify-around mb-4">
              <input
                type="text"
                placeholder="Latitude"
                className="flex-1 px-auto py-2 border border-gray-300 rounded-md mr-2 z-10"
                onChange={(e) => setLatitude(e.target.value)}
              />
              <input
                type="text"
                placeholder="Longitude"
                className="flex-1 px-auto py-2 border border-gray-300 rounded-md z-10"
                onChange={(e) => setLongitude(e.target.value)}
              />
            </div> */}
            <div className="flex justify-around mb-4">
              <button
                onClick={() => {
                  // fetchdata([parseFloat(latitude), parseFloat(longitude)])
                  fetchdata(JSON.stringify(gatewayFiles.gw1.json.init_object))
                }}
                className="flex-1 px-auto py-2 mr-2 bg-black text-white font-bold rounded hover:bg-gray-700 transition duration-300"
              >
                Initialize Search
              </button>
              <button
                onClick={() => {
                  // fetchTarget([parseFloat(latitude), parseFloat(longitude)])
                  handleButtonClick()
                  // if(target){
                  //   handleButtonClick()
                  //   // fetchTarget(target.data.next_target, getJsonValue(target.data.demo_data.current_loc_idx, "gw_1"))
                  // }else{
                  //   fetchTarget(gatewayFiles.gw1.json.init_object.start_loc, getJsonValue(data.data.demo_data.current_loc_idx, "gw_1"))
                  // }
                  getLocalization({
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
                        "return_image": true
                    }).then((localization) => {
                      setLocalization(localization);
                    }).catch((error) => {
                      console.error("Failed to fetch localization:", error);
                    });
                }}
                className="flex-1 px-auto py-2 bg-black text-white font-bold rounded hover:bg-gray-700 transition duration-300 mr-2"
              >
                Start Search
              </button>
              <button
                onClick={() => {
                  const selectedLocation = drone[Math.floor(Math.random() * drone.length)];
                  deployMission(Number(selectedLocation.droneId), selectedLocation.latitude, selectedLocation.longitude);
                  setMissionStatus(selectedLocation)
                }}
                className="flex-1 px-auto py-2 bg-black text-white font-bold rounded hover:bg-gray-700 transition duration-300 z-10"
              >
                Random Location
              </button>
            </div>
          </div>
          
          {/* <div>groundtruth: {gatewayFiles.gw1.json.gateway_lat},{gatewayFiles.gw1.json.gateway_lon}</div>
          <div>Init Obj:{JSON.stringify(gatewayFiles.gw1.json.init_object)}</div>
          <div>Data: {JSON.stringify(data?.data)}</div>
          <div>Target: {JSON.stringify(target?.data)}</div>
          <div>Drone: {JSON.stringify(droneLocation)}</div>
          <div>Localization: {JSON.stringify(localization)?? "Localization"}</div>
          <div>Drone status: {droneLocation?.status}</div> */}
          {/* <div>Localization: {localization}</div> */}
          {missionStatus ? (
            <p>Drone is flying to {missionStatus?.latitude}, {missionStatus?.longitude}</p>
          ) : null}
          
          </div>
          <div className="lg:col-span-2 space-y-6">
            <PersonInfo devEUI={person.devEUI} />
            {/* <div>
            {target?.data?.heatmap_image && (
              <img
                src={`data:image/png;base64,${target.data.heatmap_image}`}
                alt="Heatmap"
                className="w-full"
              />
            )}
          </div> */}
          <div className="pr-14">
            {localization?.image && (
              <img
                src={`data:image/png;base64,${localization.image}`}
                alt="Heatmap"
                className="w-full pb-20 -z-10 pr-8 pt-[72px]"
                style={{ transform: 'scale(2)' }}
              />
            )}
          </div>
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

