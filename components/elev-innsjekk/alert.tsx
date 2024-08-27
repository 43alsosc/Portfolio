"use client";

import { useState, useEffect } from "react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { createClient } from "@/utils/supabase/client";
import moment from "moment-timezone";

interface UserData {
  name: string;
  checked_in_at: string | null;
}

const supabase = createClient();

export default function AlertBox() {
  // Tilstand variabler
  const [usersData, setUsersData] = useState<UserData[]>([]);
  const [isVisible, setIsVisible] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Hent data fra databasen
  const fetchData = async () => {
    try {
      // Henter data fra databasen med en GET request fra /api/getNotCheckedInUsers/route.ts
      const response = await fetch("/api/getNotCheckedInUsers");

      // Hvis responsen ikke har data, kast en feilmelding
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      // Hent data fra responsen og putt det i data variabel
      const data = await response.json();

      // Hvis data er en array og har data. Sett data i userData og sett isVisible til true
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
        // Hvis data ikke er en array og ikke har data. Sett userData til en tom array og set isVisible til false
      } else {
        setUsersData([]);
        setIsVisible(false);
      }
      // Hvis det kommer en error, log den i konsollen og sett error til feilmeldingen
    } catch (error) {
      console.error("Error fetching data:", error);
      setError((error as Error).message);
    }
  };

  // Hent data fra databasen og sett opp en kanal for å lytte på endringer
  useEffect(() => {
    // Hent data fra databasen med hjelp av fetchData funksjonen
    fetchData();

    // Sett opp en kanal for å lytte på endringer i databasen
    const channel = supabase
      .channel("custom-all-channel")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "elev_table" },
        (payload) => {
          fetchData(); // Hent data på nytt hvis det skjer en endring i databasen
        }
      )
      .subscribe();

    return () => {
      // Avslutt kanalen når komponenten blir fjernet
      supabase.removeChannel(channel);
    };
  }, []);

  // Sett opp et intervall for å hente data fra databasen per minutt
  useEffect(() => {
    // Sett opp et intervall for å hente data fra databasen per minutt
    const intervalId = setInterval(fetchData, 60000);

    // Fjern intervallet når komponenten blir fjernet
    return () => clearInterval(intervalId);
  }, []);

  // Hvis det kommer en error, vis en feilmelding i Alert komponenten
  if (error) {
    return (
      <Alert variant="destructive">
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>{error}</AlertDescription>
      </Alert>
    );
  }

  // Hvis det er noen brukere som ikke har sjekket inn på 30 min, returner en Alert komponent
  // Hvis det er brukere som har sjekket inn på 30 min, returner ingenting
  return (
    <div className="space-y-4">
      {/* Kartlegg data fra usersData og putt det inn i userData */}
      {usersData.map((userData, index) => (
        <div
          // Sett opp en Alert komponent med data fra userData og sett opp en animasjon for å vise Alert komponenten
          key={index}
          className={`transition-all duration-500 ease-in-out ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4"
          }`}
          style={{ transitionDelay: `${index * 100}ms` }}
        >
          <Alert variant="destructive">
            <AlertTitle>Manglende innsjekking</AlertTitle>
            <AlertDescription>
              {/* Putt inn data i beskrivelsen fra userData */}
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
