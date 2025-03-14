"use client";

import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { useMissingPersons } from "@/hooks/useMissingPersons";
import MissingPersonCard from "@/components/MissingPersonCard";
import ComponentCard from "@/components/common/ComponentCard";
import LoRaTagTable from "@/components/tables/Tags";

export default function DashboardPage() {
  const router = useRouter();
  const { isAuthenticated } = useAuth();
  const { missingPersons, loading, error } = useMissingPersons();
  const { username } = useAuth();

  // useEffect(() => {
  //   if (!isAuthenticated) {
  //     router.push("/login");
  //   }
  // }, [isAuthenticated, router]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  if (missingPersons.length === 0) return <p>No missing persons found.</p>;

  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-grow container px-4 sm:px-6 lg:px-4 py-8 mx-auto">
        <ComponentCard title="LoRa Tags">
          <LoRaTagTable />
        </ComponentCard>
      </main>
    </div>
  );
}
