"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";

type Coordinates = {
  latitude: number;
  longitude: number;
};

type LocationSearchProps = {
  onCoordinatesChange: (coords: Coordinates | null) => void;
};

export default function LocationSearch({
  onCoordinatesChange,
}: LocationSearchProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResult, setSearchResult] = useState<Coordinates | null>(null);
  const [error, setError] = useState<string | null>(null);

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
    </div>
  );
}
