import React from "react";
import { DoubleSide } from "three";

export const VideoEmpty = (props) => {
  const width = props.width || 1;
  return (
    <mesh {...props}>
      <planeGeometry attach="geometry" args={[width, (9 / 16) * width]} />
      <meshBasicMaterial attach="material" color="white" side={DoubleSide} />
    </mesh>
  );
};
