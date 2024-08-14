"use client";

import React, { useState } from "react";
import Screen from "./Screen";

const Calculator: React.FC = () => {
  const [input, setInput] = useState("");

  const handleButtonClick = (value: string) => {
    setInput((prevInput) => prevInput + value);
  };

  const handleClick = (value: string) => {
    console.log(value);
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="w-1/3 aspect-square bg-[#B1B7D1] rounded-md">
        <Screen input={input} />
        <div className="grid grid-cols-4 gap-2 w-full h-full p-4">
          <button
            className="bg-[#B33951] p-4 rounded-md"
            onClick={() => handleButtonClick("C")}
          >
            <span>C</span>
          </button>
          <button
            className="bg-[#B33951] p-4 rounded-md"
            onClick={() => handleButtonClick("Del")}
          >
            <span>Del</span>
          </button>
          <button
            className="bg-[#B33951] p-4 rounded-md"
            onClick={() => handleButtonClick("%")}
          >
            <span>%</span>
          </button>
          <button
            className="bg-orange-400 p-4 rounded-md"
            onClick={() => handleButtonClick("/")}
          >
            <span>/</span>
          </button>
          <button
            className="bg-gray-200 p-4 rounded-md"
            onClick={() => handleButtonClick("7")}
          >
            <span>7</span>
          </button>
          <button
            className="bg-gray-200 p-4 rounded-md"
            onClick={() => handleButtonClick("8")}
          >
            <span>8</span>
          </button>
          <button
            className="bg-gray-200 p-4 rounded-md"
            onClick={() => handleButtonClick("9")}
          >
            <span>9</span>
          </button>
          <button
            className="bg-orange-400 p-4 rounded-md"
            onClick={() => handleButtonClick("*")}
          >
            <span>*</span>
          </button>
          <button
            className="bg-gray-200 p-4 rounded-md"
            onClick={() => handleButtonClick("4")}
          >
            <span>4</span>
          </button>
          <button
            className="bg-gray-200 p-4 rounded-md"
            onClick={() => handleButtonClick("5")}
          >
            <span>5</span>
          </button>
          <button
            className="bg-gray-200 p-4 rounded-md"
            onClick={() => handleButtonClick("6")}
          >
            <span>6</span>
          </button>
          <button
            className="bg-orange-400 p-4 rounded-md"
            onClick={() => handleButtonClick("+")}
          >
            <span>+</span>
          </button>
          <button
            className="bg-gray-200 p-4 rounded-md"
            onClick={() => handleButtonClick("1")}
          >
            <span>1</span>
          </button>
          <button
            className="bg-gray-200 p-4 rounded-md"
            onClick={() => handleButtonClick("2")}
          >
            <span>2</span>
          </button>
          <button
            className="bg-gray-200 p-4 rounded-md"
            onClick={() => handleButtonClick("3")}
          >
            <span>3</span>
          </button>
          <button
            className="bg-orange-400 p-4 rounded-md"
            onClick={() => handleButtonClick("-")}
          >
            <span>-</span>
          </button>
          <button
            className="bg-gray-200 p-4 rounded-md col-span-2"
            onClick={() => handleButtonClick("0")}
          >
            <span>0</span>
          </button>
          <button
            className="bg-gray-200 p-4 rounded-md"
            onClick={() => handleButtonClick(".")}
          >
            <span>.</span>
          </button>
          <button
            className="bg-orange-400 p-4 rounded-md"
            onClick={() => handleButtonClick("=")}
          >
            <span>=</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Calculator;
