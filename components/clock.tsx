"use client";
import React, { useState, useEffect } from "react";

interface ClockProps {
  className?: string;
  classNameText?: string;
}

const Clock: React.FC<ClockProps> = ({
  className = "",
  classNameText = "",
}) => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, []);

  const formatTime = (date: Date) => {
    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");
    const seconds = date.getSeconds().toString().padStart(2, "0");
    return `${hours}:${minutes}:${seconds}`;
  };

  return (
    <div className={`${className}`}>
      <h1 className={`${classNameText}`}>{formatTime(time)}</h1>
    </div>
  );
};

export default Clock;
