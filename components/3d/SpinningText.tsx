"use client";

import { useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Text } from "@react-three/drei";
import * as THREE from "three";
import { Link } from "lucide-react";

interface SpinningPlaneProps {
  text: string;
  textPosition?: [number, number, number];
  frontColor?: string;
  textColor?: string;
  fontSize?: number;
  boxSize?: [number, number, number?, number?, number?, number?];
  link?: string;
}

function SpinningPlane({
  text,
  textPosition = [0, 0, -0.51],
  frontColor = "#3366cc",
  textColor = "#ffffff",
  fontSize = 0.2,
  boxSize = [2, 2, 2, 1, 1, 1],
  link = "/",
}: SpinningPlaneProps) {
  const groupRef = useRef<THREE.Group>(null!);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [rotation, setRotation] = useState(0);

  useFrame(() => {
    if (isAnimating) {
      const targetRotation = isHovered ? Math.PI : 0;
      const newRotation = THREE.MathUtils.lerp(rotation, targetRotation, 0.1);
      setRotation(newRotation);

      if (groupRef.current) {
        groupRef.current.rotation.y = newRotation;
      }

      // Check if the animation is complete
      if (Math.abs(newRotation - targetRotation) < 0.01) {
        setIsAnimating(false);
        setRotation(targetRotation); // Snap to exact target rotation
      }
    }
  });

  const handlePointerEnter = () => {
    if (!isAnimating) {
      setIsHovered(true);
      setIsAnimating(true);
    }
  };

  const handlePointerLeave = () => {
    if (!isAnimating) {
      setIsHovered(false);
      setIsAnimating(true);
    }
  };

  const handlePointerClick = () => {
    window.location.href = link;
  };

  return (
    <group
      ref={groupRef}
      onPointerEnter={handlePointerEnter}
      onPointerLeave={handlePointerLeave}
      onClick={handlePointerClick}
    >
      <mesh>
        <boxGeometry args={boxSize} />
        <meshStandardMaterial color={frontColor} side={THREE.FrontSide} />
      </mesh>

      <Text
        position={textPosition}
        rotation={[0, Math.PI, 0]}
        fontSize={fontSize}
        color={textColor}
        anchorX="center"
        anchorY="middle"
        renderOrder={1}
      >
        {text}
      </Text>
    </group>
  );
}

interface SpinningTextProps extends SpinningPlaneProps {
  width?: number;
  height?: number;
}

export default function SpinningText({
  width = 300,
  height = 300,
  ...props
}: SpinningTextProps) {
  return (
    <div style={{ width, height }}>
      <Canvas camera={{ position: [0, 0, 3] }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} />
        <SpinningPlane {...props} />
      </Canvas>
    </div>
  );
}
