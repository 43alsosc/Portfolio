"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";

interface CurrentWeatherProps {
  currentWeather: {
    air_temperature: number;
    cloud_area_fraction: number;
    relative_humidity: number;
    wind_speed: number;
    wind_from_direction: number;
    air_pressure_at_sea_level: number;
    wind_speed_of_gust?: number;
  };
  symbol_code: string;
}

export default function CurrentWeather({
  currentWeather,
  symbol_code,
}: CurrentWeatherProps) {
  const getWindDirection = (degrees: number) => {
    const directions = [
      <Image
        key="down"
        src="/Arrows/arrowDown.svg"
        alt="down"
        width={20}
        height={20}
      />,
      <Image
        key="down-left"
        src="/Arrows/arrowDownLeft.svg"
        alt="down-left"
        width={20}
        height={20}
      />,
      <Image
        key="left"
        src="/Arrows/arrowLeft.svg"
        alt="left"
        width={20}
        height={20}
      />,
      <Image
        key="up-left"
        src="/Arrows/arrowUpLeft.svg"
        alt="up-left"
        width={20}
        height={20}
      />,
      <Image
        key="up"
        src="/Arrows/arrowUp.svg"
        alt="up"
        width={20}
        height={20}
      />,
      <Image
        key="up-right"
        src="/Arrows/arrowUpRight.svg"
        alt="up-right"
        width={20}
        height={20}
      />,
      <Image
        key="right"
        src="/Arrows/arrowRight.svg"
        alt="right"
        width={20}
        height={20}
      />,
      <Image
        key="down-right"
        src="/Arrows/arrowDownRight.svg"
        alt="down-right"
        width={20}
        height={20}
      />,
    ];
    const fallbackDirections = [`⬇`, `⬋`, `⬅`, `⬉`, `⬆`, `⬈`, `➡`, `⬊`];
    const directionIndex = Math.round(degrees / 45) % 8;
    return directions[directionIndex] || fallbackDirections[directionIndex];
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          Current Weather
          <Image
            src={`/weathericons/${symbol_code}.svg`}
            alt={symbol_code.replace(/_/g, " ")}
            width={50}
            height={50}
          />
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid gap-2">
          <div className="flex justify-between">
            <span>Temperature:</span>
            <span>{currentWeather.air_temperature.toFixed(1)}°C</span>
          </div>
          <div className="flex justify-between">
            <span>Cloud Cover:</span>
            <span>{currentWeather.cloud_area_fraction.toFixed(0)}%</span>
          </div>
          <div className="flex justify-between">
            <span>Humidity:</span>
            <span>{currentWeather.relative_humidity.toFixed(0)}%</span>
          </div>
          <div className="flex justify-between">
            <span>Wind Speed:</span>
            <span>{currentWeather.wind_speed.toFixed(1)} m/s</span>
          </div>
          <div className="flex justify-between">
            <span>Wind Direction:</span>
            <span className="flex">
              {getWindDirection(currentWeather.wind_from_direction)}{" "}
              {currentWeather.wind_from_direction.toFixed(0)}°
            </span>
          </div>
          <div className="flex justify-between">
            <span>Air Pressure:</span>
            <span>
              {currentWeather.air_pressure_at_sea_level.toFixed(0)} hPa
            </span>
          </div>
          {currentWeather.wind_speed_of_gust && (
            <div className="flex justify-between">
              <span>Wind Gust Speed:</span>
              <span>{currentWeather.wind_speed_of_gust.toFixed(1)} m/s</span>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
