"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";

interface ForecastProps {
  symbol_code: string;
  symbol_code_6: string;
  symbol_code_12: string;
}

export default function Forecast({
  symbol_code,
  symbol_code_6,
  symbol_code_12,
}: ForecastProps) {
  return (
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
  );
}
