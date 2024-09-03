"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";

type Coordinates = {
  latitude: number;
  longitude: number;
};

type GeolocationProps = {
  onCoordinatesChange: (coords: Coordinates | null) => void;
};

export default function Geolocation({ onCoordinatesChange }: GeolocationProps) {
  const [currentPosition, setCurrentPosition] = useState<Coordinates | null>(
    null
  );
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getUserLocation();
  }, []);

  const getUserLocation = () => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const coords = {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          };
          setCurrentPosition(coords);
          onCoordinatesChange(coords);
          setError(null);
        },
        (err) => {
          console.error("Geolocation error:", err);
          let errorMessage = "Unable to get your location. ";
          if (err.code === 1) {
            errorMessage +=
              "Please enable location services in your browser settings.";
          } else if (err.code === 2) {
            errorMessage +=
              "Position is unavailable. Please try again or use manual input.";
          } else if (err.code === 3) {
            errorMessage +=
              "Location request timed out. Please try again or use manual input.";
          }
          setError(errorMessage);
        },
        { timeout: 10000, maximumAge: 60000, enableHighAccuracy: true }
      );
    } else {
      setError(
        "Geolocation is not supported by your browser. Please use manual input."
      );
    }
  };

  return (
    <div className="space-y-4">
      {error && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <Card>
        <CardHeader>
          <CardTitle>Current Position</CardTitle>
        </CardHeader>
        <CardContent>
          {currentPosition ? (
            <p>
              Latitude: {currentPosition.latitude.toFixed(6)}, Longitude:{" "}
              {currentPosition.longitude.toFixed(6)}
            </p>
          ) : (
            <p>No position available</p>
          )}
          <Button onClick={getUserLocation} className="mt-2">
            {currentPosition ? "Update My Location" : "Get My Location"}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
