import React from "react";
import localFont from "next/font/local";

const myFont = localFont({ src: "./LEDCalculator.ttf" });

interface ScreenProps {
  input: string;
}

const Screen: React.FC<ScreenProps> = ({ input }) => {
  return (
    <div className={myFont.className}>
      <div className="screen bg-gray-100 p-4 rounded-md mb-4 text-xl">
        {input}
      </div>
    </div>
  );
};

export default Screen;
