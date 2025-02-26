import { useEffect, useState } from 'react';
import { getMissingPersonByEui } from '@/services/userService';
import { MissingPerson } from '@/models/MissingPerson';

export const useMissingPerson = (devEUI: string) => {
  const [person, setPerson] = useState<MissingPerson | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPerson = async () => {
      if (devEUI) {
        try {
          const data = await getMissingPersonByEui(devEUI);
          setPerson(data);
        } catch (error) {
          setError((error as Error).message);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchPerson();
  }, [devEUI]);

  return { person, loading, error };
};
