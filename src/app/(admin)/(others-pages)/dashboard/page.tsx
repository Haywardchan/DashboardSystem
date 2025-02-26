"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { useMissingPersons } from "@/hooks/useMissingPersons";
import MissingPersonCard from "@/components/MissingPersonCard";
import Drawer from "@/components/Drawer";
import Header from "@/components/Header";

export default function DashboardPage() {
  const router = useRouter();
  const { isAuthenticated } = useAuth();
  const { missingPersons, loading, error } = useMissingPersons();
  const { username } = useAuth();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-4">
          {missingPersons.map((person) => (
            <MissingPersonCard
              key={person._id}
              person={person}
              onClick={() => router.push(`/tracker?devEUI=${person.devEUI}`)}
            />
          ))}
        </div>
      </main>
    </div>
  );
}
