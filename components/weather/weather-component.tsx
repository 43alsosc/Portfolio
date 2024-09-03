import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";

interface WeatherData {
  properties: {
    timeseries: Array<{
      time: string;
      data: {
        instant: {
          details: {
            air_temperature: number;
            air_pressure_at_sea_level: number;
            cloud_area_fraction: number;
            relative_humidity: number;
            wind_from_direction: number;
            wind_speed: number;
            wind_speed_of_gust: number;
          };
        };
        next_12_hours: {
          summary: {
            symbol_code: string;
          };
        };
        next_6_hours: {
          summary: {
            symbol_code: string;
          };
        };
        next_1_hours: {
          summary: {
            symbol_code: string;
          };
        };
      };
    }>;
  };
}

interface WeatherContentProps {
  weatherData: WeatherData | null;
  error: string | null;
}

export default function WeatherContent({
  weatherData,
  error,
}: WeatherContentProps) {
  if (error) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Weather Information</CardTitle>
        </CardHeader>
        <CardContent>
          <h2>Error: {error}</h2>
        </CardContent>
      </Card>
    );
  }

  if (!weatherData) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Weather Information</CardTitle>
        </CardHeader>
        <CardContent>
          <h2>Loading...</h2>
        </CardContent>
      </Card>
    );
  }

  // Find the closest weather data to the current time
  const currentTime = new Date();
  currentTime.setHours(currentTime.getHours() + 2);
  const currentWeather = weatherData.properties.timeseries.reduce(
    (closest, current) => {
      return Math.abs(
        new Date(current.time).getTime() - currentTime.getTime()
      ) < Math.abs(new Date(closest.time).getTime() - currentTime.getTime())
        ? current
        : closest;
    }
  );

  // Extract the relevant weather data
  const {
    air_temperature,
    air_pressure_at_sea_level,
    cloud_area_fraction,
    relative_humidity,
    wind_from_direction,
    wind_speed,
    wind_speed_of_gust,
  } = currentWeather.data.instant.details;

  // Extract the weather symbol codes
  const symbol_code_12 = currentWeather.data.next_12_hours.summary.symbol_code;
  const symbol_code_6 = currentWeather.data.next_6_hours.summary.symbol_code;
  const symbol_code = currentWeather.data.next_1_hours.summary.symbol_code;

  // Function to get the wind direction
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
    <div className="grid gap-4 md:grid-cols-2 p-8">
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
              <span>{air_temperature.toFixed(1)}°C</span>
            </div>
            <div className="flex justify-between">
              <span>Cloud Cover:</span>
              <span>{cloud_area_fraction.toFixed(0)}%</span>
            </div>
            <div className="flex justify-between">
              <span>Humidity:</span>
              <span>{relative_humidity.toFixed(0)}%</span>
            </div>
            <div className="flex justify-between">
              <span>Wind Speed:</span>
              <span>{wind_speed.toFixed(1)} m/s</span>
            </div>
            <div className="flex justify-between">
              <span>Wind Direction:</span>
              <span className="flex">
                {getWindDirection(wind_from_direction)}{" "}
                {wind_from_direction.toFixed(0)}°
              </span>
            </div>
            <div className="flex justify-between">
              <span>Air Pressure:</span>
              <span>{air_pressure_at_sea_level.toFixed(0)} hPa</span>
            </div>
            {wind_speed_of_gust && (
              <div className="flex justify-between">
                <span>Wind Gust Speed:</span>
                <span>{wind_speed_of_gust.toFixed(1)} m/s</span>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Forecast</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <span>Next hour:</span>
            <Image
              src={`/weathericons/${symbol_code}.svg`}
              alt={symbol_code.replace(/_/g, " ")}
              width={50}
              height={50}
            />
            <span>{symbol_code.replace(/_/g, " ")}</span>
          </div>
          <div className="flex items-center justify-between">
            <span>Next 6 hours:</span>
            <Image
              src={`/weathericons/${symbol_code_6}.svg`}
              alt={symbol_code_6.replace(/_/g, " ")}
              width={50}
              height={50}
            />
            <span>{symbol_code_6.replace(/_/g, " ")}</span>
          </div>
          <div className="flex items-center justify-between">
            <span>Next 12 hours:</span>
            <Image
              src={`/weathericons/${symbol_code_12}.svg`}
              alt={symbol_code_12.replace(/_/g, " ")}
              width={50}
              height={50}
            />
            <span>{symbol_code_12.replace(/_/g, " ")}</span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
