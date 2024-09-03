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

type ManualCoordinatesProps = {
  onCoordinatesChange: (coords: Coordinates | null) => void;
};

export default function ManualCoordinates({
  onCoordinatesChange,
}: ManualCoordinatesProps) {
  const [manualLat, setManualLat] = useState("");
  const [manualLon, setManualLon] = useState("");
  const [error, setError] = useState<string | null>(null);

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
    onCoordinatesChange(coords);
    setError(null);
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
