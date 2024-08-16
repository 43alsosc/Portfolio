import React from "react";

const Buttons: React.FC = () => {
  const handleClick = (value: string) => {
    console.log(value);
  };

  return (
    <div className="grid grid-cols-4 gap-2 w-full h-full p-4">
      <button
        className="bg-[#B33951] p-4 rounded-md"
        onClick={() => handleClick("Del")}
      >
        <span>Del</span>
      </button>
      <button
        className="bg-[#B33951] p-4 rounded-md"
        onClick={() => handleClick("+/-")}
      >
        <span>+/-</span>
      </button>
      <button
        className="bg-[#B33951] p-4 rounded-md"
        onClick={() => handleClick("%")}
      >
        <span>%</span>
      </button>
      <button
        className="bg-orange-400 p-4 rounded-md"
        onClick={() => handleClick("/")}
      >
        <span>/</span>
      </button>
      <button
        className="bg-gray-200 p-4 rounded-md"
        onClick={() => handleClick("7")}
      >
        <span>7</span>
      </button>
      <button
        className="bg-gray-200 p-4 rounded-md"
        onClick={() => handleClick("8")}
      >
        <span>8</span>
      </button>
      <button
        className="bg-gray-200 p-4 rounded-md"
        onClick={() => handleClick("9")}
      >
        <span>9</span>
      </button>
      <button
        className="bg-orange-400 p-4 rounded-md"
        onClick={() => handleClick("*")}
      >
        <span>*</span>
      </button>
      <button
        className="bg-gray-200 p-4 rounded-md"
        onClick={() => handleClick("4")}
      >
        <span>4</span>
      </button>
      <button
        className="bg-gray-200 p-4 rounded-md"
        onClick={() => handleClick("5")}
      >
        <span>5</span>
      </button>
      <button
        className="bg-gray-200 p-4 rounded-md"
        onClick={() => handleClick("6")}
      >
        <span>6</span>
      </button>
      <button
        className="bg-orange-400 p-4 rounded-md"
        onClick={() => handleClick("+")}
      >
        <span>+</span>
      </button>
      <button
        className="bg-gray-200 p-4 rounded-md"
        onClick={() => handleClick("1")}
      >
        <span>1</span>
      </button>
      <button
        className="bg-gray-200 p-4 rounded-md"
        onClick={() => handleClick("2")}
      >
        <span>2</span>
      </button>
      <button
        className="bg-gray-200 p-4 rounded-md"
        onClick={() => handleClick("3")}
      >
        <span>3</span>
      </button>
      <button
        className="bg-orange-400 p-4 rounded-md"
        onClick={() => handleClick("-")}
      >
        <span>-</span>
      </button>
      <button
        className="bg-gray-200 p-4 rounded-md col-span-2"
        onClick={() => handleClick("0")}
      >
        <span>0</span>
      </button>
      <button
        className="bg-gray-200 p-4 rounded-md"
        onClick={() => handleClick(".")}
      >
        <span>.</span>
      </button>
      <button
        className="bg-orange-400 p-4 rounded-md"
        onClick={() => handleClick("=")}
      >
        <span>=</span>
      </button>
    </div>
  );
};

export default Buttons;
