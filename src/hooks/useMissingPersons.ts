import { useEffect, useState } from 'react';
import { getAllMissingPersons } from '@/services/userService';
import { MissingPerson } from '@/models/MissingPerson';

export const useMissingPersons = () => {
  const [missingPersons, setMissingPersons] = useState<MissingPerson[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMissingPersons = async () => {
      try {
        const data = await getAllMissingPersons();
        setMissingPersons(data);
      } catch (error) {
        setError((error as Error).message);
      } finally {
        setLoading(false);
      }
    };

    fetchMissingPersons();
  }, []);

  return { missingPersons, loading, error };
}; 