"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import MusicPlayer from "./audioplayer";
import { ArrowBigUp } from "lucide-react";
import VideoPlayer from "./videoplayer";

type ButtonComponentProps = {
  className?: string;
  text: string;
  onClick: () => void;
};

type InputComponentProps = {
  type: string;
  inputValue: string;
  handleInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleKeyDown: (event: React.KeyboardEvent<HTMLInputElement>) => void;
};

const ButtonComponent = ({
  className,
  text,
  onClick,
}: ButtonComponentProps) => (
  <motion.div
    initial={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -100 }}
    transition={{ duration: 0.5 }}
  >
    <Button
      className={`text-4xl p-12 rounded-xl ${className}`}
      onClick={onClick}
    >
      {text}
    </Button>
  </motion.div>
);

const saveInputValue = (value: string) => {
  console.log("Input Value Saved:", value);
  return value;
};

const InputComponent = ({
  type,
  inputValue,
  handleInputChange,
  handleKeyDown,
}: InputComponentProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 100 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -100 }}
      transition={{ duration: 0.5 }}
      className="w-full flex justify-center"
    >
      <input
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        placeholder={`${type} URL`}
        className="h-16 rounded-xl text-2xl p-2 w-1/3 text-center"
      />
    </motion.div>
  );
};

const PlayerComponent = ({
  url,
  type,
}: {
  url: string;
  type: "audio" | "video";
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 100 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 100 }}
      transition={{ duration: 0.5 }}
      className="flex justify-center w-1/3"
    >
      {type === "audio" ? <MusicPlayer url={url} /> : <VideoPlayer url={url} />}
    </motion.div>
  );
};

const ArrowButton = ({ onClick }: { onClick: () => void }) => (
  <motion.div
    initial={{ opacity: 0, x: 100 }}
    animate={{ opacity: 1, x: 0 }}
    exit={{ opacity: 0, x: 100 }}
    transition={{ duration: 0.5 }}
    className="fixed right-8 top-1/2 transform -translate-y-1/2"
  >
    <Button
      className="p-4 rounded-full bg-primary text-primary-foreground hover:bg-primary/90"
      onClick={onClick}
    >
      <ArrowBigUp className="h-8 w-8" />
    </Button>
  </motion.div>
);

export default function MusicPlayerControls() {
  const [inputValue, setInputValue] = useState<string>("");
  const [selectedInput, setSelectedInput] = useState<string | null>(null);
  const [url, setUrl] = useState<string>("");
  const [showPlayer, setShowPlayer] = useState<boolean>(false);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      const savedUrl = saveInputValue(inputValue);
      setUrl(savedUrl);
      setShowPlayer(true);
    }
  };

  return (
    <div className="relative w-screen h-screen flex flex-col items-center justify-center">
      <div className="flex gap-6 mb-8">
        <AnimatePresence>
          {!selectedInput && !showPlayer && (
            <>
              <ButtonComponent
                text="Video"
                className="bg-[#FF0000]"
                onClick={() => setSelectedInput("Video")}
              />
              <ButtonComponent
                text="Audio"
                className="bg-[#1db954]"
                onClick={() => setSelectedInput("Audio")}
              />
            </>
          )}
        </AnimatePresence>
      </div>
      <AnimatePresence>
        {selectedInput && !showPlayer && (
          <>
            <InputComponent
              type={selectedInput}
              handleInputChange={handleInputChange}
              handleKeyDown={handleKeyDown}
              inputValue={inputValue}
            />
            <ArrowButton
              onClick={() => {
                setSelectedInput(null);
                setInputValue("");
              }}
            />
          </>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {showPlayer && (
          <>
            <PlayerComponent
              url={url}
              type={selectedInput?.toLowerCase() as "audio" | "video"}
            />
            <ArrowButton
              onClick={() => {
                setShowPlayer(false);
                setSelectedInput(null);
                setInputValue("");
              }}
            />
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
