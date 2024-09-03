"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";

type Coordinates = {
  latitude: number;
  longitude: number;
};

type GeolocationClientProps = {
  onCoordinatesChange: (coords: Coordinates | null) => void;
};

export default function GeolocationClient({
  onCoordinatesChange,
}: GeolocationClientProps) {
  const [currentPosition, setCurrentPosition] = useState<Coordinates | null>(
    null
  );
  const [manualLat, setManualLat] = useState("");
  const [manualLon, setManualLon] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResult, setSearchResult] = useState<Coordinates | null>(null);
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

  const handleManualSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const lat = parseFloat(manualLat);
    const lon = parseFloat(manualLon);
    if (
      isNaN(lat) ||
      isNaN(lon) ||
      lat < -90 ||
      lat > 90 ||
      lon < -180 ||
      lon > 180
    ) {
      setError(
        "Please enter valid latitude (-90 to 90) and longitude (-180 to 180)"
      );
      return;
    }
    const coords = { latitude: lat, longitude: lon };
    setCurrentPosition(coords);
    onCoordinatesChange(coords);
    setError(null);
  };

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
          searchQuery
        )}`
      );
      const data = await response.json();
      if (data && data.length > 0) {
        const coords = {
          latitude: parseFloat(data[0].lat),
          longitude: parseFloat(data[0].lon),
        };
        setSearchResult(coords);
        onCoordinatesChange(coords);
        setError(null);
      } else {
        setError("Location not found. Please try a different search term.");
        setSearchResult(null);
        onCoordinatesChange(null);
      }
    } catch (err) {
      setError("Error searching for location. Please try again later.");
      setSearchResult(null);
      onCoordinatesChange(null);
    }
  };

  return (
    <div className=" grid gap-4 md:grid-cols-3 p-8">
      {error && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <Card className="">
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

      <Card className="">
        <CardHeader>
          <CardTitle>Search Location</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSearch} className="space-y-2">
            <Input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Enter city name or address"
              required
            />
            <Button type="submit">Search</Button>
          </form>
          {searchResult && (
            <p className="mt-2">
              Latitude: {searchResult.latitude.toFixed(6)}, Longitude:{" "}
              {searchResult.longitude.toFixed(6)}
            </p>
          )}
        </CardContent>
      </Card>

      <Card className="">
        <CardHeader>
          <CardTitle>Manual Coordinates</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleManualSubmit} className="space-y-2">
            <Input
              type="number"
              value={manualLat}
              onChange={(e) => setManualLat(e.target.value)}
              placeholder="Latitude (-90 to 90)"
              required
              min="-90"
              max="90"
              step="any"
            />
            <Input
              type="number"
              value={manualLon}
              onChange={(e) => setManualLon(e.target.value)}
              placeholder="Longitude (-180 to 180)"
              required
              min="-180"
              max="180"
              step="any"
            />
            <Button type="submit">Set Location</Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
