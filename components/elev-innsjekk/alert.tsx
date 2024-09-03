"use client";

import { useState, useEffect } from "react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { createClient } from "@/utils/supabase/client";
import moment from "moment-timezone";

interface UserData {
  name: string;
  checked_in_at: string | null;
}

interface AlertBoxProps {
  groupId: string;
}

const supabase = createClient();

export default function AlertBox({ groupId }: AlertBoxProps) {
  const [usersData, setUsersData] = useState<UserData[]>([]);
  const [isVisible, setIsVisible] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    try {
      const response = await fetch(
        `/api/getNotCheckedInUsers?groupId=${groupId}`
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      if (Array.isArray(data) && data.length > 0) {
        setUsersData(
          data.map((user) => ({
            name: user.name,
            checked_in_at: user.checked_in_at
              ? moment(user.checked_in_at).subtract(2, "hours").format("HH:mm")
              : null,
          }))
        );
        setIsVisible(true);
      } else {
        setUsersData([]);
        setIsVisible(false);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      setError((error as Error).message);
    }
  };

  useEffect(() => {
    fetchData();

    const channel = supabase
      .channel("custom-all-channel")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "elev_table" },
        (payload) => {
          fetchData();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [groupId]);

  useEffect(() => {
    const intervalId = setInterval(fetchData, 60000);

    return () => clearInterval(intervalId);
  }, [groupId]);

  if (error) {
    return (
      <Alert variant="destructive">
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>{error}</AlertDescription>
      </Alert>
    );
  }

  return (
    <div className="space-y-4">
      {usersData.map((userData, index) => (
        <div
          key={index}
          className={`transition-all duration-500 ease-in-out ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4"
          }`}
          style={{ transitionDelay: `${index * 100}ms` }}
        >
          <Alert variant="destructive">
            <AlertTitle>Manglende innsjekking</AlertTitle>
            <AlertDescription>
              {userData.name} har ikke sjekket inn på over 30 minutter
              {userData.checked_in_at &&
                `, sist sjekket ut kl ${userData.checked_in_at}`}
            </AlertDescription>
          </Alert>
        </div>
      ))}
    </div>
  );
}
