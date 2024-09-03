"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

interface CheckInBoxProps {
  id: string;
  name: string;
  username: string;
  initialStatus: "checked_in" | "not_checked_in";
}

export default function CheckInBox({
  id,
  name,
  username,
  initialStatus,
}: CheckInBoxProps) {
  const [status, setStatus] = useState(initialStatus);
  const router = useRouter();

  const handleClick = async () => {
    // Slå på eller av sjekk-in status
    const newStatus = status === "checked_in" ? "not_checked_in" : "checked_in";

    try {
      // Send en POST request til serveren for å oppdatere status
      const response = await fetch("/api/updateCheckInStatus", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id, status: newStatus }),
      });

      if (response.ok) {
        setStatus(newStatus);
        router.refresh(); // Refresh the page to update server-side data
      } else {
        console.error("Failed to update status");
      }
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  return (
    <div
      onClick={handleClick}
      className={`p-4 justify-center align-middle cursor-pointer transition-colors ${
        status === "checked_in" ? "bg-[#f08920]" : "bg-red-500"
      }`}
    >
      <h2 className="leading-tight tracking-tight">{name}</h2>
      <p className="leading-tight tracking-tight">{username}</p>
    </div>
  );
}
