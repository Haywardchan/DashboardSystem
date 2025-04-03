//{
//     "droneId": "001",
//     "latitude": "22.0",
//     "longitude": "114.0"
// }
import { getDrone } from '@/services/userService';
import { useState, useEffect } from 'react';

export interface DroneLocation {
  droneid: number;
  latitude: number;
  longitude: number;
}

const useDrone = (pollInterval: number = 50000) => {
  const [droneLocation, setDroneLocation] = useState<DroneLocation | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const abortController = new AbortController();
    
    const fetchDroneData = async () => {
      try {
        const data = await getDrone()
            setDroneLocation(data);
            setError(null);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to fetch locations');
        } finally {
            setIsLoading(false);
        }
    };

    // Initial fetch
    fetchDroneData();
    
    // Set up polling if needed
    const intervalId = setInterval(fetchDroneData, pollInterval);
    
    // Cleanup function
    return () => {
      abortController.abort();
      clearInterval(intervalId);
    };
  }, [pollInterval]);

  return { droneLocation, isLoading, error };
};

export default useDrone;