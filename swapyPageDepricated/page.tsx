"use client";

import { createSwapy } from "swapy";
import React, { useEffect, useState, useCallback, useRef } from "react";
import CurrentWeather from "@/components/weather/CurrentWeather";
import Forecast from "@/components/weather/Forecast";
import Geolocation from "@/components/weather/Geolocation";
import ManualCoordinates from "@/components/weather/ManualCooridates";
import LocationSearch from "@/components/weather/SearchLocation";
import dynamic from "next/dynamic";

// Swapy setup
const DEFAULT = {
  "1": "a",
  "2": "b",
  "3": "c",
  "4": null,
};

// My Code
type Coordinates = {
  latitude: number;
  longitude: number;
};

function WeatherPage() {
  // Swapy setup
  const slotItems: Record<string, "a" | "b" | "c" | null> =
    typeof window !== "undefined" && localStorage.getItem("slotItem")
      ? JSON.parse(localStorage.getItem("slotItem")!)
      : DEFAULT;
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (containerRef.current) {
      const swapy = createSwapy(containerRef.current);
      swapy.onSwap(({ data }) => {
        localStorage.setItem("slotItem", JSON.stringify(data.object));
      });
    }
  }, []);

  // My code
  const [coordinates, setCoordinates] = useState<Coordinates | null>(null);
  const [weatherData, setWeatherData] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const fetchWeatherData = useCallback(async (coords: Coordinates) => {
    setIsLoading(true);
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
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    const getInitialLocation = () => {
      if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const coords = {
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
            };
            setCoordinates(coords);
          },
          (err) => {
            console.error("Geolocation error:", err);
            setError("Unable to get your location. Please enter it manually.");
            setIsLoading(false);
          }
        );
      } else {
        setError("Geolocation is not supported by your browser.");
        setIsLoading(false);
      }
    };

    getInitialLocation();
  }, []);

  useEffect(() => {
    if (coordinates) {
      fetchWeatherData(coordinates);
    }
  }, [coordinates, fetchWeatherData]);

  const handleCoordinatesChange = useCallback((coords: Coordinates | null) => {
    setCoordinates(coords);
  }, []);

  // Swapy code with my components inside that need to have access to the weather data
  function getItemById(itemId: "a" | "b" | "c" | null) {
    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;
    if (!weatherData) return null;

    const currentWeather =
      weatherData.properties.timeseries[0].data.instant.details;
    const symbol_code =
      weatherData.properties.timeseries[0].data.next_1_hours.summary
        .symbol_code;
    const symbol_code_6 =
      weatherData.properties.timeseries[0].data.next_6_hours.summary
        .symbol_code;
    const symbol_code_12 =
      weatherData.properties.timeseries[0].data.next_12_hours.summary
        .symbol_code;

    switch (itemId) {
      case "a":
        return (
          <CurrentWeather
            currentWeather={currentWeather}
            symbol_code={symbol_code}
          />
        );
      case "b":
        return (
          <Forecast
            symbol_code={symbol_code}
            symbol_code_6={symbol_code_6}
            symbol_code_12={symbol_code_12}
          />
        );
      case "c":
        return <LocationSearch onCoordinatesChange={handleCoordinatesChange} />;
      case null:
        return (
          <div>
            <ManualCoordinates onCoordinatesChange={handleCoordinatesChange} />
            <Geolocation onCoordinatesChange={handleCoordinatesChange} />;
          </div>
        );
    }
  }

  return (
    // Swapy slots
    <div className="container" ref={containerRef}>
      <div className="slot a" data-swapy-slot="1">
        <div className="item a" data-swapy-item="a">
          {getItemById(slotItems["1"])}
        </div>
      </div>
      <div className="slot b" data-swapy-slot="2">
        <div className="item b" data-swapy-item="b">
          {getItemById(slotItems["2"])}
        </div>
      </div>
      <div className="slot c" data-swapy-slot="3">
        <div className="item c" data-swapy-item="c">
          {getItemById(slotItems["3"])}
        </div>
      </div>
      <div className="slot d" data-swapy-slot="4">
        <div className="item d" data-swapy-item="d">
          {getItemById(slotItems["4"])}
        </div>
      </div>
    </div>
  );
}

export default dynamic(() => Promise.resolve(WeatherPage), {
  ssr: false,
});
