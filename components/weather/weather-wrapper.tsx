"use client";

import { useState, useEffect } from "react";
import GeolocationClient from "@/components/weather/geolocation-client";
import WeatherContent from "./weather-component";

type Coordinates = {
  latitude: number;
  longitude: number;
};

export default function WeatherWrapper() {
  const [coordinates, setCoordinates] = useState<Coordinates | null>(null);
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (coordinates) {
      fetchWeatherData(coordinates);
    }
  }, [coordinates]);

  const fetchWeatherData = async (coords: Coordinates) => {
    try {
      const response = await fetch(
        `/api/weather?lat=${coords.latitude}&lon=${coords.longitude}`
      );
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setWeatherData(data);
      setError(null);
    } catch (e) {
      setError("Failed to fetch weather data");
      console.error("Error:", e);
    }
  };

  return (
    <div className=" md:flex-row w-screen h-screen gap-x-96">
      <GeolocationClient onCoordinatesChange={setCoordinates} />
      <WeatherContent weatherData={weatherData} error={error} />
    </div>
  );
}
