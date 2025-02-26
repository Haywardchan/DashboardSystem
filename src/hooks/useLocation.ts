import { useState, useEffect } from 'react';
import { getLocationsByEui } from '@/services/userService';

interface Location {
  id: number;
  name: string;
  latitude: number;
  longitude: number;
  date?: string;
  duration?: string;
}

export const useLocation = (eui: string) => {
  const [locations, setLocations] = useState<Location[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchLocations = async () => {
      try {
        setLoading(true);
        const data = await getLocationsByEui(eui);
        // Transform the data to match our Location interface
        const transformedLocations = data.map((loc: any, index: number) => ({
          id: index + 1,
          name: loc.name,
          latitude: loc.latitude,
          longitude: loc.longitude,
          // date and duration can be added later as needed
          date: loc.date,
          duration: loc.residence_time
        }));
        setLocations(transformedLocations);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch locations');
      } finally {
        setLoading(false);
      }
    };

    if (eui) {
      fetchLocations();
    }
  }, [eui]);

  return { locations, loading, error };
};
