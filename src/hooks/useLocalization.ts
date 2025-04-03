import { getLocalization } from '@/services/userService';
import { useState, useEffect } from 'react';
// Lycia part integration to get next location
export interface Localization {
  estimated_location: number[];
  image: string;
}

export const useLocalization = (gatewayData: any) => {
  const [localization, setLocations] = useState<Localization[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchLocations = async () => {
      try {
        setLoading(true);
        const data = await getLocalization(gatewayData);
        setLocations(data);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch locations');
      } finally {
        setLoading(false);
      }
    };

    if (gatewayData) {
      fetchLocations();
    }
  }, [gatewayData]);

  return { localization, loading, error };
};
