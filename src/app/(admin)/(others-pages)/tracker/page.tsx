"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import MissingPersonTracker from "@/components/MissingPersonTracker";

export default function TrackerPage() {
  const router = useRouter();
  const { isAuthenticated } = useAuth();

//   useEffect(() => {
//     if (!isAuthenticated) {
//       router.push("/login");
//     }
//   }, [isAuthenticated, router]);

  const [devEUI, setDevEUI] = useState("BF006278FB0E9C00");

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    setDevEUI(searchParams.get("devEUI") || "");
  }, []);
  
  // const eui = "BF006278FB0E9C00"
  // return <MissingPersonTracker devEUI={eui} />;
  return <MissingPersonTracker devEUI={devEUI} />;
}
